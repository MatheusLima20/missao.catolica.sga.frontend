import React, { useState, useEffect } from 'react';
import { AboutScreen } from './about.screen';
import { ContentController } from '../../../../controller/content/content.controller';
import { ContentData } from '../../../../types/content/content';

export const About = () => {
    const [content, setContent] = useState<ContentData[]>([]);

    useEffect(() => {
        getAbout();
    }, []);

    return (
        <div>
            <AboutScreen data={content} />
        </div>
    );

    async function getAbout() {
        const request = await ContentController.getByPage('text', 'about');

        const data: ContentData[] = request.data;

        if (data) {
            setContent(data);
        }
    }
};
