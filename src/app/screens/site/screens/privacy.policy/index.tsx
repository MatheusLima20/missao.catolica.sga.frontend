import React, { useState, useEffect } from 'react';
import { PrivacyPolicyScreen } from './privacy.policy.screen';
import { ContentController } from '../../../../controller/content/content.controller';
import { ContentData } from '../../../../types/content/content';

export const PrivacyPolicy = () => {
    const [content, setContent] = useState<ContentData[]>([]);

    useEffect(() => {
        getPrivacyPolicy();
    }, []);

    return <PrivacyPolicyScreen data={content} />;

    async function getPrivacyPolicy() {
        const request = await ContentController.getByPage(
            'text',
            'privacy-policy'
        );

        const data: ContentData[] = request.data;

        if (data) {
            setContent(data);
        }
    }
};
