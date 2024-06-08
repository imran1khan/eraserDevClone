import { useRecoilState } from "recoil";
import { SaveData } from "../store/SaveData";
import { Github, Link2, Save } from "lucide-react";

interface prop {
    file?: {
        fileName: string,
    },
    children?: React.ReactNode,
    onClick?:()=>void,
}
function Header({ file}: prop) {
    const [saveFile,setSaveData] = useRecoilState(SaveData);
    const Tabs = [
        {
            name: "Document",
            fun:()=>{
                const docDiv=document.querySelector(`#docDiv`) as HTMLDivElement;
                const canvaDiv=document.querySelector(`#canvaDiv`) as HTMLDivElement;
                docDiv.style.width=`100%`
                canvaDiv.style.width=`0%`
            }
        },
        {
            name: "Both",
            fun:()=>{
                const docDiv=document.querySelector(`#docDiv`) as HTMLDivElement;
                const canvaDiv=document.querySelector(`#canvaDiv`) as HTMLDivElement;
                if (docDiv.offsetWidth!==canvaDiv.offsetWidth) {
                    docDiv.style.width=`50%`
                    canvaDiv.style.width=`50%`
                }
            }
        },
        {
            name: "Canvas",
            fun:()=>{
                const docDiv=document.querySelector(`#docDiv`) as HTMLDivElement;
                const canvaDiv=document.querySelector(`#canvaDiv`) as HTMLDivElement;
                docDiv.style.width=`0%`
                canvaDiv.style.width=`100%`
            }
        },
    ];
    return (
        <div className="border-b h-12 border-neutral-800 flex items-center justify-between px-4">
            <div className="flex space-x-2 items-center justify-start">
                <div className="flex space-x-2 items-center  ">
                    <img  src="/logo.svg" alt="logo" className="w-8 h-8 rounded-md" />
                    <div>
                        <h1 className="text-sm font-medium">
                            {file ? file.fileName : "Untitled"}
                        </h1>
                    </div>
                </div>
            </div>
            <div>
                <div className="border border-neutral-600 rounded">
                    <div className="flex w-full items-center">
                        {
                            Tabs.map((tab,i) => (
                                <div key={i.toString()+tab.name} onClick={tab.fun} className='cursor-pointer w-24 text-sm text-center hover:bg-neutral-700 px-2 py-1'>
                                    <h1 className="text-sm font-medium">{tab.name}</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-5">
                <div className="rounded-sm flex text-sm items-center bg-blue-700 hover:bg-blue-800 hover:text-white cursor-pointer px-2 py-1">
                    github
                <Github size={18} className="ml-1" />
                </div>
                <button
                disabled={saveFile===true?true:false}
                className="rounded-sm flex text-sm items-center bg-blue-700
                 hover:bg-blue-800 hover:text-white cursor-pointer px-2 py-1" 
                onClick={()=>setSaveData(true)}>
                    save
                    <Save size={18} className="ml-1"/>
                </button>
                <div className="rounded-sm flex text-sm items-center bg-blue-700 hover:bg-blue-800 hover:text-white cursor-pointer px-2 py-1">
                    share
                    <Link2 size={18} className="ml-2"/>
                </div>
            </div>
        </div>
    )
}

export default Header