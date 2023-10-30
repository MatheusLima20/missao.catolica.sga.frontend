export type ContentData = {
    title?: string;
    subTitle?: string;
    path?: string;
    file?: any;
    fileName?: string;
    url?: string;
    text?: string;
    page?: string;
    visible: boolean;
    contentType: string;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    creatorName?: string;
};

export type Gallery = {
    id: number;
    src: string;
    name: string;
    alt: string;
    tag: string;
};
