import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { AdvantagesI } from '../../model/stateModel/articleI';

export const advantageAPI = createApi({
    reducerPath: 'advantageAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + 'api/'
    }),
    endpoints: builder => ({
        getAdvantages: builder.query<AdvantagesI, number>({
            query: (limit) => `advantage?limit=${limit}`
        })
    })
});

export const {useGetAdvantagesQuery} = advantageAPI; 