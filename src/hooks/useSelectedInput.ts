import { useState, useEffect } from "react";

export const useSelectedInput = (calssName: string) => {
    const [selectedDiv, setSelectedDiv] = useState<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if(!selectedDiv) return;
      selectedDiv.classList.toggle(calssName);
  
      return () => {
        selectedDiv.classList.toggle(calssName);
      }
    }, [selectedDiv, setSelectedDiv]);


    return (eTarget: EventTarget | null) => {
      if(!(eTarget instanceof HTMLInputElement)) {
        setSelectedDiv(null);
        return;
      }
  
      const target = eTarget.closest('div');
      setSelectedDiv(target);
    } 
  }