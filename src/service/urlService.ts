import { LinkI } from "../model/linkI";
import { convertStringToWhiteSpace } from "../utils/convertStringToWhiteSpace-utf";
import { findItemInStateById } from "../utils/findItemInStateById";
import { ItemsI } from "../model/stateModel/itemI";

class UrlService {

    public convertUrlToArray(url: string) {
        return url.split('/').filter(item => {
            if(item.length >= 1) return item;
          });
    }

    public creteRouteString(endpoind: string) {
        return'/' + endpoind;
    }

    public createObjectPropsFromUrl(url: string[]) {
        const length = url.length;
        let tempLinks: LinkI[] = [];
        let tempRoute: string = '';

        for(let i = 0; i < length; i++ ) {
            tempRoute += this.creteRouteString(url[i]);
            if(url[i].includes('-')) break;
            
              tempLinks.push({
                name: url[i],
                route: tempRoute
              });
          };
          

          return tempLinks;
    }

    public getItemEndpoint(url: string[]) {
        return convertStringToWhiteSpace(url[url.length - 1], '%20');
    }

    public getItemId(url: string[]) {
      return url[url.length - 1];
    }

    public addItemNameToDisplayRoute(links: LinkI[], name: string, id: string) {
      links.push({
        name,
        route: id
      })
    }

    public findItemInStateItems(state: ItemsI[], itemId: string): LinkI | null {
      const item = findItemInStateById(state, itemId);

      if(item) {
        return {
          name: item.name,
          route:  item.id
        }
      }

      return null;
    }
}


export default new UrlService();
