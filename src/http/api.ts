import { getErrorMessageFromServer } from "../utils/getErrorMessageFromServer";
import { AxiosError, AxiosInstance } from "axios";
import {$host, $authHost} from './index';

export class Api {
    protected adress: string;
    protected $host: AxiosInstance;
    protected $authHost: AxiosInstance;


    constructor(adress: string) {
        this.adress = adress;
        this.$host = $host;
        this.$authHost = $authHost;
    }

    protected errorHandler(error: Error) {
        let errorMessage: string = '';
        if(error instanceof AxiosError) {
            errorMessage = getErrorMessageFromServer(error);
        }
        return new Error(`${errorMessage}`)
    }
}