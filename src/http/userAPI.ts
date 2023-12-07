import jwt_decode from 'jwt-decode';
import { UserI } from '../model/userI';
import { UserRequestI } from '../model/serverModel/userI';
import { Api } from './api';


class UserApi extends Api {
    constructor(adress: string) {
        super(adress);
    }

    public async registration(requestParams: UserRequestI): Promise<UserI | Error> {
        try {
            let URLRequest = `${this.adress}/registration`;
            const {username, email, password, passwordAgain} = requestParams;
            const {data} = await this.$host.post(
                URLRequest, 
                {username, email, password, passwordAgain, role: 'ADMIN'}
            );

            localStorage.setItem('token', data.token);

            return jwt_decode<UserI>(data.token);
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async login(email: string, password: string): Promise<UserI | Error> {
        try {
            let URLRequest = `${this.adress}/login`;

            const {data} = await this.$host.post(
                URLRequest, 
                {email, password}
            );

            localStorage.setItem('token', data.token);

            return jwt_decode<UserI>(data.token);
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async check(): Promise<UserI | Error> {
        try {
            let URLRequest = `${this.adress}/auth`;
            const {data} = await this.$authHost.get(URLRequest);

            localStorage.getItem('token');
            return jwt_decode<UserI>(data.token);
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async getUserBalance(id: string): Promise<string | Error> {
        try {
            const {data} = await this.$authHost.get(
                `api/user/${id}`, 
            );
            
            return data;
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async deleteUserAccount(userId: string): Promise<{message: string} | Error> {
        try {
            let URLRequest = this.adress;

            const {data} = await this.$authHost.delete(URLRequest, {data: {id: userId}});   

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

export default new UserApi('api/user');