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
                            <Col span={24}>
                                <h2>{article?.title}</h2>
                            </Col>
                            <Col span={24}>
                                <h2>{article?.subTitle}</h2>
                            </Col>
                            <Col span={24}>
                                <h2>{HTMLReactParser(text)}</h2>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};
