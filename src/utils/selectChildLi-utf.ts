

export const selectChild = ( module: any) => {

    return (target: EventTarget, el: HTMLElement | null) => {
        if(
          ((target instanceof HTMLButtonElement) || (target instanceof HTMLLIElement))
          && el ) {
            const selected = el.querySelector(`.${module.selected}`);
            if(selected) {
              selected.classList.remove(module.selected);
            }    
    
            target.classList.add(module.selected);
          }
    }
  };