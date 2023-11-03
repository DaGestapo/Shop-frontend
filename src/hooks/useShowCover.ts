import {RefObject, useEffect} from 'react';


export const useShowCover = (
    item: RefObject<HTMLDivElement>, 
    cover: RefObject<HTMLDivElement>,
    img: RefObject<HTMLImageElement>
    ) => {

    useEffect(() => {
        item.current?.addEventListener('mouseenter', setCoverDiv);
        item.current?.addEventListener('mouseleave', hideCover);

        function setCoverDiv () {
            if(!cover.current || !img.current) return;  
         
            const imgHeight = img.current.getBoundingClientRect().height;

            img.current.style.display = 'none';
            cover.current.style.display = 'flex';
            cover.current.style.height = `${imgHeight}px`;
        }
    
        function hideCover (e: globalThis.MouseEvent) {
            if(!cover.current || !img.current) return;

            if(!e.relatedTarget) {
                return;
            } else{
                img.current.style.display = 'flex';
                cover.current.style.display = 'none';
                cover.current.style.height = `0px`;
            }
            
            
        }

        return () => {
            item.current?.removeEventListener('mouseleave', hideCover);
            item.current?.removeEventListener('mouseenter', setCoverDiv);
        }
    }, [item, cover]);
}