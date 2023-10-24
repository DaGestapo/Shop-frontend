

export interface CartedItemI {
    img: string;
    name: string;
    price: number;
    id: string;
    quantity: number;
}

export interface CartedItemStateI extends CartedItemI {
    color: string;
    size: number;
}

export interface CartI {
    total: number;
    cartedItem: CartedItemStateI[];
}

export interface CartOrderInfoI {
    color: string;
    size: number;
  }
  
  export interface CartInformationI extends CartOrderInfoI {
    countedItem: number;
  }