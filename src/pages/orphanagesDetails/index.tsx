import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';

import {FiAlertCircle} from 'react-icons/fi';
import {MdSchedule} from 'react-icons/md';
import {FaWhatsapp} from 'react-icons/fa';

import './styles.css';

import teste from '../../assets/images/1.jpg';
import teste2 from '../../assets/images/2.jpg';
import teste3 from '../../assets/images/3.jpg';
import teste4 from '../../assets/images/4.jpg';
import teste5 from '../../assets/images/5.jpg';
import mapMarker from '../../assets/images/map-marker.svg';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import leaflet from 'leaflet';


interface iParam {
  id: string,
}

const mapIcon = leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [58,68],
  iconAnchor: [29, 68],
  popupAnchor: [160, 5]
})

const OrphanagesDetails: React.FC = () => {
  const {id}  = useParams<iParam>();

  const [focusedImage, setFocusedImage] = useState<string>(teste);

  const handleImageFocus = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setFocusedImage(e.currentTarget.src);
  }

  return (
    <div id='orphanage-details'>
      <Header/>
      <div className='wrapper'>
        <p>Orfanato</p>

        <div className='main-wrapper'>
          <div className='image-focus' style={{backgroundImage: `URL(${focusedImage})`}}/>

          <div className='carousel'>
            <img onClick={handleImageFocus} src={teste} className='image-carousel' alt='t0'/>
            <img onClick={handleImageFocus} src={teste2} className='image-carousel' alt='t1'/>
            <img onClick={handleImageFocus} src={teste3} className='image-carousel' alt='t2'/>
            <img onClick={handleImageFocus} src={teste4} className='image-carousel' alt='t3'/>
            <img onClick={handleImageFocus} src={teste5} className='image-carousel' alt='t4'/>     
            <img onClick={handleImageFocus} src={teste} className='image-carousel' alt='t5'/>       
          </div>

          <div className='details-wrapper'>
            <strong className='name'>Name Orphanage</strong>

            <p className='about'>About</p>

            <div className='input-map'>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{width:'100%', height: '100%', borderRadius: '20px', border: '1px solid #DDE3F0'}}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker 
                  position={{lat: 51.505, lng:-0.09}}
                  icon={mapIcon}
                />
              </MapContainer>
              <a className='google-maps' href='https://www.google.com/maps/search/google+maps/@-25.0995786,-50.1523773,15z'>
                <p>Ver rotas no Google Maps</p>
              </a>
            </div>

            <div className='separator'/>

            <strong className='orphanage-instructions'>Instruções para Vistita</strong>

            <p className='instructions'>Instructions</p>

            <div className='schedule'>
              <div className='visit'>
                <MdSchedule size={40} color='#15BFD6'/>
                a
              </div>
              <div className='weekend-no'>
                <FiAlertCircle size={40} color={ false ? '#39CC83' : '#FF669D'}/>
                b
              </div>
            </div>

            <a href='/' className='whatsapp'>
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