import { useState, useEffect } from "react";
import { useAppSelector } from "./reduxTypedHools";
import { ItemFullI } from "../model/stateModel/itemI";


export const useGetItemByCallback = (
  callback:(typeId: number, brandId?: number, page?: number) => Promise<void>
  ):
[
  items: ItemFullI[] | null,
  type: number,
  setTypeId: React.Dispatch<React.SetStateAction<number>>
] => {
  const itemState = useAppSelector(state => state.item);
  const [typeId, setTypeId] = useState<number>(0);
  const [items, setItems] = useState<ItemFullI[] | null>(null);


  useEffect(() => {
    if(itemState[typeId]) {
        setItems(itemState[typeId].items);
      }
    else {

      callback(typeId);
    }
  }, [itemState, typeId, items]);

  return [items, typeId, setTypeId]
} 