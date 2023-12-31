import { useAutomate } from "../utils/use-automate";
import { TbPencil, TbPlus, TbSearch, TbTrash } from 'react-icons/tb';
import type { StackInfo } from "../utils/use-record";
import { NewAutomation } from "./new-automation";
import type { Automation } from "~lib/utils/use-automations";

interface Props {
  setIsPopupOpen: (value: boolean) => void;
  setIsRecording: (value: boolean) => void;
  isRecording: boolean;
  setIsCreatingNew: (value: boolean) => void;
  isCreatingNew: boolean;
  setStackInfo: (value: StackInfo) => void;
  stackInfo: StackInfo;
  automations: Automation[];
  setAutomations: (value: Automation[]) => void;
}

export const Popup = (props: Props) => {

  const {
    isRecording,
    setIsRecording,
    automations,
    setAutomations,
    setIsPopupOpen,
    setIsCreatingNew,
    isCreatingNew,
    setStackInfo,
    stackInfo,
  } = props;

  const {
    startSimulation,
  } = useAutomate();

  if (isCreatingNew) {
    return (
      <NewAutomation 
        setStackInfo={setStackInfo}
        stackInfo={stackInfo}
        onBack={() => {
          setIsCreatingNew(false);
        }}
        onStartRecording={() => {
          if (stackInfo.name === "") {
            alert("Please enter a name for the automation");
            return;
          }
          if (stackInfo.description === "") {
            alert("Please enter a description for the automation");
            return;
          }

          setIsPopupOpen(false);
          setIsRecording(true);
        }}
      />
    )
  }

  return (
    <div onClick={() => setIsPopupOpen(false)} className="fixed  z-40 bg-gray-900 bg-opacity-40 w-full h-full flex items-center justify-center">
      <div onClick={e => e.stopPropagation()} className="bg-white shadow-lg shadow-gray-500 w-full max-w-[500px] p-5 pt-2 rounded-lg flex flex-col gap-5">
        <div className="relative w-full">
          <TbSearch className=" absolute left-0 top-0 bottom-0 mt-auto mb-auto text-2xl text-gray-400" />
          <input type="text" placeholder="Search Commands" className=" w-full border-0 border-b-2 border-gray-200 text-2xl p-3 pl-10 placeholder:text-gray-400" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="shortcuts" className=" uppercase text-sm text-gray-400 font-medium">Shortcuts</label>
          <button className=" text-purple-400 font-medium flex flex-row items-center gap-1" onClick={() => {
            setIsCreatingNew(true);
          }}>
            <TbPlus />
            Create new
          </button>
        </div>
        <div className="flex flex-col gap-2">
          
          {
            automations.length === 0 && (
              <div className=" bg-gray-100 p-5 rounded-md text-center text-gray-400">
                <div className=" text-lg ">No shortcuts yet</div>
                <div className=" text-sm mt-5">Create a new shortcut to get started.</div>
              </div>
            )
          }

          {
            (!isRecording && automations.length > 0) && (
              <>
                {
                  automations.map((automation, index) => {
                    return (
                      <div key={index} className="flex flex-row gap-2 items-center justify-between">
                        <button className=" font-medium text-lg text-left text-black p-5 pl-2 rounded-md hover:bg-[#EBEAF5] cursor-pointer flex flex-row justify-start gap-5 transition-all duration-150 ease-in-out items-center" onClick={() => {
                          startSimulation(automation.steps);
                          setIsPopupOpen(false);
                        }}>
                          <TbPencil size={30} />
                          <div>
                            <div>{automation.info.name}</div>
                            <div className=" text-sm text-gray-700">{automation.info.description}</div>
                          </div>
                        </button>
                        <button onClick={() => {
                          setAutomations(automations.filter((_, i) => i !== index));
                        }}>
                          <TbTrash size={30} className=" text-red-500" />
                        </button>
                      </div>
                    )
                  })
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}