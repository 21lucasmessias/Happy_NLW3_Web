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

const OrphanageCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [number, setNumber] = useState('');
  const [images, setImages] = useState<Array<File>>([]);
  const [previewImages, setPreviewImages] = useState<Array<string>>([]);
  const [instructions, setInstructions] = useState('');
  const [schedule, setSchedule] = useState('');
  const [weekend, setWeekend] = useState(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {   
    //organizar os inputs
    //organizar imagens
    //conectar api
    //enviar dados
    e.preventDefault();
  }

  const handleSetImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    var filesArr:Array<File> = Array.prototype.slice.call(e.target.files);

    filesArr = filesArr.reduce((files, file) => {
      if(file.type === 'image/jpeg'){
        return [...files, file];
      }

      return files;
    }, [] as  Array<File>);

    filesArr = [...images, ...filesArr];

    setImages(filesArr);
    setPreviewImages(filesArr.map((file) => URL.createObjectURL(file)));
  }

  return(
    <div id='orphanage-create'>
      <Header/>
      <div className='wrapper'>
        <p>Adicione um orfanato</p>

        <main>        
          <form className='new-orphanage-form' onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dados</legend>

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
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='input-block'>
                <label>Sobre <span>Máximo de 300 caracteres</span></label>
                <input 
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className='input-block'>
                <label>Número do WhatsApp</label>
                <input 
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label>Fotos</label>

                <div className="uploaded-image">
                  {previewImages.map((image, index) => {
                    return(
                      <img src={image} key={index} alt={`${image}-${index}`}/>
                    )
                  })}
                  
                  <label>
                    <input
                      type="file"
                      onChange={(e) => handleSetImages(e)}
                      multiple
                      style={{display: 'none'}}
                    />

                    <div className="new-image">
                      <FiPlus size={24} color="#15b6d6" />
                    </div>
                  </label>

                </div>

              </div>

            </fieldset>
            
            <fieldset>
              <legend>Visitação</legend>

              <div className='input-block'>
                <label>Instruções</label>
                <input 
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              <div className='input-block'>
                <label>Horário de Visitas</label>
                <input 
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>

              <div className='input-block'>
                <label>Atende fim de Semana?</label>
                <ToogleSwitch setState={setWeekend}/>
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

export default OrphanageCreate;