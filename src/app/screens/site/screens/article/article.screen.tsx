import React from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Card } from 'react-bootstrap';
import { ContentData as Article } from '../../../../types/content/content';
import HTMLReactParser from 'html-react-parser';
import dayjs from 'dayjs';
require('dayjs/locale/pt-br');

interface Props {
    article: Article;
}

export const ArticleScreen = (props: Props) => {
    const article = props.article;

    const text = article ? (article.text as any) : '';

    return (
        <Content>
            <Row justify={'center'} className="mt-5">
                <Col md={22}>
                    <Card className="border-0 shadow-lg p-3 mb-5 bg-body rounded">
                        <Row justify={'center'}>
                            <Col span={20} className="mt-5 text-center">
                                <Row justify={'center'}>
                                    <Col className="text-start">
                                        <h2>
                                            <strong>{article?.title}</strong>
                                        </h2>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={20} className="mb-5 m-3 text-center">
                                <Row justify={'center'}>
                                    <Col className="text-start">
                                        <h5>{article?.subTitle}</h5>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={18} className="mb-5 m-3">
                                <Row justify={'start'}>
                                    <Col md={20} className="text-start">
                                        <h6>
                                            {formatDate(
                                                article?.createdAt as any
                                            )}
                                        </h6>
                                    </Col>
                                    <Col md={20} className="text-start">
                                        <h6>{article?.creatorName}</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                md={20}
                                className="mt-5"
                                style={{ lineHeight: 1.35 }}
                            >
                                {HTMLReactParser(text)}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );

    function formatDate(date: string) {
        const dateDayjs = dayjs(date).locale('pt-br').format('DD MMMM YYYY');

        const formatDate = dateDayjs.replaceAll(' ', '_');

        return formatDate;
    }
};
