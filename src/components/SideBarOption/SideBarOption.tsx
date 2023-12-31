import {FC, createRef, MouseEvent} from 'react';
import module from './SideBarOption.module.scss';

import { useLoaderByBrand } from '../../hooks/useLoaderByBrand';

import { selectChild } from '../../utils/selectChildLi-utf';

import { OptionsI } from '../../model/serverModel/optionsI';
import { FilterI } from '../../model/serverModel/optionsI';
import { SelectedOptionsI } from '../../model/serverModel/optionsI';

export interface SideBarOptionPropsI {
    title: string;
    options: OptionsI[];
    setBrandOptions: React.Dispatch<React.SetStateAction<FilterI>>, 
    typeId: number;
}

const SideBarOption:FC<SideBarOptionPropsI> = ({title, options, setBrandOptions, typeId}) => {
    const selectChildItem = selectChild(module);
    const fatherEl = createRef<HTMLUListElement>();
    const loader = useLoaderByBrand(8);

    const selectBrand = (e: MouseEvent<HTMLUListElement>) => {
        const target = e.target;

        if(!(target instanceof HTMLElement)) return;

        const li = target.closest('li');

        if(!(li instanceof HTMLLIElement)) return;

        const name = li.id;
        if(!name) return;

        const newOptions: SelectedOptionsI[] = []; 
        for(let i = 0; i < options.length; i++) {
            if(options[i].name === name) {
                newOptions[i] = {
                    id: options[i].id,
                    name: options[i].name,
                    selected: true,
                }
            } else {
                newOptions[i] = {
                    id: options[i].id,
                    name: options[i].name,
                    selected: false,
                }
            }
        }

        setBrandOptions(state => {
            return {...state, options: newOptions}
        })

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
                    <li id={item.name.toString()} key={item.name}>
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
