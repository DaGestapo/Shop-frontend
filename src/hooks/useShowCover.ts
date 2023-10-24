import {RefObject, useEffect} from 'react';


export const useShowCover = (
    item: RefObject<HTMLDivElement>, 
    cover: RefObject<HTMLDivElement>,
    ) => {

    useEffect(() => {
        item.current?.addEventListener('mouseenter', setCoverDiv);
        item.current?.addEventListener('mouseleave', hideCover);

        function setCoverDiv () {
            if(!cover.current) return;  
         
            cover.current.style.display = 'flex';
        }
    
        function hideCover (e: globalThis.MouseEvent) {
            if(!cover.current) return;

            if(!e.relatedTarget) {
                return;
            } else{
                cover.current.style.display = 'none';
            }
            
            
        }

        return () => {
            item.current?.removeEventListener('mouseleave', hideCover);
            item.current?.removeEventListener('mouseenter', setCoverDiv);
        }
    }, [item, cover]);
}