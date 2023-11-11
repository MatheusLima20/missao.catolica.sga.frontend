import React from 'react';
import { Carousel } from 'react-bootstrap';
import './home.css';
import { Content as ContentLayout } from 'antd/es/layout/layout';
import { Button, Card, Col, Row } from 'antd';
import { CarouselType } from '../../../../types/carousel.types';
import { ContentData } from '../../../../types/content/content';
import ReactPlayer from 'react-player';
import { HomeArticlesScreen } from './home.articles.screen';
import { HomeHomilyScreen } from './home.homily.screen';
import { verifyUrl } from '../../../../util/verify.url/verify.url';
import { BiSearch } from 'react-icons/bi';

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
                <Col md={20}>
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
                <Col md={20}>
                    <Card
                        className="border-0 mb-5 mt-5"
                        hoverable={false}
                        title={
                            <Row
                                justify={'space-between'}
                                className="mt-5 text-center"
                            >
                                <Col md={20}>
                                    <h2>
                                        <strong>Artigos</strong>
                                    </h2>
                                </Col>
                                <Col md={4}>
                                    <Button
                                        href="/search"
                                        icon={<BiSearch size={20} />}
                                    >
                                        <strong>Pesquisar</strong>
                                    </Button>
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
                        <HomeHomilyScreen videos={initVideos()} />
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
            const jsx = verifyUrl.isYoutubeVideo(value.url) ? (
                <ReactPlayer
                    url={value.url}
                    width={'100%'}
                    height={645}
                    controls={true}
                />
            ) : (
                <img src={value.url} width="100%" className="rounded-4" />
            );
            return values.push({
                alt: alt,
                jsx: jsx,
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
                jsx: <img alt={value.contentType} src={value.url} />,
                title: title,
                subTitle: subTitle,
                tag: value.tag,
                createdAt: value.createdAt
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
                jsx: <ReactPlayer url={url} width={'100%'} />,
                title: title,
                subTitle: subTitle,
                tag: value.tag,
                createdAt: value.createdAt
            });
        });
        return values;
    }
};
