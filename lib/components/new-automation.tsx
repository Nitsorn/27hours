import { TbChevronLeft } from "react-icons/tb"
import type { StackInfo } from "~lib/utils/use-record";

interface Props {
  setStackInfo: (value: StackInfo) => void;
  stackInfo: StackInfo;
  onStartRecording: () => void;
  onBack: () => void;
}

export const NewAutomation = (props: Props) => {
  const {
    setStackInfo,
    stackInfo,
    onStartRecording,
    onBack,
  } = props;
  
  return (
    <div className="fixed  z-40 bg-gray-900 bg-opacity-40 w-full h-full flex items-center justify-center">
      <div className="bg-white shadow-lg shadow-gray-500 w-full max-w-[500px] p-5 pt-2 rounded-lg flex flex-col gap-5">
        <div className="inline-block ">
          <button onClick={onBack} className=" hover:underline flex items-center justify-start text-sm   gap-0 font-medium py-2 text-gray-500">
            <TbChevronLeft /> Back
          </button>
        </div>

        <label htmlFor="shortcuts" className=" uppercase text-sm text-gray-400 font-medium">New Automation</label>
        <div className="flex flex-col gap-3">
          <label htmlFor="Name" className="text-xs font-semibold">Name</label>
          <input 
            type="text"
            placeholder="Eg. Create a new Jira issue"
            className=" w-full rounded-md border border-gray-200 text-sm p-3 placeholder:text-gray-400"
            value={stackInfo.name}
            onChange={e => {
              e.stopPropagation();
              setStackInfo({
                ...stackInfo,
                name: e.target.value,
              })
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="Name" className="text-xs font-semibold">Description</label>
          <input  
            type="text"
            placeholder="Eg. Creates a story issue, assigns a template for assignee and description."
            className=" w-full rounded-md border border-gray-200 text-sm p-3 placeholder:text-gray-400"
            value={stackInfo.description}
            onChange={e => setStackInfo({
              ...stackInfo,
              description: e.target.value,
            })} 
          />
        </div>
        <button onClick={onStartRecording} className="bg-purple-400 text-white rounded-md p-3">Start recording</button>
      </div>
    </div>
  )
}