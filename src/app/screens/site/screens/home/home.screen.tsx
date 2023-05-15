import React from 'react';
import { Carousel } from 'react-bootstrap';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import './home.css';
import { Content } from 'antd/es/layout/layout';
import { Card, Col, Row } from 'antd';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { CarouselType } from '../../../../types/carousel.types';
import { Images } from '../../../../config/images';

const slides: CarouselType[] = [
    {
        alt: 'Programação semanal',
        jsx: <img src={Images.monday} width="100%" className="rounded-4" />,
        title: '',
        subTitle: ''
    },
    {
        alt: 'Programação semanal',
        jsx: <img src={Images.tuesday} width="100%" className="rounded-4" />,
        title: '',
        subTitle: ''
    }
];

const articles = [
    {
        date: '2023-05-03',
        jsx: <img src={Images.monday} width="100%" className="rounded-3" />,
        title: 'Santa Catarina',
        subTitle: 'Acompanhe-nos no youtube.'
    },
    {
        date: '2023-05-03',
        jsx: <img src={Images.tuesday} width="100%" className="rounded-3" />,
        title: 'São Eliseu',
        subTitle: 'Acompanhe-nos no youtube.'
    },
    {
        date: '2023-05-03',
        jsx: <img src={Images.monday} width="100%" className="rounded-3" />,
        title: 'Santa Catarina',
        subTitle: 'Acompanhe-nos no youtube.'
    },
    {
        date: '2023-05-03',
        jsx: <img src={Images.tuesday} width="100%" className="rounded-3" />,
        title: 'São Eliseu',
        subTitle: 'Acompanhe-nos no youtube.'
    },
    {
        date: '2023-05-03',
        jsx: <img src={Images.monday} width="100%" className="rounded-3" />,
        title: 'Santa Catarina',
        subTitle: 'Acompanhe-nos no youtube.'
    },
    {
        date: '2023-05-03',
        jsx: <img src={Images.tuesday} width="100%" className="rounded-3" />,
        title: 'São Eliseu',
        subTitle: 'Acompanhe-nos no youtube.'
    },
    {
        date: '2023-05-03',
        jsx: <img src={Images.tuesday} width="100%" className="rounded-3" />,
        title: 'São Eliseu',
        subTitle: 'Acompanhe-nos no youtube.'
    },
    {
        date: '2023-05-03',
        jsx: <img src={Images.tuesday} width="100%" className="rounded-3" />,
        title: 'São Eliseu',
        subTitle: 'Acompanhe-nos no youtube.'
    }
];

export const HomeScreen = () => {
    const gridStyle: React.CSSProperties = {
        textAlign: 'center'
    };

    return (
        <Content className="mt-5">
            <Row justify={'center'} className="border-0">
                <Col span={18}>
                    <Carousel pause={'hover'} fade>
                        {slides.map((values, index) => {
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
                <Col span={24}>
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
                        <Row
                            align={'middle'}
                            justify={'center'}
                            gutter={[20, 20]}
                        >
                            {articles.map((article, index) => {
                                return (
                                    <Col key={index} md={12}>
                                        <Card
                                            bordered={false}
                                            hoverable={true}
                                            className="w-100"
                                            style={{
                                                ...gridStyle,
                                                height: 200
                                            }}
                                        >
                                            <Row
                                                align={'middle'}
                                                justify={'center'}
                                                gutter={[20, 20]}
                                            >
                                                <Col md={10}>{article.jsx}</Col>
                                                <Col md={12}>
                                                    <Row
                                                        className="text-start"
                                                        justify={'start'}
                                                    >
                                                        <Col>
                                                            <h4>
                                                                <strong>
                                                                    {
                                                                        article.title
                                                                    }
                                                                </strong>
                                                            </h4>
                                                            <h6>
                                                                {
                                                                    article.subTitle
                                                                }
                                                            </h6>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Card>

                    <AnimationOnScroll
                        initiallyVisible={false}
                        animatePreScroll={false}
                        animateIn="animate__fadeIn"
                        animateOut="animate__fadeOut"
                    >
                        <Card hoverable={true} className="mt-5 rounde-3">
                            <Row justify={'space-between'} className="m-2">
                                <Col md={18}>
                                    <h2>
                                        <strong>
                                            Tudo o que você precisa.
                                        </strong>
                                    </h2>

                                    <h5>
                                        Nossa formação faz você conhecer a fé
                                        como ela é.
                                    </h5>
                                </Col>
                                <Col md={7}>
                                    <Row justify={'center'}>
                                        <Col span={24}>
                                            <MdOutlineConnectWithoutContact
                                                size={200}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </AnimationOnScroll>
                </Col>
            </Row>
        </Content>
    );
};
