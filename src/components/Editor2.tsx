import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types"
import { AppState } from "@excalidraw/excalidraw/types/types"
import { MutableRefObject, useEffect, useState } from "react"
import {  GetFiles, SaveData } from "../store/SaveData";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";

interface Prop {
  file?: GetFiles,
  whiteBoardRef: MutableRefObject<ExcalidrawElement[]>,
  appStateRef: MutableRefObject<AppState[] | undefined>,
}
function Editor2({ whiteBoardRef, appStateRef, file }: Prop) {
  const [saveData,setSaveData] = useRecoilState(SaveData);
  const [isEditing, setIsEditing] = useState(false);
  const [heading, setHeading] = useState('Document Name');
  const [inputValue, setInputValue] = useState('');
  const [textarea, setTextarea] = useState('');
  useEffect(() => {
    setHeading(file?.filename!)
    setTextarea(file?.fileContent!);
  }, []);

  useEffect(() => {
    const saveDataInBackend = async () => {
      const tostId=toast.loading('Waiting...');
      try {
        const response = await fetch(`https://eraser_clone.mustafaimrankhan9.workers.dev/file/${file?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            excalidrawElements: JSON.stringify(whiteBoardRef.current),
            appState: JSON.stringify(appStateRef.current),
            filename:heading,
            fileContent:textarea, 
          }),
        });
        console.log(await response.json());
      } catch (error) {
        console.log(error);
      }
      toast.remove(tostId);
      toast.success('file save successfully');
    };
    if (saveData) {  
      saveDataInBackend();
      setSaveData(false);
    }
  }, [saveData]);

  const handleHeadingClick = () => {
    setIsEditing(true);
    setInputValue(heading);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    setHeading(inputValue);
  };

  return (
    <div id='docDiv' className={`h-full w-[50%]`}>
      <div className="h-full w-full p-4">
        {isEditing ? (
          <input
            className="bg-black text-white"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
          />
        ) : (
          <h1 className="font-bold text-xl" onClick={handleHeadingClick}>
            {heading === '' ? 'Document Name' : heading}
          </h1>
        )}
        <br />
        <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} className="bg-gray-700 text-white w-full p-4 rounded-md" name="" id=""></textarea>
      </div>
    </div>
  );
}

export default Editor2
