import { ImageDocument } from "./ImageDocument.ts";

export interface Project {
    _id: string;
    name: string;
    description: string;
    details: string;
    date: Date;
    localization: string;
    images: [ImageDocument];
}