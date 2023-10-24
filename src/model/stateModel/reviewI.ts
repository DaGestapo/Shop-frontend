import { UserI } from "./userI";
import { RatingI } from "./ratingI";

export interface ReviewI {
    id: string;
    review: string;
    user: UserI;
    rating: RatingI;
}
