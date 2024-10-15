import { useState, useEffect } from 'react';
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
        getHomily();
    }, []);

    return <HomeScreen sliders={sliders} articles={articles} videos={videos} />;

    async function getSliders() {
        const request = await ContentController.getByTagAndType(
            'slider',
            'caution'
        );

        const request2 = await ContentController.getByMoreViews();

        let data: ContentData[] = request.data;

        data = data.concat(request2.data);

        if (data) {
            setSliders(data);
        }
    }
    async function getArticles() {
        const request = await ContentController.getByType('article');

        const data: ContentData[] = request.data;

        if (data) {
            setArticles(data);
        }
    }
    async function getHomily() {
        const request = await ContentController.getByTagAndType(
            'video',
            'homily'
        );

        const data: ContentData[] = request.data;

        if (data) {
            setVideos(data);
        }
    }
};
