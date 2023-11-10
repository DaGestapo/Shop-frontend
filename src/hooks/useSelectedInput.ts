import { useState, useEffect } from "react";

export const useSelectedInput = (selectedName: string) => {
    const [selectedDiv, setSelectedDiv] = useState<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if(!selectedDiv) return;
 
      selectedDiv.classList.toggle(selectedName);
  
      return () => {
        selectedDiv.classList.toggle(selectedName);
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