import {FC} from 'react';
import module from './AccomplishedRoute.module.scss';

import { NavLink } from 'react-router-dom';
import { LinkI } from '../../model/linkI';

interface AccomplishedRouteI {
    links: LinkI[] | null;
}
const AccomplishedRoute: FC<AccomplishedRouteI> = ({links}) => {

    return (
        <div className={module.routeList}>
            {links && 
                links.map((link, id) => 
                    <p key={link.name}>
                        { id === links.length - 1
                            ?<span className={module.endpoint}>{link.name}</span>
                            :<span>
                                <NavLink
                                    to={link.route}
                                    >{link.name}
                                </NavLink>/
                            </span>     
                        }            
                    </p>
                )
            } 
        </div>
    );
}

export default AccomplishedRoute;
