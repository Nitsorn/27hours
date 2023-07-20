import { useAutomate } from "../use-automate";
import { useRecord } from "../use-record";

interface Props {
  setIsPopupOpen: (value: boolean) => void;
  setIsRecording: (value: boolean) => void;
  isRecording: boolean;
  stack: any[];
}

export const Popup = (props: Props) => {

  const {
    isRecording,
    setIsRecording,
    stack,
    setIsPopupOpen,
  } = props;


  const {
    startSimulation,
  } = useAutomate();

  return (
    <div onClick={() => setIsPopupOpen(false)} className="fixed z-40 bg-gray-900 bg-opacity-40 w-full h-full flex items-center justify-center">
      <div onClick={e => e.stopPropagation()} className="bg-white w-full max-w-[400px] p-5 rounded-lg flex flex-col gap-5">
        <input type="text" placeholder="Cmd K | Search Commands" className="border-0 border-b-2 border-gray-200 text-2xl p-3" />
        <label htmlFor="shortcuts" className=" uppercase text-sm text-gray-400">Shortcuts</label>
        <div className="flex flex-col gap-2">
          <button className=" font-medium text-lg text-gray-500 py-4 px-7 rounded-md hover:bg-purple-200 cursor-pointer flex flex-row justify-start gap-2" onClick={() => {
            setIsPopupOpen(false);
            setIsRecording(true);
          }}>
            <span>+</span>
            <span>Create new</span>
          </button>

          {
            (!isRecording && stack.length > 0) && (
              <button className=" font-medium text-lg text-gray-500 py-4 px-7 rounded-md hover:bg-purple-200 cursor-pointer flex flex-row justify-start gap-2" onClick={() => {
                startSimulation(stack);
                setIsPopupOpen(false);
              }}>
                <span>!!</span>
                <span>Shortcut #1</span>
              </button>
            )
          }
        </div>

        {/* {
          isRecording ? (
            <div className="bg-white p-10" onClick={() => {
              setIsRecording(false);
            }}>stop recording</div>
          ) : (
            <div className="bg-white p-10" onClick={() => {
              setIsPopupOpen(false);
              setIsRecording(true)
            }}>start recording</div>
          )
        }
        {
          (!isRecording && stack.length > 0) && (
            <div onClick={() => {
              startSimulation(stack);
              setIsPopupOpen(false);
            }} className="bg-white p-10">Start simulation</div>
          )
        } */}
      </div>
    </div>
  )
}