import React from 'react';
import { Carousel } from 'react-bootstrap';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import './home.css';
import { Content as ContentLayout } from 'antd/es/layout/layout';
import { Button, Card, Col, Row } from 'antd';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { CarouselType } from '../../../../types/carousel.types';
import { Content } from '../../../../types/content/content';

interface Props {
    sliders: Content[];
    articles: Content[];
}

export const HomeScreen = (props: Props) => {
    const articles = props.articles;
    const sliders = props.sliders;

    const gridStyle: React.CSSProperties = {
        textAlign: 'center'
    };

    return (
        <ContentLayout className="mt-5">
            <Row justify={'center'} className="border-0">
                <Col span={18}>
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
                            className="mb-5"
                            align={'middle'}
                            justify={'center'}
                            gutter={[20, 20]}
                        >
                            {initArticles().map((article, index) => {
                                const id = article.id;
                                const title = article.title;
                                const subTitle = article.subTitle;
                                return (
                                    <Col key={index} md={12} className="mb-5">
                                        <Button
                                            type="link"
                                            href={`/articles/${title}/${id}`}
                                        >
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
                                                    <Col md={10}>
                                                        {article.jsx}
                                                    </Col>
                                                    <Col md={12}>
                                                        <Row
                                                            className="text-start"
                                                            justify={'start'}
                                                        >
                                                            <Col>
                                                                <h4>
                                                                    <strong>
                                                                        {title}
                                                                    </strong>
                                                                </h4>
                                                                <h6>
                                                                    {subTitle}
                                                                </h6>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Button>
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
                        <Card hoverable={true} className="mt-5 rounde-3 m-4">
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
};
