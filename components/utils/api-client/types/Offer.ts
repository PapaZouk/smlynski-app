import { Buffer } from 'npm:buffer';

export interface Offer {
    _id: string;
    title: string;
    description: string;
    details: string;
    image: {
        data: Buffer;
        fileName: string;
        contentType: string;
    }
}