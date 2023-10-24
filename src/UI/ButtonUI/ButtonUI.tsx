import {FC, PropsWithChildren} from 'react';
import module from './ButtonUI.module.scss';

interface ButtonUII extends PropsWithChildren  {
}

const ButtonUI:FC<ButtonUII> = ({children}) => {
 


  return (
    <button 
      className={module.buttonUI}
      >
        {children}
      </button>
  );
}

export default ButtonUI;
