import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import urlService from '../service/urlService';
import { useAppSelector } from './reduxTypedHools';
import { LinkI } from '../model/linkI';

export const useCalcRoute = (itemId?: string) => {
  const {pathname} = useLocation();
  const [links, setLinks] = useState<LinkI[] | null>(null);
  const itemState = useAppSelector(state => state.item);

  useEffect(() => {
    const patchnameArr = urlService.convertUrlToArray(pathname);
    const links = urlService.createObjectPropsFromUrl(patchnameArr);

    if(itemId) {
      const item = urlService.findItemInStateItems(itemState, itemId);
      if(item) {
        urlService.addItemNameToDisplayRoute(
          links, 
          item.name, 
          item.route
          )
      } 
    }
    setLinks(links);
    
  }, [pathname, itemId]);

  return links;
}
