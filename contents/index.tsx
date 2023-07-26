import { type PlasmoCSConfig, type PlasmoGetOverlayAnchor } from 'plasmo';
import cssText from "data-text:~style.css"
import { usePopup } from "~lib/utils/use-popup";
import { Popup } from "~lib/components/popup";
import { Trigger } from "~lib/components/trigger";
import { useRecord } from '~lib/utils/use-record';
import { useAutomations } from '~lib/utils/use-automations';
 
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function RootComponent() {
  const {
    isRecording,
    setIsRecording,
    stack,
    stackInfo,
    setStackInfo,
  } = useRecord();

  const { automations, setAutomations } = useAutomations();

  const {
    setIsPopupOpen,
    isPopupOpen,
    isCreatingNew,
    setIsCreatingNew
  } = usePopup();
  
  return (
    <>
      {
        isPopupOpen ? (
          <Popup
            isRecording={isRecording}
            automations={automations}
            setAutomations={setAutomations}
            setIsRecording={setIsRecording}
            setIsPopupOpen={setIsPopupOpen}
            setIsCreatingNew={setIsCreatingNew}
            isCreatingNew={isCreatingNew}
            setStackInfo={setStackInfo}
            stackInfo={stackInfo}
          />
        ) : (
          <Trigger
            isRecording={isRecording}
            onStopRecording={() => {
              setIsCreatingNew(false);
              setIsPopupOpen(true);
              setIsRecording(false);
              setAutomations([...automations, {
                info: {
                  name: stackInfo.name,
                  description: stackInfo.description,
                },
                steps: stack,
              }])
            }}
            setIsPopupOpen={setIsPopupOpen}
          />
        )
      }
    </>
  )
}

export default RootComponent

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
	  document.querySelector<HTMLElement>("body")
