import {useState, useEffect} from 'react';
import {brandApi} from '../http/brandTypeAPI';
import { SelectedOptionsI } from '../model/serverModel/optionsI';
import { useAppDispatch } from './reduxTypedHools';
import { setMessageError } from '../store/redusers/messageReduces';
import { FilterI } from '../model/serverModel/optionsI';


export const useSideBarOptions = ( title: string): [
    options: FilterI,
    setOptions: React.Dispatch<React.SetStateAction<FilterI>>
] => {
    const [options, setOptions] = useState<FilterI>({
        title: title,
        options: []
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        brandApi.getAllBrandType()
            .then(data => {
                if(data instanceof Error) {
                    dispatch(setMessageError(data.message));
                } else {
                    const newOptions: SelectedOptionsI[] = [];
                    for(let i = 0; i < data.length; i++) {
                        newOptions[i] = {
                            id: data[i].id,
                            name: data[i].name,
                            selected: false
                        }
                    }
                    setOptions({...options, options: newOptions});
                }
            })
    }, [title]);

  
    return [options, setOptions];
}