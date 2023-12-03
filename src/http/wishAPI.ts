import { WishedResponseI } from '../model/serverModel/wishI';
import { Api } from './api';



class WishApi extends Api {
    constructor(adress: string) {
        super(adress);
    }

    public async addWishItem(itemId: string): Promise<{message: string} | Error> {
        try {
            const URLRequest = this.adress;
            const {data} = await this.$authHost.post(URLRequest, {
                itemId
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

    public async getUserWhishedItems():  Promise<WishedResponseI[] | Error> {
        try {
            const URLRequest = this.adress;
            const {data} = await this.$authHost.get(URLRequest);

            return data;
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async deleteWhishedItemByWhishedItemId(wishItemId: string): Promise<WishedResponseI[] | Error> {
        try {
            const URLRequest = this.adress;
            const {data} = await this.$authHost.delete(URLRequest, {data: {wishItemId}});
        
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

export default new WishApi('api/wish');