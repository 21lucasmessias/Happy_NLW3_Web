import React from 'react';
import {FaArrowRight} from 'react-icons/fa'

import {Link} from 'react-router-dom';
import Logo from '../../assets/images/logo.svg'

import './styles.css'

const Landing:React.FC = () => {
  return(
    <div id='page-landing'>
      <div className='content-wrapper'>
        <img src={Logo} alt='logo'/>

        <p className='description'>Leve felicidade para o mundo</p>
        <p className='about'>Visite orfanatos e mude o dia de muitas crianças.</p>

        <div className='location'>
          <p className='city'>City</p>
          <p className='state'>State</p>
        </div>

        <Link to='locations'>
          <FaArrowRight size={32} color='#8D734B'/>
        </Link>
      </div>
    </div>  
  );
}


export default Landing;