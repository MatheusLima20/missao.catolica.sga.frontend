import { Card, Col, Row, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { HomeContentForm } from './home.content.form';
import { SlBookOpen } from 'react-icons/sl';
import { FaImage } from 'react-icons/fa';
import { HomeImagesForm } from './home.images.form';

export const HomeScreen = () => {
    const items = [
        {
            label: (
                <>
                    <SlBookOpen size={20} /> Conteúdo
                </>
            ),
            key: '1',
            children: <HomeContentForm />
        },
        {
            label: (
                <>
                    <FaImage size={20} /> Imagens
                </>
            ),
            key: '2',
            children: <HomeImagesForm />
        }
    ];

    return (
        <Content>
            <Row>
                <Col span={24} className="mt-5">
                    <Card
                        bordered={false}
                        className="shadow-lg mb-5 bg-body-tertiary rounded m-4"
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
                                <Tabs defaultActiveKey="2" items={items} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};
