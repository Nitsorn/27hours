import $ from 'jquery';

export const useAutomate = () => {
  const sleepFor = async (sleepDuration) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(void 0);
      }, sleepDuration);
    });
  }

  const startSimulation = async (stack) => {
    console.log('stack', stack);
    
    
    for (let i = 0; i < stack.length; i++) {
      console.log(stack.length);
      console.log('stack[i]', stack[i]);
      
      try {
        let element = $(stack[i].target)[0];
        console.log(1, element);
        
        if (!element) {
          element = document.querySelector(stack[i].target);
          console.log(2, element);
        }
        if (!element) {
          element = $(document).find(stack[i].target)[0];
          console.log(3, element);
        }
        console.log('element', element);
        

        if (!element) {
          continue;
        }

        if (stack[i].type === 'click' && stack[i].target) {

          console.log('clicking on', stack[i].target);
          element.click();
          // element.focus();

          // dispatch event click
          // element.dispatchEvent(new Event('click', {
          //   bubbles: true,
          // }));
          // // dispatch mousedown event
          element.dispatchEvent(new Event('mousedown', {
            bubbles: true,
          }));

        } else if (stack[i].type === 'keydown' && stack[i].target && stack[i].value) {

          console.log('keydown on', stack[i].target);
          const value = stack[i].value;
          console.log('keydown value', value);

          console.log('element.contentEditable', element.contentEditable);
          
          if (element.tagName === 'DIV' && element.contentEditable === 'true') {
            // this is content editable
            // we set value to the smallest child
            console.log('content editable, going to smallest child');
            
            const children = element.children;
            if (children.length > 0) {
              element = children[0];
            }
          }

          console.log('element', element);

          element.focus();
          element.click();
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = value;
            element.dispatchEvent(new Event('input', {
              bubbles: true,
            }));
          } else {
            element.textContent = value;
            element.dispatchEvent(new Event('input', {
              bubbles: true,
            }));
          }
          
        }
      } catch (error) {
        console.log('error', error);
      }
      await sleepFor(1000);
    }

    alert('Simulation complete')
  }

  return {
    startSimulation,
  }
}