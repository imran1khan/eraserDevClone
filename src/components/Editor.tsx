import { MutableRefObject, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { SaveData } from '../store/SaveData';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';
import { initializeEditor, getEditorInstance, destroyEditor } from './EditorConfig.ts';

interface Prop {
  whiteBoardRef: MutableRefObject<ExcalidrawElement[]>,
  appStateRef: MutableRefObject<AppState[] | undefined>,
}

function Editor({ whiteBoardRef, appStateRef }: Prop) {
  const saveData = useRecoilValue(SaveData);

  useEffect(() => {

      const editor = initializeEditor('editorjs');

      editor.isReady.then(() => {
        console.log('EditorJS is ready');
      });

      return () => {
        destroyEditor();
      };
  }, []);

  useEffect(() => {
    const saveDataInBackend = async () => {
      try {
        const editor = getEditorInstance();
        const fileData = await editor?.save();
        console.log(fileData);
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            excalidrawElements: JSON.stringify(whiteBoardRef.current),
            appState: JSON.stringify(appStateRef.current),
            fileData: JSON.stringify(fileData),
          }),
        });
        console.log(await response.json());
      } catch (error) {
        console.log(error);
      }
    };

    if (saveData) {
      saveDataInBackend();
    }
  }, [saveData, whiteBoardRef, appStateRef]);

  return (
    <div id='docDiv' className='h-full w-[50%]'>
      <div id='editorjs'></div>
    </div>
  );
}

export default Editor;
