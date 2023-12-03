import { Api } from './api';
import {
    ReviewReviewChangeParamsI, 
    ReviewReviewCreateParamsI, 
    ReviewRequestResponseI,
    ReviewRequestResponseWitchUserI
} from '../model/serverModel/ratingReviewI';


class ReviewApi extends Api {
    constructor(adress: string) {
        super(adress);
    }

    public async addUserReview(requestParams: ReviewReviewCreateParamsI): Promise<ReviewRequestResponseI | Error> {
        try {
            const URLRequest = this.adress;
            const {itemId, reviewText} = requestParams;
            const {data} = await this.$authHost.post(URLRequest, {
                itemId,
                reviewText
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

    public async changeUserReviewText(requestParams: ReviewReviewChangeParamsI): Promise<ReviewRequestResponseI | Error> {
        try {
            const URLRequest = this.adress;
            const {reviewId, reviewText} = requestParams;
            const {data} = await this.$authHost.put(URLRequest, {
                reviewId,
                reviewText
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

    public async getAllItemReviews(itemId: string): Promise<ReviewRequestResponseWitchUserI[] | Error> {
        try {
            const URLRequest = `${this.adress}/${itemId}`;
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

    public async deleteUserReview(reviewId: string): Promise<{message: string | Error}> {
        try {
            const URLRequest = this.adress;
            const {data} = await this.$authHost.delete(URLRequest, {data:{
                reviewId
            }});  

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

export default new ReviewApi('api/review');