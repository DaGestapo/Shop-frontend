import {FC} from 'react';
import module from './Loader.module.scss';

import logo from '../../styles/svg/Icon.svg';


const Loader: FC = () => {


    return (
        <div className={module.loader}>
            <img src={logo} alt="Logo" />
            <p>Loading</p>
        </div>
    )
}

export default Loader