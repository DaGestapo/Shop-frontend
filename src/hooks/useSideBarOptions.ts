import {useState, useEffect} from 'react';
import { getAllBrands } from '../http/brandAPI';
import { OptionsI } from '../model/serverModel/optionsI';

export interface FilterI {
    title: string;
    options: OptionsI[]
  }

export const useSideBarOptions = ( title: string) => {
    const [options, setOptions] = useState<FilterI>({
        title: title,
        options: []
    });

    useEffect(() => {
        getAllBrands()
            .then(response => {
                setOptions({...options, options: response});
            })
    }, [title]);

  
    return options;
}