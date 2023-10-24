import jwt_decode from 'jwt-decode';
import { $host, $authHost } from './index';
import { UserI } from '../model/userI';


export const registration = async (
    username: string, 
    email: string, 
    password: string
) => {
    const {data} = await $host.post(
        'api/user/registration', 
        {username, email, password, role: 'ADMIN'}
    );
    localStorage.setItem('token', data.token);
    return jwt_decode<UserI>(data.token);
}

export const login = async (
    email: string, 
    password: string
) => {
    try {
        const {data} = await $host.post(
            'api/user/login', 
            {email, password}
        );
        localStorage.setItem('token', data.token);
        return jwt_decode<UserI>(data.token);
    } catch (error) {
        return null;
    }
}


export const check = async () => {
    try {
        const {data} = await $authHost.get(
            'api/user/auth', 
        );

        localStorage.getItem('token');
        return jwt_decode<UserI>(data.token);
    } catch (error) {
        return null;
    }
}

export const getBalance = async (id: string) => {
    try {
        const {data} = await $authHost.get(
            `api/user/${id}`, 
        );
        return data;
    } catch (error) {
        return null;
    }
}