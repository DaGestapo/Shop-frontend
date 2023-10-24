

export interface WhishedItemI {
    id: string;
    name: string;
    price: number;
    img: string;
    colors: string[];
    sizes: string[];
}



export interface WhishedI {
    id: string;
    item: WhishedItemI;
}