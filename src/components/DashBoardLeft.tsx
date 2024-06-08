import { Archive, ChevronDown, Flag, Github, Lock } from "lucide-react"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { showCard } from "../store/SaveData"



export default function DashBoardLeft() {
  return (
    <div className="h-screen relative">
      <div className=" h-[10%] flex justify-center items-center">
        <SliderButton />
      </div>
      <div className="space-y-3">
        <div className="flex justify-center">
          <div className="bg-gray-700 text-center w-[90%] rounded-md p-3">All files</div>
        </div>
      </div>
      <div className="absolute bottom-0 h-[30%] w-full">
        <BottomSection/>
      </div>
    </div>
  )
}


const BottomSection = () => {
  const setShowCard=useSetRecoilState(showCard);
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="hover:bg-slate-600 p-1 cursor-pointer w-[90%] rounded-sm flex justify-center">
          <div className="w-[80%]  flex justify-between items-center">
            <Flag size={16} />
            <div className="text-center">gitting started</div>
          </div>
        </div>
        <div className="hover:bg-slate-600 p-1 cursor-pointer w-[90%] rounded-sm flex justify-center">
          <div className="w-[80%]  flex justify-between items-center">
            <Github size={16} />
            <div className="text-center">git synked</div>
          </div>
        </div>
        <div className="hover:bg-slate-600 p-1 cursor-pointer w-[90%] rounded-sm flex justify-center">
          <div className="w-[80%]  flex justify-between items-center">
            <Lock size={16} />
            <div className="text-center">gitting started</div>
          </div>
        </div>
        <div className="hover:bg-slate-600 p-1 cursor-pointer w-[90%] rounded-sm flex justify-center">
          <div className="w-[80%] flex justify-between items-center">
            <Archive size={16} />
            <div className="text-center">gitting started</div>
          </div>
        </div>
      </div>
      <button onClick={()=>setShowCard(true)} className="bg-blue-700 w-full p-2 rounded-sm mt-2">New File</button>
    </>
  )
}



const SliderButton = () => {
  const [hide, setHide] = useState(true);
  return (
    <div className="relative">
      <button onClick={() => setHide(p => !p)} onBlur={() => setHide(true)} className="flex justify-center p-3 rounded-md cursor-pointer gap-2 hover:bg-gray-900">
        <img src="/logo.svg" alt="" width={30} height={30} />
        <div className="font-bold">f1</div>
        <ChevronDown />
      </button>
      {/* new line starts */}
      <div className={`rounded-md bg-black bg-opacity-[95%] ${hide ? 'hidden' : 'absolute'} top-[40px] right-1 p-4  w-[10rem]`}>
        <div className="bg-cyan-700 rounded-md p-2">f1</div>
        <div className="border-y-2 border-gray-600 mt-1">
          <div className="hover:bg-gray-800 rounded-md p-2">create team</div>
          <div className="hover:bg-gray-800 rounded-md p-2">logout</div>
          <div className="hover:bg-gray-800 rounded-md p-2">settings</div>
        </div>
        <div className="hover:bg-gray-800 rounded-md p-2">
          profile
        </div>
      </div>
    </div>
  )
}