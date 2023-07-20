import { type PlasmoCSConfig, type PlasmoGetOverlayAnchor } from 'plasmo';
import cssText from "data-text:~style.css"
import { usePopup } from "~lib/utils/use-popup";
import { Popup } from "~lib/utils/components/popup";
import { Trigger } from "~lib/utils/components/trigger";
import { useRecord } from '~lib/utils/use-record';
 
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function IndexPopup() {
  const {
    isRecording,
    setIsRecording,
    stack,
  } = useRecord();

  const {
    setIsPopupOpen,
    isPopupOpen
  } = usePopup();
  
  return (
    <>
      {
        isPopupOpen ? (
          <Popup
            isRecording={isRecording}
            stack={stack}
            setIsRecording={setIsRecording}
            setIsPopupOpen={setIsPopupOpen}
          />
        ) : (
          <Trigger
            isRecording={isRecording}
            setIsPopupOpen={setIsPopupOpen}
            setIsRecording={setIsRecording}
          />
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
