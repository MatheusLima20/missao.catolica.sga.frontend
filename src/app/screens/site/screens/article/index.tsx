import React, { useState, useEffect } from 'react';
import { ArticleScreen } from './article.screen';
import { useParams } from 'react-router-dom';
import { ContentController } from '../../../../controller/content/content.controller';
import { Content } from '../../../../types/content/content';
import './article.style.css';

export const Article = () => {
    const { id }: any = useParams<any>();
    const [article, setArticle] = useState<any>();

    useEffect(() => {
        const getArticle = async () => {
            const idNumber = Number.parseInt(id);

            const request = await ContentController.getByArticle(idNumber);

            const data: Content = request.data;

            if (data) {
                setArticle(data);
            }
        };

        getArticle();
    }, [id]);

    return <ArticleScreen article={article} />;
};
