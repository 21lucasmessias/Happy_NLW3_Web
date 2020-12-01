import React from 'react';

import './styles.css';

interface iToogleSwitch {
  setState: React.Dispatch<React.SetStateAction<boolean>>
}

const ToogleSwitch: React.FC<iToogleSwitch> = ({setState}) => {
  const handlerFunction = (event: React.MouseEvent) => {
    event.currentTarget.classList.toggle('active');
    setState(event.currentTarget.classList[1] === 'active');
  }

  return <div 
    className='toogle-switch'
    onClick={handlerFunction}
  />;
}

export default ToogleSwitch;