import EditorJs from '@editorjs/editorjs';
//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import CheckList from "@editorjs/checklist";

let editorInstance: EditorJs | null = null;

export const initializeEditor = (holder: string): EditorJs => {
  if (!editorInstance) {
    editorInstance = new EditorJs({
      holder,
      placeholder: "Let's write an awesome story!",
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+H',
        },
        list: List,
        checklist: CheckList,
      },
    });
  }
  return editorInstance;
};

export const getEditorInstance = (): EditorJs | null => editorInstance;

export const destroyEditor = (): void => {
  if (editorInstance) {
    //@ts-ignore
    editorInstance.clear();
    editorInstance = null;
  }
};