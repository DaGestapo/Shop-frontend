import {useEffect, useState, useMemo} from 'react';
import { ItemI } from '../model/stateModel/itemI';
import { useLoader } from './useLoader';

export interface PaginationI {
    page: number;
    type: number;
    listener: boolean;
    listLength: number;
  }
  
export const usePagination = (
  items: ItemI[] | null,
  typeId?: number
  ) : [
      state: PaginationI, 
      setState: React.Dispatch<React.SetStateAction<PaginationI>>,
      loadNewPage: (pages: number) => void
  ] => {
    const loader = useLoader(10);
    const [state, setState] = useState<PaginationI>({
        type: typeId? typeId : 0,
        page: 1,
        listener: false,
        listLength: 0
      });
    const isPaginationEnd = useMemo((): boolean => {
        if(!items) return false;
        return items.length % 10 === 0;
    }, [state.page]);


    useEffect(() => {
        if(isPaginationEnd) {
          loader()(state.type, state.page);
        }
    }, [state.listener]);

    const listener = (pages: number): void => {
      if(!items) return;

      if(items.length === state.listLength) return;

      setState({
        ...state, 
        page: pages+1,
        listener: !state.listener,
        listLength: items.length
      });
    }

    return [state, setState, listener];
}
