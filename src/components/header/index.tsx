import React from 'react';
import { useHistory } from 'react-router-dom';

import {FaArrowLeft} from 'react-icons/fa';
import happyIcon from '../../assets/images/map-marker.svg';

import './styles.css';

const Header: React.FC = () => {
  const {goBack} = useHistory();
  
  return (
    <div id='header'>
      <img src={happyIcon} alt='happy-icon'/>
      <button type='button' onClick={goBack}> 
        <FaArrowLeft size={24} color='#fff'/>
      </button>
    </div>
  );
}

export default Header;