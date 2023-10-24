import { $host } from './index';
import { OptionsI } from '../model/serverModel/optionsI';

export const getAllTypes = async(): Promise<OptionsI[]>=> {
    let URLRequest = `api/type`;

    const response = await $host.get(URLRequest);
    return response.data.types;
}

