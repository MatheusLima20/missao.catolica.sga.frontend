export type ContentData = {
    title?: string;
    subTitle?: string;
    video?: string;
    path?: string;
    file?: any;
    fileName?: string;
    url?: string;
    text?: string;
    page?: string;
    contentType: string;
    id?: number;
    createdAt?: string;
};

export type Gallery = {
    id: number;
    src: string;
    name: string;
    alt: string;
    tag: string;
};
