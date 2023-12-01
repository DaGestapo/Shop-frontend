import {useState, useEffect} from 'react';
import {brandApi} from '../http/brandTypeAPI';
import { OptionsI } from '../model/serverModel/optionsI';
import { useAppDispatch } from './reduxTypedHools';
import { setError } from '../store/redusers/errorReduces';

export interface FilterI {
    title: string;
    options: OptionsI[]
  }

export const useSideBarOptions = ( title: string) => {
    const [options, setOptions] = useState<FilterI>({
        title: title,
        options: []
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        brandApi.getAllBrandType()
            .then(data => {
                if(data instanceof Error) {
                    dispatch(setError(data.message));
                } else {
                    setOptions({...options, options: data});
                }
            })
    }, [title]);

  
    return options;
}