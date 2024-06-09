import { Excalidraw } from '@excalidraw/excalidraw'
import { useRef } from 'react'
import Header from './components/Header'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';

import Editor2 from './components/Editor2';

import { useParams } from 'react-router-dom';
import { useGetALLFiles } from './Hooks/GetFiles';




function App() {
  const file = useFile()
  const whiteBoardRef = useRef<ExcalidrawElement[]>([]);
  const appStateRef = useRef<AppState[]>();
  const initialMouseX = useRef(0);
  const initialDocDivWidth = useRef(0);
  const initialConvaDivWidth = useRef(0);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const scrolDiv = e.target as HTMLDivElement;
    const canvaDiv = scrolDiv.nextElementSibling as HTMLDivElement;
    const docDiv = scrolDiv.previousElementSibling as HTMLDivElement;
    if (!docDiv || !canvaDiv) return;

    initialMouseX.current = e.clientX;
    initialDocDivWidth.current = docDiv.offsetWidth;
    initialConvaDivWidth.current = canvaDiv.offsetWidth;
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - initialMouseX.current;
      const newDocDivWidth = initialDocDivWidth.current + deltaX;
      const newConvaDivWidth = initialConvaDivWidth.current - deltaX;

      docDiv.style.width = `${newDocDivWidth}px`;
      canvaDiv.style.width = `${newConvaDivWidth}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  return (
    <>
      <div className='bg-black text-white h-screen'>
        <Header />
        <div className='h-[95%] flex'>
          {
            file ? (
              <>              
              <Editor2 whiteBoardRef={whiteBoardRef} appStateRef={appStateRef} file={file} />
              <div id='scrol' onMouseDown={handleMouseDown}
                className={`w-[2px] bg-slate-700 cursor-e-resize`}></div>
              <div id='canvaDiv' className={`h-full w-[50%]`}>
                <Excalidraw theme='dark' initialData={{
                  appState: file && file.excalidrawElements.length > 0 && JSON.parse(file.appState),
                  elements: file && file.excalidrawElements.length > 0 && JSON.parse(file.excalidrawElements)
                }}
                  onChange={(excalidrawElements, appState) => {
                    if (
                      (JSON.stringify(excalidrawElements) !== JSON.stringify(whiteBoardRef.current))
                      &&
                      (JSON.stringify(appState) !== JSON.stringify(appStateRef.current))
                    ) {
                      appStateRef.current = [appState]
                      whiteBoardRef.current = [...excalidrawElements]
                    }
                  }} />
              </div>
              </>
            ):(
              <div className='flex justify-center items-center h-full w-full'><div className='text-center text-2xl'>loading....</div></div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App

const useFile = () => {
  const params = useParams<{ id: string }>();
  const fileData = useGetALLFiles();
  if (!fileData) {
    return undefined;
  }
  const singlefile = fileData.find(file => file.id === params.id)
  return singlefile;
}
