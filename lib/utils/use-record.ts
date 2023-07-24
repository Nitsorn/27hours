import { useEffect, useState } from "react";
import { getSelector, typeableClosestElement, type SupportedPlatform } from "~lib/utils";
import { usePlatform } from "./use-platform";

export interface StackInfo {
  icon?: string;
  name: string;
  description: string;
}

export const useRecord = () => {
  const [stack, setStack] = useState([]);
  const [stackInfo, setStackInfo] = useState<StackInfo>({
    name: '',
    description: '',
  });

  const [isRecording, setIsRecording] = useState(false);

  const { platform } = usePlatform();

  useEffect(() => {
    const stack = [];

    const handleClick = (e) => {
      console.log('click');
      const target = getSelector(e.target, platform);

      if (!target) {
        return;
      }
      stack.push({
        type: 'click',
        target: getSelector(e.target, platform)
      });

      setStack(stack);

      console.log('stack', stack);
      
      const relatedInputTarget = typeableClosestElement(e.target);

      console.log('relatedInputTarget', relatedInputTarget);
      
      // listen to input typing
      if (Boolean(relatedInputTarget)) {
        listenToInputTyping(relatedInputTarget);
      }

    }

    // TODO only for enter for now
    const handleKeydown = (e) => {
      console.log('getting in keydown handler', e.key);
      
      
      if (e.key === 'Enter') {
        
        stack.push({
          type: 'keydown',
          target: getSelector(e.target, platform),
          value: e.key
        });
        
        setStack(stack);
      }

    }

    /**
     * if we clicked on input previously
     * focus and listen for value
     */
    
    const listenToInputTyping = (eventTarget) => {
      if (!eventTarget) {
        return;
      }
      

      // removing a few of these looks like on blur is enough
      // let value = eventTarget.value;

      // const inputEventHandler = (e) => {
      //   console.log(e);
        
      //   console.log('input', e.target.value);
      //   value = e.target.value;
      // }

      // eventTarget.addEventListener('input', inputEventHandler);

      
      eventTarget.addEventListener('blur', (e) => {
        if (e.target.value !== '' || e.target.textContent !== '') {

          stack.push({
            type: 'keydown',
            target: getSelector(eventTarget, platform),
            value: e.target.value || e.target.textContent, 
          });
          
          setStack(stack);
          // eventTarget.removeEventListener('input', inputEventHandler);
        }
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

  return {
    stack,
    isRecording,
    setIsRecording,
    stackInfo,
    setStackInfo
  }
}