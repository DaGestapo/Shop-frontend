import {FC, ReactNode} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './ShareButtonUI.module.scss';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';



interface ShareButtonUII {
    children?: ReactNode;
    icon: IconDefinition;
    backgroundColor: string;
    padding?: string;
    marginRight?: string; 
    marginLeft?: string;
}

const ShareButtonUI: FC<ShareButtonUII> = ({
    children,
    icon,
    backgroundColor,
    padding,
    marginRight,
    marginLeft
}) => {


    return (
        <button 
            className={module.shareButton}
            style={{backgroundColor, 
                    padding,
                    marginLeft
                }}
        >
            <FontAwesomeIcon 
                icon={icon} 
                style={{marginRight}}
            />
            {children}
        </button>
    )
}

export default ShareButtonUI;