import { UserI } from "../stateModel/userI";


//_______________________ Rating

export interface RateRequestParamsI {
    rate: Number;
    itemId: string;
}

export interface RateRequestResponseI {
    id: string;
    rate: Number;
}

//_______________________ Review

export interface ReviewReviewParamsI {
    reviewText: string;
}

export interface ReviewReviewCreateParamsI extends ReviewReviewParamsI{
    itemId: string;
}

export interface ReviewReviewChangeParamsI extends ReviewReviewParamsI{
    reviewId: string;
}

export interface ReviewRequestResponseI {
    id: string;
    review: string;
}

export interface ReviewRequestResponseWitchUserI extends UserI {
    id: string;
    review: string;
}