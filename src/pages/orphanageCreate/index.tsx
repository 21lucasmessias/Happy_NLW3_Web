import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/header';

import {FiPlus} from 'react-icons/fi'
import './styles.css';

import ToogleSwitch from '../../components/toogleSwitch';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import leaflet from 'leaflet';

import mapMarker from '../../assets/images/map-marker.svg';
import api from '../../api/api';

interface iMarker {
  _latlng: {
    lat: number,
    lng: number
  }
}

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

  const [latitudeCenter, setLatitudeCenter] = useState(0);
  const [longitudeCenter, setLongitudeCenter] = useState(0);

  const markerRef = useRef(null);
 
  useEffect(() => {
      navigator.geolocation.getCurrentPosition( location => {
        setLatitudeCenter(location.coords.latitude);
        setLongitudeCenter(location.coords.longitude);
      }, (error) => console.log(error), {enableHighAccuracy: true});

  }, []);

  if(longitudeCenter === 0) {
    return(<div>Loading...</div>)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let data = new FormData();

    data.append('name', name);
    data.append('latitude', (markerRef.current as iMarker | null)?._latlng.lat.toString() as string);
    data.append('longitude', (markerRef.current as iMarker | null)?._latlng.lng.toString() as string);
    data.append('number', number);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('schedule', schedule);
    data.append('weekend', weekend ? 'true' : 'false');

    images.forEach(image => {
      data.append('images', image);
    })
    
    api.post('/orphanage/create', data);

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
                  center={[latitudeCenter, longitudeCenter]}
                  zoom={13}
                  style={{width:'100%', height: '100%', borderRadius: '20px'}}
                  
                >
                  <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                  {
                    longitudeCenter && (
                      <Marker 
                        position={{lat: latitudeCenter, lng: longitudeCenter}}
                        draggable
                        icon={mapIcon}
                        ref={markerRef}
                      />
                    )
                  }

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
                      <img src={image} key={index} alt={`${image}-${index}`} style={{objectFit: 'cover'}}/>
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