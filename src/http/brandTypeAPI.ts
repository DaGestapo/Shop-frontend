import { OptionsI } from '../model/serverModel/optionsI';

import { Api } from './api';

class BrandTypeAPi extends Api {

    constructor(adress: string) {
        super(adress);
    }

    public async createNewBrandType(name: string): Promise<OptionsI | Error> {
        try {
            let URLRequest = this.adress;

            const {data} = await this.$host.post(URLRequest, {name});
            return data;

        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async getAllBrandType(): Promise<OptionsI[] | Error> {
        try {
            let URLRequest = this.adress;

            const {data} = await this.$host.get(URLRequest);
            return data;
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }

    }
    
    public async getOneBrandTypeById(brandId: number): Promise<OptionsI | Error> {
        try {
            let URLRequest = `${this.adress}/${brandId}`;
            const {data} = await this.$host.get(URLRequest);
            return data;

        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async deleteBrandTypeById(brandId: number): Promise<OptionsI[] | Error> {
        try {
            let URLRequest = `${this.adress}/${brandId}`;
            const {data} = await this.$authHost.post(URLRequest, {
                brandId
            });

            return data;

        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }
}


export const brandApi = new BrandTypeAPi('api/brand');
export const typeApi = new BrandTypeAPi('api/type');