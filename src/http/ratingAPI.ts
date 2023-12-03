import { $authHost } from './index';
import {RateRequestParamsI, RateRequestResponseI} from '../model/serverModel/ratingReviewI';
import { Api } from './api';

class RatingApi extends Api {

    constructor(adress: string) {
        super(adress);
    }

    public async addNewuserRating(requestParams: RateRequestParamsI): Promise<RateRequestResponseI | Error> {
        try {
            const URLRequest = this.adress;
            const {itemId, rate} = requestParams;
            const {data} = await this.$authHost.post(URLRequest, {
                itemId,
                rate
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

    public async getItemRating(itemId: string): Promise<RateRequestResponseI[] | Error> {
        try {
            const URLRequest = `${this.adress}/${itemId}`;
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

    public async deleteUserRating(itemId: string): Promise<{message: string} | Error> {
        try {
            const URLRequest = this.adress;
            const {data} = await this.$authHost.delete(URLRequest,{data: {itemId}}); 

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

export default new RatingApi('api/rate');