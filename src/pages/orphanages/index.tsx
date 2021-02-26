import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api'

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import leaflet from 'leaflet';

import {FaPlus, FaArrowRight} from 'react-icons/fa'
import mapMarker from '../../assets/images/map-marker.svg';

import './styles.css';
import 'leaflet/dist/leaflet.css';

const mapIcon = leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [58,68],
  iconAnchor: [29, 68],
  popupAnchor: [160, 5]
})

interface iOrphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

const Orphanages: React.FC = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [orphanages, setOrphanages] = useState<Array<iOrphanage>>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( location => {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }, (error) => console.log(error), {enableHighAccuracy: true});

    api.get('orphanages')
    .then(res => {
      setOrphanages(res.data);
    })

    //carregar nome da cidade / estado
  }, [])

  if(longitude === 0) {
    return(<div>Loading...</div>)
  }

  return (
    <div id='orphanages'>
      <aside className='left-header'>
        <img src={mapMarker} alt='happy-icon'/>

        <div className='description'>
          <p className='choose-orphanage'>Escolha um orfanato no mapa</p>
          <p className='info'>Muitas crianças estão esperando a sua visita :)</p>
        </div>

        <div className='location'>
          <p className='city'>City</p>
          <p className='state'>State</p>
        </div>
      </aside>

      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{width:'100%', height: '100%', zIndex: 1}}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => (
          <Marker 
            position={{lat: orphanage.latitude, lng:orphanage.longitude}}
            icon={mapIcon}
            key={orphanage.id}
          >
            <Popup closeButton={false} className='marker-popup' >
                {orphanage.name}
                <Link to={`orphanages/details/${orphanage.id}`}>
                  <FaArrowRight size={20} color='#FFF'/>
                </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Link to='orphanages/create' className='add-orphanage'>
        <FaPlus size={21} color='#FFF'/>
      </Link>
    </div>
  );
}

export default Orphanages;