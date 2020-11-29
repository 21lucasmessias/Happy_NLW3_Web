import React from 'react';

import {MapContainer, TileLayer} from 'react-leaflet';

import mapMarker from '../../assets/images/map-marker.svg';

import './styles.css';
import 'leaflet/dist/leaflet.css';

const Locations: React.FC = () => {
  return (
    <div id='locations'>
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
        style={{width:'100%', height: '100%'}}
      >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      </MapContainer>
    </div>
  );
}

export default Locations;