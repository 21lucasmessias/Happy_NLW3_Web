import React, {useState} from 'react';
import Header from '../../components/header';

import {FiPlus} from 'react-icons/fi'
import './styles.css';

import ToogleSwitch from '../../components/toogleSwitch';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import leaflet from 'leaflet';

import mapMarker from '../../assets/images/map-marker.svg';

const mapIcon = leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [58,68],
  iconAnchor: [29, 68],
  popupAnchor: [160, 5]
})

const NewOrphanage: React.FC = () => {
  const [weekendSwitch, setWeekenSwitch] = useState(true);

  return(
    <div id='new-orphanage'>
      <Header/>
      <div className='wrapper'>
        <p>Adicione um orfanato</p>

        <main>        
          <form className='new-orphanage-form'>
            <fieldset>
              <legend>
                Dados
              </legend>

              <div className='input-map'>
                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={13}
                  style={{width:'100%', height: '100%', borderRadius: '20px'}}
                >
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />

                  <Marker 
                    position={{lat: 51.505, lng:-0.09}}
                    icon={mapIcon}
                  />
                </MapContainer>
              </div>

              <div className='input-block'>
                <label>Nome</label>
                <input></input>
              </div>

              <div className='input-block'>
                <label>Sobre <span>Máximo de 300 caracteres</span></label>
                <input></input>
              </div>

              <div className='input-block'>
                <label>Número do WhatsApp</label>
                <input></input>
              </div>

              <div className="input-block">
                <label>Fotos</label>

                <div className="uploaded-image">
                  <img src={mapMarker} alt='teste'></img>

                  <button className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </button>
                </div>

              </div>

            </fieldset>
            
            <fieldset>
              <legend>
                Visitação
              </legend>

              <div className='input-block'>
                <label>Instruções</label>
                <input></input>
              </div>

              <div className='input-block'>
                <label>Horário de Visitas</label>
                <input></input>
              </div>

              <div className='input-block'>
                <label>Atende fim de Semana?</label>
                <ToogleSwitch setState={setWeekenSwitch}/>
              </div>

              <button type='submit' className='submit'>
                Confirmar
              </button>            
            </fieldset>
          </form>
        </main>
      </div>
    </div>
  );
}

export default NewOrphanage;