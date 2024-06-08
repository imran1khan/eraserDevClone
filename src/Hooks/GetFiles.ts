import { useEffect, useState } from "react";
import { GetFiles } from "../store/SaveData";

export const useGetALLFiles = () => {
    const [files,setFiles]=useState<GetFiles[]>();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('/api/getFiles');
                const dataResponce = await response.json() as GetFiles[];
                setFiles(dataResponce)
            } catch (error) {
                // console.log(error)
            }
        }
        getData();
    }, [])
    return files;
}