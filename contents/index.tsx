import { useCallback, useEffect, useMemo, useState } from "react"
import { type PlasmoCSConfig, type PlasmoGetOverlayAnchor } from 'plasmo';
import cssText from "data-text:~style.css"
import $ from 'jquery';
import {finder} from '@medv/finder'
 
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function getSelector(t) {
  let target = t;
  let targetName = target.constructor.name;

  const validTargetNames = ['HTMLDivElement', 'HTMLAnchorElement', 'HTMLButtonElement', 'HTMLInputElement', 'HTMLTextAreaElement', 'HTMLSelectElement'];

  // check if the target is a valid target
  // if not, get the closest valid target
  if (!validTargetNames.includes(targetName)) {
    target = target.closest('div, button, a, input, textarea, select');
    targetName = target.constructor.name;

    if (!target) {
      return;
    }
  }

  const selector = finder(target, {
    root: document.body,          // Root of search, defaults to document.body.
    idName: (name) => false,       // Check if this ID can be used.
    className: (name) => false,    // Check if this class name can be used.
    tagName: (name) => false,      // Check if tag name can be used.
    attr: (name, value) => false, // Check if attr name can be used.
    seedMinLength: 5,           
    optimizedMinLength: 2,
    threshold: 1000,
    maxNumberOfTries: 10_000,
  });
  return selector;
}



function IndexPopup() {
  const [stack, setStack] = useState([]);

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const stack = [];

    const handleClick = (e) => {
      console.log('click');

      stack.push({
        type: 'click',
        target: getSelector(e.target)
      });

      setStack(stack);

      console.log('stack', stack);
      
      // listen to input typing
      // TODO only input for now
      if (e.target.tagName === 'INPUT') {
        listenToInputTyping(e.target);
      }

    }

    // TODO only for enter for now
    const handleKeydown = (e) => {
      
      if (e.key === 'Enter') {
        
        stack.push({
          type: 'keydown',
          target: getSelector(e.target),
          value: e.key
        });
        
        setStack(stack);
      }

    }

    /**
     * if we clicked on input previously
     * focus and listen for value
     */
    
    const listenToInputTyping = (element) => {
      if (!element) {
        return;
      }
      
      let value = element.value;

      const inputEventHandler = (e) => {
        console.log('input', e.target.value);
        value = e.target.value;
      }

      element.addEventListener('keydown', inputEventHandler);

      element.addEventListener('blur', () => {
        stack.push({
          type: 'keydown',
          target: getSelector(element),
          value
        });

        setStack(stack);
        element.removeEventListener('input', inputEventHandler);
      });
    }



    if (isRecording) {
      document.addEventListener("click", handleClick, true)
      window.addEventListener("keydown", handleKeydown);
    }

    if (!isRecording) {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("keydown", handleKeydown);
    }
    
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("keydown", handleKeydown);
    }

  }, [isRecording])

  const sleepFor = async (sleepDuration) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(void 0);
      }, sleepDuration);
    });
  }

  const startSimulation = async () => {
    
    for (let i = 0; i < stack.length; i++) {
      try {
        const element = $(stack[i].target)[0];

        if (!element) {
          continue;
        }

        if (stack[i].type === 'click' && stack[i].target) {

          console.log('clicking', stack[i].target);
          element.click();
          element.focus();

        } else if (stack[i].type === 'keydown' && stack[i].target) {

          const value = stack[i].value;
          console.log('keydown', value);

          if (value === 'Enter') {
            element.dispatchEvent(new KeyboardEvent('keydown', {
              key: 'Enter',
              bubbles: true,
              cancelable: true,
            }));
            continue;
          }

          element.value += value;
        }
      } catch (error) {
        console.log('error', error);
      }
      await sleepFor(1000);
    }
  }
  
  return (
    <>
      {
        isRecording ? (
          <div className="bg-white p-10" onClick={() => setIsRecording(false)}>stop recording</div>
        ) : (
          <div className="bg-white p-10" onClick={() => setIsRecording(true)}>start recording</div>
        )
      }
      {
        (!isRecording && stack.length > 0) && (
          <div onClick={startSimulation} className="bg-white p-10">Start simulation</div>
        )
      }
    </>
  )
}

export default IndexPopup

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
	  document.querySelector<HTMLElement>("body")
