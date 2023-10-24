import {FC, createRef, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import module from './CategoryMenu.module.scss';

import { useNavigate } from 'react-router-dom';

import { getAllTypes } from '../../http/typeAPI';
import { getAllBrands } from '../../http/brandAPI';

import { CategoryI } from '../../model/serverModel/optionsI';

import {shevronIcon} from '../../utils/icons-utf';



interface CategoryMenuI {

}

const CategoryMenu: FC<CategoryMenuI> = () => {
    const sectionRef = createRef<HTMLElement>();
    const openBtn = createRef<HTMLDivElement>();
    const [categories, setCategories] = useState<CategoryI>({
        brands: [],
        types: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        getAllTypes()
            .then(types => {
                getAllBrands()
                    .then(brands => {
                        setCategories({types, brands});
                    })
            })
    }, []);

    const showCategories = () => {
        sectionRef.current?.classList.toggle(module.show_category);
        openBtn.current?.classList.toggle(`${module.open}`)
    }

    return (
        <section className={module.category}>
            <section ref={sectionRef} className={module.category__menu}>
                
                <ul>
                    <li><h3>Brands</h3></li>
                    {categories.brands.map(brand => 
                        <li 
                            key={brand.id + 'brand'}
                        >{brand.name}</li>    
                    )}
                </ul>

                <ul>
                    <li><h3>Types</h3></li>
                    {categories.types.map(type => 
                        <li 
                            key={type.id + 'type'}
                            onClick={() => 
                                navigate('home' + '/shop' + `/${type.name}`.toLowerCase())
                            }
                            >{type.name}</li>    
                    )}
                </ul>
            </section>
            <div 
                className={module.button_border}
                ref={openBtn}
                >
                <button 
                    className={module.category_button}
                    onClick={showCategories}    
                >
                    <FontAwesomeIcon icon={shevronIcon} />
                </button>
            </div>
            
        </section>
    )
}

export default CategoryMenu;