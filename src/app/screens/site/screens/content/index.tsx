import React, { useState, useEffect } from 'react';
import { ContentScreen } from './content.screen';
import { useParams } from 'react-router-dom';
import { ContentController } from '../../../../controller/content/content.controller';
import { ContentData } from '../../../../types/content/content';
import './content.style.css';

export const Content = () => {
    const { id }: any = useParams<any>();
    const [article, setArticle] = useState<any>();

    useEffect(() => {
        const getArticle = async () => {
            const idNumber = Number.parseInt(id);

            const request = await ContentController.getByArticle(idNumber);

            const data: ContentData = request.data;

            if (data) {
                setArticle(data);
            }
        };

        const storeView = async () => {
            const idNumber = Number.parseInt(id);

            await ContentController.patchViewsAmount(idNumber);
        };

        storeView();

        getArticle();
    }, [id]);

    return <ContentScreen article={article} />;
};
