import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';

import {FiAlertCircle} from 'react-icons/fi';
import {MdSchedule} from 'react-icons/md';
import {FaWhatsapp} from 'react-icons/fa';

import './styles.css';

import mapMarker from '../../assets/images/map-marker.svg';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import leaflet from 'leaflet';
import api from '../../api/api';


interface iParam {
  id: string,
}

interface iOrphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  number: string,
  about: string,
  instructions: string,
  schedule: string,
  weekend: boolean,
  images: Array<{
    id: number,
    url: string,
  }>
}

const mapIcon = leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [58,68],
  iconAnchor: [29, 68],
  popupAnchor: [160, 5]
})

const OrphanagesDetails: React.FC = () => {
  const {id}  = useParams<iParam>();
  const [orphanage, setOrphanage] = useState<iOrphanage | null>(null);
  const [focusedImage, setFocusedImage] = useState<string>('');

  useEffect(() => {
    api.get(`orphanage/${id}`)
    .then(res => {
      const data = res.data as iOrphanage
      setOrphanage(data);

      if(data.images){
        setFocusedImage(data.images[0].url);
      }
    })
  }, [id])

  if(orphanage === null || focusedImage === '') {
    return <div>Loading...</div>
  }

  const handleImageFocus = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setFocusedImage(e.currentTarget.src);
  }

  return (
    <div id='orphanage-details'>
      <Header/>
      <div className='wrapper'>
        <p className='title'>Orfanato</p>

        <div className='main-wrapper'>
          <div className='image-focus' style={{backgroundImage: `URL(${focusedImage})`}}/>

          <div className='carousel'>
            {orphanage.images.map(image => (
              <img
                onClick={handleImageFocus}
                src={image.url}
                className='image-carousel'
                alt={`${image.id}`}
                key={`${image.id}`}
              />
            ))}
          </div>

          <div className='details-wrapper'>
            <strong className='name'>{orphanage.name}</strong>

            <p className='about'>{orphanage.about}</p>

            <div className='input-map'>
              <MapContainer
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={13}
                style={{width:'100%', height: '100%', borderRadius: '20px', border: '1px solid #DDE3F0'}}
                dragging={false}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker 
                  position={{lat: orphanage.latitude, lng:orphanage.longitude}}
                  icon={mapIcon}
                />
              </MapContainer>
              <a className='google-maps' href={`https://www.google.com/maps/@${orphanage.latitude},${orphanage.longitude},16z`}>
                <p>Ver rotas no Google Maps</p>
              </a>
            </div>

            <div className='separator'/>

            <strong className='orphanage-instructions'>Instruções para Visita</strong>

            <p className='instructions'>{orphanage.instructions}</p>

            <div className='schedule'>
              <div className='visit'>
                <MdSchedule size={40} color='#15BFD6'/>
                Horário das visitas<br/>{orphanage.schedule}
              </div>
              {
                !orphanage.weekend ? (
                  <div className='weekend-yes'>
                    <FiAlertCircle size={40} color='#39CC83'/>
                    Atendemos<br/>fim de semana
                  </div>
                ) : (
                  <div className='weekend-no'>
                    <FiAlertCircle size={40} color='#FF669D'/>
                    Não atendemos<br/>fim de semana
                  </div>
                )
              }
            </div>

            <a href={`https://api.whatsapp.com/send?phone=${orphanage.number}`} className='whatsapp'>
              <FaWhatsapp size={20} color='#fff'/>
              Entrar Em Contato
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OrphanagesDetails;