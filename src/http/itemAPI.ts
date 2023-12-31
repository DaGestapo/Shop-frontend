import { ItemFullI, ItemInfoWithColorsSizes, ItemImgsI } from '../model/stateModel/itemI';
import { ItemRequestParamsI } from '../model/serverModel/itemI';

import { Api } from './api';

class ItemApi extends Api {

    constructor(adress: string) {
        super(adress);
    }

    public async getAllitems(requestParams: ItemRequestParamsI): Promise<ItemFullI[] | Error> {
        try {
            const {limit, page, brandId, typeId, leftPrice, rightPrice} = requestParams;

            let URLRequest = `${this.adress}?limit=${limit? limit: 8}&page=${page? page: 1}&leftPrice=${leftPrice}&rightPrice=${rightPrice}`;
            
            if(typeId) {
                URLRequest +=`&typeId=${typeId}`;
            }
            if(brandId) {
                URLRequest += `&brandId=${brandId}`
            }
    
            const items: ItemFullI[] = [];
            const {data} = await this.$host.get(URLRequest);
            
            for(let i = 0; i < data.length; i++) {
                items.push(this.packItemResponse.bind(this)(data[i]));
            }
            return items;
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async getItemById(itemId: string): Promise<ItemFullI | Error> {
        try {
            const URLRequest = `${this.adress}/${itemId}`;
            const {data} = await this.$host.get(URLRequest); 
    
            return this.packItemResponse.bind(this)(data);
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async getItemInfo(itemId: string): Promise<ItemInfoWithColorsSizes | Error> {
        try {
            const URLRequest = `api/item/info/${itemId}`;
            const {data} = await this.$host.get(URLRequest);
            const itemInfo: ItemInfoWithColorsSizes = this.packInfoResponse.bind(this)(data);
       
            return itemInfo;
    
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }

    public async getHotItems (requestParams: ItemRequestParamsI): Promise<ItemFullI[] | Error> {
        try {
            const {limit, page} = requestParams;
            let URLRequest = `${this.adress}?limit=${limit? limit: 8}&page=${page? page: 1}&hot=true`;

            const {data} = await this.$host.get(URLRequest);
            const items: ItemFullI[] = [];
           
            for(let i = 0; i < data.length; i++) {
                items.push(this.packItemResponse.bind(this)(data[i]));
            }
            return items;
        } catch (error) {
            if(error instanceof Error) {
                return this.errorHandler.bind(this)(error);
            } else {
                return new Error('Unexpected error');
            }
        }
    }



    protected packItemResponse(data: any) {
        const itemImage: ItemImgsI = this.packImgsResponse.bind(this)(data);
        const itemInfo: ItemInfoWithColorsSizes = this.packInfoResponse.bind(this)(data);
        return {
            ...data,
            item_imgs: itemImage,
            item_info: itemInfo
        }
    }

    protected packInfoResponse(data: any): ItemInfoWithColorsSizes {
        return {
            colors: JSON.parse(data.item_info.colors),
            sizes: JSON.parse(data.item_info.sizes),
            id: data.item_info.id,
            description: data.item_info.description,
            available: data.item_info.available
        
        }
    }

    protected packImgsResponse(data: any): ItemImgsI {
        return {
            id: data.item_imgs.id,
            img: JSON.parse(data.item_imgs.img)
        }
    }
}

export default new ItemApi('api/item');