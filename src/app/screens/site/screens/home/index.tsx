import React, { useState, useEffect } from 'react';
import { HomeScreen } from './home.screen';
import { ContentData } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';

export const Home = () => {
    const [sliders, setSliders] = useState<ContentData[]>([]);
    const [articles, setArticles] = useState<ContentData[]>([]);
    const [videos, setVideos] = useState<ContentData[]>([]);

    useEffect(() => {
        getSliders();
        getArticles();
        getVideos();
    }, []);

    return <HomeScreen sliders={sliders} articles={articles} videos={videos} />;

    async function getSliders() {
        const request = await ContentController.getByPage('slider', 'home');

        const data: ContentData[] = request.data;

        if (data) {
            setSliders(data);
        }
    }
    async function getArticles() {
        const request = await ContentController.getByPage('article', 'article');

        const data: ContentData[] = request.data;

        if (data) {
            setArticles(data);
        }
    }
    async function getVideos() {
        const request = await ContentController.getByPage('video', 'video');

        const data: ContentData[] = request.data;

        if (data) {
            setVideos(data);
        }
    }
};
