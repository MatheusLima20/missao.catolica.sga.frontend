import { Card, Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { HomeForm } from './home.form';

export const HomeScreen = () => {
    return (
        <Content>
            <Row>
                <Col span={24} className="mt-5">
                    <Card
                        bordered={false}
                        className="shadow-lg p-3 mb-5 bg-body-tertiary rounded m-4"
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
                                <HomeForm />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};
