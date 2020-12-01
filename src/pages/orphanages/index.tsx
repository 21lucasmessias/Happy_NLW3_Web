import React from 'react';

import { Link } from 'react-router-dom';
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

const Orphanages: React.FC = () => {
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
        center={[51.505, -0.09]}
        zoom={13}
        style={{width:'100%', height: '100%', zIndex: 1}}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        <Marker 
          position={{lat: 51.505, lng:-0.09}}
          icon={mapIcon}
        >
          <Popup closeButton={false} className='marker-popup' >
              Teste
              <Link to='orphanages/details/1'>
                <FaArrowRight size={20} color='#FFF'/>
              </Link>
          </Popup>
        </Marker>
      </MapContainer>

      <Link to='orphanages/create' className='add-orphanage'>
        <FaPlus size={21} color='#FFF'/>
      </Link>
    </div>
  );
}

export default Orphanages;