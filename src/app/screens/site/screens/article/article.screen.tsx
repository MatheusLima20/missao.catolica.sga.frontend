import React from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Card } from 'react-bootstrap';
import { Content as Article } from '../../../../types/content/content';
import HTMLReactParser from 'html-react-parser';

interface Props {
    article: Article;
}

export const ArticleScreen = (props: Props) => {
    const article = props.article;

    const text = article ? (article.text as any) : '';

    return (
        <Content>
            <Row className="m-2 mt-5">
                <Col span={24}>
                    <Card className="border-0 shadow-lg p-3 mb-5 bg-body rounded">
                        <Row>
                            <Col span={22} className="mt-5">
                                <h2>{article?.title}</h2>
                            </Col>
                            <Col span={22} className="mb-5 m-3">
                                <h5>{article?.subTitle}</h5>
                            </Col>
                            <Col
                                span={24}
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
};
