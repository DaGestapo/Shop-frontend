import { AxiosError } from "axios";


export const getErrorMessageFromServer = (error: AxiosError) => {
    
    const tempObj = {
        message: '',
        sIndex: 0,
        eIndex: 0
    }

    if(error.response && error.response.data) {
        const data: any = error.response.data;
        tempObj.sIndex = data.search(':');
        tempObj.eIndex = data.search('<br>');

        tempObj.message = data.slice(tempObj.sIndex + 1, tempObj.eIndex);
    }
    
    return tempObj.message;
}