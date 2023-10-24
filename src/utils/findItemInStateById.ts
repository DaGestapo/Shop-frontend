import { ItemFullI } from "../model/stateModel/itemI";
import { ItemsI } from "../model/stateModel/itemI";

export const findItemInStateById = (state: ItemsI[], itemId: string): ItemFullI | null => {
    const length = state.length;

    for(let i = 0; i < length; i++ ) {
      if(!state[i]) return null;
        for(let j = 0; j < state[i].items.length; j++) {
          if(itemId === state[i].items[j].id) {
            return state[i].items[j];
          }
        }
      }

      return null;
}