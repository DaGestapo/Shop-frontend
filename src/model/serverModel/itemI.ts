

export interface ItemRequestParamsI {
    limit?: number;
    page?: number;
    brandId?: number;
    typeId?: number;
    leftPrice?: number, 
    rightPrice?: number, 
}

export interface RequestItemInfoColorsSizes {
    colors: string;
    sizes: string;
}