import { ItemFullI, ItemInfoWithColorsSizes, ItemImgsI } from '../model/stateModel/itemI';
import { $host } from './index';
import { ItemRequestParamsI } from '../model/serverModel/itemI';

export const getItems = async({limit,
    page,
    brandId,
    typeId
}: ItemRequestParamsI): Promise<ItemFullI[]> => {
    let URLRequest = `api/item?limit=${limit? limit: 8}&page=${page? page: 1}`;
    if(typeId) {
        URLRequest +=`&typeId=${typeId}`;
    }
    if(brandId) {
        URLRequest += `&brandId=${brandId}`
    }

    const response = await $host.get(URLRequest);
    
    let items: ItemFullI[] = [];
    for(let i = 0; i < response.data.length; i++) {
        const itemImage: ItemImgsI = {
            id: response.data[i].item_imgs.id,
            img: JSON.parse(response.data[i].item_imgs.img)
        };

        const itemInfo: ItemInfoWithColorsSizes = {
            colors: JSON.parse(response.data[i].item_info.colors),
            sizes: JSON.parse(response.data[i].item_info.sizes),
            id: response.data[i].item_info.id,
            description: response.data[i].item_info.description,
            available: response.data[i].item_info.available
        }

         items.push({
            ...response.data[i],
            item_imgs: itemImage,
            item_info: itemInfo
        });
    }

    return items;
}

export const getItemById = async(itemId: string): Promise<ItemFullI> => {
    try {
        const URLRequest = `api/item/${itemId}`;
        const response = await $host.get(URLRequest);  
        const itemImage: ItemImgsI = {
            id: response.data.item_imgs.id,
            img: JSON.parse(response.data.item_imgs.img)
        }
        const itemInfo: ItemInfoWithColorsSizes = {
            colors: JSON.parse(response.data.item_info.colors),
            sizes: JSON.parse(response.data.item_info.sizes),
            id: response.data.item_info.id,
            description: response.data.item_info.description,
            available: response.data.item_info.available
        }
        const item: ItemFullI = {
            ...response.data,
            item_imgs: itemImage,
            item_info: itemInfo
        }
        
        return item;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`)
    }
}

export const getItemInfo = async(itemId: string): Promise<ItemInfoWithColorsSizes> => {
    try {
        const URLRequest = `api/item/info/${itemId}`;
        const response = await $host.get(URLRequest);
        const itemInfo: ItemInfoWithColorsSizes = {
            colors: JSON.parse(response.data.colors),
            sizes: JSON.parse(response.data.sizes),
            id: response.data.id,
            description: response.data.description,
            available: response.data.available
        }
   
        return itemInfo;

    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const getHotItems = async({limit, page}: ItemRequestParamsI): Promise<ItemFullI[]> => {
    let URLRequest = `api/item?limit=${limit? limit: 8}&page=${page? page: 1}&hot=true`;

    const response = await $host.get(URLRequest);
    const items: ItemFullI[] = []

    for(let i = 0; i < response.data.length; i++) {
        const itemImage: ItemImgsI = {
            id: response.data[i].item_imgs.id,
            img: JSON.parse(response.data[i].item_imgs.img)
        };

        const itemInfo: ItemInfoWithColorsSizes = {
            colors: JSON.parse(response.data[i].item_info.colors),
            sizes: JSON.parse(response.data[i].item_info.sizes),
            id: response.data[i].item_info.id,
            description: response.data[i].item_info.description,
            available: response.data[i].item_info.available
        }

         items.push({
            ...response.data[i],
            item_imgs: itemImage,
            item_info: itemInfo
        });
    }
    
    return items;
}
