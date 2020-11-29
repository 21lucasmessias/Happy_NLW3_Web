import React from 'react';
import Header from '../../components/header';

import {FiPlus} from 'react-icons/fi'
import './styles.css';

const NewOrphanage: React.FC = () => {
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
                <label htmlFor="images">Fotos</label>

                <div className="uploaded-image">

                </div>

                <button className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </button>
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
                
              </div>

              <button>
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