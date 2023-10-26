import { $authHost } from './index';


export const addUserReview = async(reviewText: string, itemId: string) => {
    try {
        const URLRequest = `api/review`;
        const response = await $authHost.post(URLRequest, {
            itemId,
            reviewText
        });  
        return response.data;
    } catch (error) {
        
    }
}

export const changeReviewText = async(reviewText: string, reviewId: string) => {
    const URLRequest = `api/review`;
        const response = await $authHost.put(URLRequest, {
            reviewId,
            reviewText
        });  
        return response.data;
}