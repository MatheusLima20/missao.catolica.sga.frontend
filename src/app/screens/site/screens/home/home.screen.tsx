import React from 'react';
import { Carousel } from 'react-bootstrap';
import './home.css';
import { Content as ContentLayout } from 'antd/es/layout/layout';
import { Card, Col, Row } from 'antd';
import { CarouselType } from '../../../../types/carousel.types';
import { ContentData } from '../../../../types/content/content';
import ReactPlayer from 'react-player';
import { HomeArticlesScreen } from './home.articles.screen';
import { HomeHomilyScreen } from './home.homily.screen';

interface Props {
    sliders: ContentData[];
    articles: ContentData[];
    videos: ContentData[];
}

export const HomeScreen = (props: Props) => {
    const articles = props.articles;
    const sliders = props.sliders;
    const videos = props.videos;

    return (
        <ContentLayout className="mt-5">
            <Row justify={'center'} className="border-0 ">
                <Col span={20}>
                    <Carousel pause={'hover'} fade>
                        {initSliders().map((values, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <Row justify={'center'}>
                                        <Col className="text-center" span={24}>
                                            {values.jsx}
                                        </Col>
                                    </Row>

                                    {values.title.length !== 0 && (
                                        <Carousel.Caption className="cousel-caption">
                                            <div>
                                                <h4>
                                                    <strong>
                                                        {values.title}
                                                    </strong>
                                                </h4>
                                                <p>
                                                    <strong>
                                                        {values.subTitle}
                                                    </strong>
                                                </p>
                                            </div>
                                        </Carousel.Caption>
                                    )}
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </Col>
            </Row>

            <Row justify={'center'}>
                <Col span={20}>
                    <Card
                        className="border-0 mb-5 mt-5"
                        hoverable={false}
                        title={
                            <Row className="mt-5 text-center">
                                <Col md={24}>
                                    <h2>
                                        <strong>Artigos</strong>
                                    </h2>
                                </Col>
                            </Row>
                        }
                    >
                        <HomeArticlesScreen articles={initArticles()} />
                    </Card>

                    <Card
                        className="border-0 mb-5 mt-5"
                        hoverable={false}
                        title={
                            <Row className="mt-5 text-center">
                                <Col md={24}>
                                    <h2>
                                        <strong>Homilias</strong>
                                    </h2>
                                </Col>
                            </Row>
                        }
                    >
                        <Row
                            className="mb-5"
                            align={'middle'}
                            justify={'center'}
                            gutter={[20, 20]}
                        >
                            <HomeHomilyScreen videos={initVideos()} />
                        </Row>
                    </Card>
                </Col>
            </Row>
        </ContentLayout>
    );

    function initSliders() {
        const values: CarouselType[] = [];

        sliders.map((value) => {
            const alt = value.fileName ? value.fileName : '';
            const title = value.title ? value.title : '';
            const subTitle = value.subTitle ? value.subTitle : '';
            return values.push({
                alt: alt,
                jsx: <img src={value.url} width="100%" className="rounded-4" />,
                title: title,
                subTitle: subTitle
            });
        });
        return values;
    }

    function initArticles() {
        const values: any[] = [];

        articles.map((value) => {
            const title = value.title ? value.title : '';
            const subTitle = value.subTitle ? value.subTitle : '';
            return values.push({
                id: value.id,
                jsx: <img src={value.url} width="100%" className="rounded-3" />,
                title: title,
                subTitle: subTitle
            });
        });
        return values;
    }

    function initVideos() {
        const values: any[] = [];

        videos.map((value) => {
            const title = value.title ? value.title : '';
            const subTitle = value.subTitle ? value.subTitle : '';
            const url = value.url;
            return values.push({
                id: value.id,
                jsx: <ReactPlayer url={url} width={'100%'} controls={false} />,
                title: title,
                subTitle: subTitle
            });
        });
        return values;
    }
};
