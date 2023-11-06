import { FC, createRef, useEffect, PropsWithChildren } from "react";
import module from './ShopItemTitle.module.scss';

interface ShopItemTitleI extends PropsWithChildren{
    
}

const ShopItemTitle: FC<ShopItemTitleI> = ({children}) => {
    const h4Ref = createRef<HTMLHeadingElement>();
    const titleDivRef = createRef<HTMLDivElement>();

    return (
        <div ref={titleDivRef} className={module.title}>
                <h4 ref={h4Ref}>
                    {children}
                </h4>
                
            </div>
    )
}

export default ShopItemTitle;