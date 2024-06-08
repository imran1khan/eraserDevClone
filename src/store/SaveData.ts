import { atom } from "recoil";

export const SaveData = atom({
    key: 'SaveData',
    default: false,
});

export const showCard=atom({
    key:'showCard',
    default:false
});

interface DataItem {
    location: string;
    authorPic: string | undefined | null;
}
export interface GetFiles {
    id: string;
    filename: string;
    fileContent: string;
    archive: boolean;
    authorId: string;
    excalidrawElements: string;
    appState: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface DataArrayInterface extends DataItem, GetFiles {}
// Create the Recoil atom with the correct type
export const dataArray = atom<DataArrayInterface[]>({
    key: 'dataArray',
    default: [],
});
