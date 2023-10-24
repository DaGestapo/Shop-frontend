import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export interface NewsI {
    id: string;
    img: string;
    title: string;
    description: string;
    createdDate: string;
}

export interface RequestNewsI {
    newsArticle: NewsI[];
}

export const newsAPI = createApi({
    reducerPath: 'newsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + 'api/'
    }),
    endpoints: (builder) => ({
        getNews: builder.query<RequestNewsI, number>({
            query: (limit) => `news?limit=${limit}`
        })
    })
});

export const {useGetNewsQuery} = newsAPI;