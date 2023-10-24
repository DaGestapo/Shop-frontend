import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface FeaturedItemI {
    id: string;
    title: string;
    price: string;
    priceOff?: string;
    img: string;
}

export interface FeaturedItemsI {
    articles: FeaturedItemI[];
}

export const featuredItemAPI = createApi({
    reducerPath: 'featuredItemAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + 'api/'
    }),
    endpoints: builder => ({
        getFeaturedItems: builder.query<FeaturedItemsI, number>({
            query: limit => `featured?limit=${limit}`
        })
    })
});

export const {useGetFeaturedItemsQuery} = featuredItemAPI;