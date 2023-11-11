import React from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Card } from 'react-bootstrap';
import { ContentData as Article } from '../../../../types/content/content';
import HTMLReactParser from 'html-react-parser';
import ReactPlayer from 'react-player';
import { Helmet } from 'react-helmet';
import { baseURL } from '../../../../config/axios';
import { StringFomatter } from '../../../../util/string.formatter/string.fomatter';
require('dayjs/locale/pt-br');

interface Props {
    article: Article;
}

export const ContentScreen = (props: Props) => {
    const article = props.article;

    const text = article ? (article.text as any) : '';

    const video = article?.url;

    const type = article?.contentType;

    const title = article?.title;

    const subTitle = article?.subTitle;

    const url = article?.url;

    return (
        <Content>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={subTitle} />
                    <meta
                        property="og:url"
                        content={`${baseURL}/${title}/${article?.id}`}
                    />
                    <meta property="og:image" content={url} />
                </Helmet>
            </div>
            <Row justify={'center'} className="mt-5">
                <Col md={20}>
                    <Card
                        style={{ backgroundColor: '#efcfa6' }}
                        className="border-0 shadow-lg p-3 mb-5 rounded"
                    >
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
                            <Col md={20} className="m-3 text-center">
                                <Row justify={'center'}>
                                    <Col className="text-start">
                                        <h5>{article?.subTitle}</h5>
                                    </Col>
                                </Row>
                            </Col>
                            {type === 'video' && (
                                <Col md={24} className="m-3 text-center">
                                    <Row justify={'center'}>
                                        <Col md={20}>
                                            <ReactPlayer
                                                url={video}
                                                width={'100%'}
                                                height={400}
                                                controls={false}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                            <Col md={18} className="mb-5 m-3">
                                <Row justify={'start'}>
                                    <Col span={20} className="text-start">
                                        <h6>Por: {article?.creatorName}</h6>
                                    </Col>
                                    <Col span={20} className="text-start">
                                        <h6>
                                            {StringFomatter.formatDate(
                                                article?.createdAt as any
                                            )}
                                        </h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={20} style={{ lineHeight: 1.35 }}>
                                {HTMLReactParser(text)}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};
