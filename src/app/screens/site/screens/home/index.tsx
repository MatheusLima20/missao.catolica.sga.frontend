import React, { useState, useEffect } from 'react';
import { HomeScreen } from './home.screen';
import { Content } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';

export const Home = () => {
    const [sliders, setSliders] = useState<Content[]>([]);

    useEffect(() => {
        getSliders();
    }, []);

    return <HomeScreen sliders={sliders} />;

    async function getSliders() {
        const request = await ContentController.getByPage('home');

        const data: Content[] = request.data;

        if (data) {
            setSliders(data);
        }
    }
};
