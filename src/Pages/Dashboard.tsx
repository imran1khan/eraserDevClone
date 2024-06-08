import { X } from "lucide-react"
import ProtectedRoute from "../Auth/ProtectedRoute"
import DashBoardLeft from "../components/DashBoardLeft"
import DashBoardRight from "../components/DashBoardRight"
import DashBoardTable from "../components/DashBoardTable"


import { useRecoilState, useSetRecoilState } from "recoil"
import { dataArray, DataArrayInterface, GetFiles, showCard } from "../store/SaveData"
import { useState } from "react"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"
import { useGetALLFiles } from "../Hooks/GetFiles"



export default function Dashboard() {
    const { user } = useKindeAuth()
    const setData = useSetRecoilState(dataArray)
    const newData = useGetALLFiles();
    if (newData) {
        const fileData = newData.map((v): DataArrayInterface => {
            return {
                ...v,
                authorPic: user?.picture,
                location: 'undefined'
            }
        })
        setData([...fileData])
    }

    return (
        <div className="bg-black h-screen text-white flex relative">
            <InputCard />
            <div className="bg-gray-800 flex-grow">
                <DashBoardLeft />
            </div>
            <div className="bg-slate-800 flex-grow-[6] border-l-[2px] border-l-gray-900">
                <DashBoardRight />
                {newData ? (<DashBoardTable />) : (<div className="">loading....</div>)}
            </div>
        </div>
    )
}

interface Response {
    res: GetFiles;
    message: string;
}

function InputCard() {
    const { user } = useKindeAuth()
    const [show_crd, setshowCard] = useRecoilState(showCard);
    const [filename, setFileName] = useState('');
    const [data, setData] = useRecoilState(dataArray)
    const saveFile = async () => {
        if (!filename || filename === '') {
            return;
        }
        try {
            const response = await fetch('/api/makeFile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filename: filename,
                    userid: user?.id || '',
                })
            });
            const { res } = await response.json() as Response;
            setData([...data, {
                ...res,
                location: 'undefined',
                authorPic: user?.picture,
            }])
        } catch (error) {
            console.log(error)
        }
        setFileName('');
        setshowCard(false)
    }
    return (
        <div className={`z-[1] ${show_crd ? 'absolute' : 'hidden'} bg-[#010112]/50 backdrop-blur-md h-screen w-full rounded-md flex justify-center items-center`}>
            <div id="card" className="bg-[#0d0d1a] opacity-100 h-[15rem] w-[30rem] rounded-md p-3 space-y-3">
                <div className="flex justify-between">
                    <div className="text-lg">Create New File</div>
                    <X size={16} className="cursor-pointer" onClick={() => setshowCard(false)} />
                </div>
                <div className="opacity-20">create a new file to start woking with your team</div>
                <hr />
                <div className="space-y-2 mt-1">
                    <div>File Name</div>
                    <input value={filename} onChange={(e) => setFileName(e.target.value)} placeholder="enter file name" className="rounded-md bg-slate-300 text-black h-[2rem] w-full" type="text" />
                </div>
                <button onClick={saveFile} className="bg-blue-900 w-full text-center rounded-md p-2">Create</button>
            </div>
        </div>
    );
}