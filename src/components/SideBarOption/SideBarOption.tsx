import {FC, createRef, MouseEvent} from 'react';
import module from './SideBarOption.module.scss';

import { useLoaderByBrand } from '../../hooks/useLoaderByBrand';

import { selectChild } from '../../utils/selectChildLi-utf';

import { OptionsI } from '../../model/serverModel/optionsI';

export interface SideBarOptionPropsI {
    title: string;
    options: OptionsI[];
    typeId: number;
}

const SideBarOption:FC<SideBarOptionPropsI> = ({title, options, typeId}) => {
    const selectChildItem = selectChild(module);
    const fatherEl = createRef<HTMLUListElement>();
    const loader = useLoaderByBrand(8);

    const selectBrand = (e: MouseEvent<HTMLUListElement>) => {
        const target = e.target;

        if(!(target instanceof HTMLElement)) return;

        const li = target.closest('li');

        if(!(li instanceof HTMLLIElement)) return;

        const id = Number(li.id);
        if(!id) return;
        loader()(typeId, id);

    }

    if(title && options) {
        return (
            <article>
                <h3>{title}</h3>
                <ul 
                    className={module.sidebarUl}
                    ref={fatherEl}
                    onClick={(e) => {
                        selectChildItem(e.target, fatherEl.current);
                        selectBrand(e);
                    }}
                >
                {options.map(item => 
                    <li id={item.id.toString()} key={item.name}>
                        {item.name}
                    </li>
                )}
                </ul>
            </article>
        )
    } else {
        return (
            <div>
                Error
            </div>
            );
    }
}

export default SideBarOption;
