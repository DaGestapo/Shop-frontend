import { $host } from './index';
import { OptionsI } from '../model/serverModel/optionsI';

export const getAllBrands = async (): Promise<OptionsI[]>=> {
    let URLRequest = `api/brand`;

    const response = await $host.get(URLRequest);
    return response.data.brands;
}

