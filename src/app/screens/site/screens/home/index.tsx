import React, { useState, useEffect } from 'react';
import { HomeScreen } from './home.screen';
import { Content } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';

export const Home = () => {
    const [sliders, setSliders] = useState<Content[]>([]);
    const [articles, setArticles] = useState<Content[]>([]);

    useEffect(() => {
        getSliders();
        getArticles();
    }, []);

    return <HomeScreen sliders={sliders} articles={articles} />;

    async function getSliders() {
        const request = await ContentController.getByPage('slider', 'home');

        const data: Content[] = request.data;

        if (data) {
            setSliders(data);
        }
    }
    async function getArticles() {
        const request = await ContentController.getByPage('article', 'article');

        const data: Content[] = request.data;

        if (data) {
            setArticles(data);
        }
    }
};
