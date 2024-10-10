import { Card, Col, Row, Tabs } from 'antd';
import { useState } from 'react';
import { HomeContentForm } from './home.content.form';
import { SlBookOpen } from 'react-icons/sl';
import { FaImage } from 'react-icons/fa';
import { HomeImagesForm } from './home.images.form';
import { Gallery } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';
import { Content } from 'antd/es/layout/layout';

export const HomeScreen = () => {
    const [gallery, setGallery] = useState<Gallery[]>([]);

    const items = [
        {
            label: (
                <>
                    <SlBookOpen size={20} /> Conteúdo
                </>
            ),
            key: '1',
            children: (
                <HomeContentForm
                    gallery={gallery}
                    onClick={() => {
                        getGallery();
                    }}
                />
            )
        },
        {
            label: (
                <>
                    <FaImage size={20} /> Imagens
                </>
            ),
            key: '2',
            children: (
                <HomeImagesForm
                    gallery={gallery}
                    onClick={() => {
                        getGallery();
                    }}
                />
            )
        }
    ];

    return (
        <Content>
            <Row justify={'center'}>
                <Col span={20} className="mt-5">
                    <Card
                        bordered={false}
                        className="shadow-lg mb-5 bg-body-tertiary rounded"
                    >
                        <Row
                            justify={'center'}
                            className="text-center mt-5 mb-5"
                        >
                            <Col span={24}>
                                <h3>
                                    <strong>Conteúdo das Páginas</strong>
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Tabs defaultActiveKey="1" items={items} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );

    async function getGallery() {
        setGallery([]);
        const request = await ContentController.getGallery();

        const data: Gallery[] = request.data;

        if (data) {
            setGallery(data);
        }
    }
};
