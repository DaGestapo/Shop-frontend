import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './TdDelete.module.scss';

import { crossIcon } from '../../utils/icons-utf';

interface TdDeleteI {
    deleteFunck: () => void;
}

const TdDelete: FC<TdDeleteI> = ({deleteFunck}) => {

    return (
        <td 
                className={`${module.delete}`}
                onClick={() => deleteFunck()}    
            >
                <button className={`${module.delete_button}`}>
                    <FontAwesomeIcon
                        icon={crossIcon} 
                        style={{color: 'red'}}
                        />
                </button>
            </td>
    )
}

export default TdDelete;