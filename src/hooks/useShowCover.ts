import {RefObject, useEffect} from 'react';


export const useShowCover = (
    item: RefObject<HTMLDivElement>, 
    cover: RefObject<HTMLDivElement>,
    img: RefObject<HTMLImageElement>
    ) => {

        useEffect(() => {
            if(!cover.current || !item.current) return;
            let cheker: boolean = true; 
            item.current.addEventListener('mouseenter', setCoverDiv);
            item.current.addEventListener('mouseleave', hideCover);

            function setCoverDiv (e: globalThis.MouseEvent) {
                if(!cover.current || !img.current) return;  
                if(cheker === false) return;
                cheker = true;

                const imgHeight = img.current.getBoundingClientRect().height;

                img.current.style.display = 'none';
                cover.current.style.display = 'flex';
                cover.current.style.height = `${imgHeight}px`;
            }
        
            function hideCover (e: globalThis.MouseEvent) {
                if(!cover.current || !img.current) return;
                if(!e.relatedTarget) {   
                    cheker = false;
                } else{
                    cheker = true;
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