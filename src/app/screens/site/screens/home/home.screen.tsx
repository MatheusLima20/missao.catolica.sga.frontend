import React from "react";
import { Carousel } from "react-bootstrap";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "./home.css";
import { Content } from "antd/es/layout/layout";
import { Card, Col, Row, theme } from "antd";
import { FaGamepad } from "react-icons/fa";
import { MdOutlineConnectWithoutContact, MdOutlineLiveTv, MdTouchApp } from "react-icons/md";
import { GiLifeInTheBalance, GiWireframeGlobe } from "react-icons/gi";
import { CarouselType } from "../../../../types/carousel.types";
import { Images } from "../../../../config/images";
import { IoIosPeople } from "react-icons/io";

const slides: CarouselType[] = [
    {
        alt: "Programação semanal",
        jsx: (
            <img src={Images.friday} width="100%" />
        ),
        title: "Programação",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        alt: "Programação semanal",
        jsx: (
            <img src={Images.monday} width="100%" />
        ),
        title: "Programação",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        alt: "Programação semanal",
        jsx: (
            <img src={Images.tuesday} width="100%" />
        ),
        title: "Programação",
        subTitle: "Acompanhe-nos no youtube."
    },
];

const articles = [
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.friday} width="100%" height="100%" />
        ),
        title: "São afonso",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.monday} width="100%" />
        ),
        title: "Santa Catarina",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.tuesday} width="100%" />
        ),
        title: "São Eliseu",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.monday} width="100%" />
        ),
        title: "Santa Catarina",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.tuesday} width="100%" />
        ),
        title: "São Eliseu",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.monday} width="100%" />
        ),
        title: "Santa Catarina",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.tuesday} width="100%" />
        ),
        title: "São Eliseu",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.tuesday} width="100%" />
        ),
        title: "São Eliseu",
        subTitle: "Acompanhe-nos no youtube."
    },
    {
        date: '2023-05-03',
        jsx: (
            <img src={Images.tuesday} width="100%" />
        ),
        title: "São Eliseu",
        subTitle: "Acompanhe-nos no youtube."
    },
];

export const HomeScreen = () => {

    const {
        token: { colorText, colorBgBase, colorTextSecondary, colorBgLayout },
    } = theme.useToken();

    const gridStyle: React.CSSProperties = {
        textAlign: 'center',
        background: colorBgLayout
    };

    return (
        <Content style={{ background: colorBgBase }}>

            <Row justify={'center'} className="border-0">
                <Col span={18}>
                    <Carousel pause={"hover"} fade>
                        {slides.map((values, index) => {
                            return (
                                <Carousel.Item key={index}>

                                    <Row justify={"center"}>
                                        <Col className="text-center" span={24}>
                                            {values.jsx}
                                        </Col>
                                    </Row>

                                    {(values.title.length !== 0) && (
                                        <Carousel.Caption
                                            className="cousel-caption"
                                        >
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
                            )
                        })}
                    </Carousel>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col span={24}>

                    <Card bordered={false}>

                        <Card style={{ background: colorBgLayout, color: colorTextSecondary }}
                            className="border-0 mb-5 mt-5" hoverable={false} title={(
                                <Row style={{ color: colorText }} className="mt-5 text-center">
                                    <Col md={24}>
                                        <h2>
                                            <strong style={{ color: colorTextSecondary }}>
                                                Artigos
                                            </strong>
                                        </h2>
                                    </Col>
                                </Row>
                            )}>
                            <Row align={"middle"} justify={"center"} gutter={[20, 20]}>
                                {articles.map((article, index) => {
                                    return (
                                        <Col key={index} md={12}>
                                            <Card
                                                hoverable={true}
                                                className="w-100"
                                                style={{ ...gridStyle, height: 200 }}
                                            >
                                                <Row align={"middle"} justify={"center"} gutter={[20, 20]}>
                                                    <Col md={10} style={{ color: colorTextSecondary }}>
                                                        {article.jsx}
                                                    </Col>
                                                    <Col md={12}>
                                                        <Row className="text-start" justify={"start"}>
                                                            <Col>
                                                                <h4>
                                                                    <strong style={{ color: colorTextSecondary }}>
                                                                        {article.title}
                                                                    </strong>
                                                                </h4>
                                                                <h6 style={{ color: colorTextSecondary }}>
                                                                    {article.subTitle}
                                                                </h6>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>

                        </Card>

                        <AnimationOnScroll
                            initiallyVisible={false}
                            animatePreScroll={false}
                            animateIn="animate__fadeIn"
                            animateOut="animate__fadeOut"
                        >

                            <Card
                                style={{ background: colorBgLayout, color: colorTextSecondary }}
                                hoverable={true}
                                className="mt-5 rounde-3"
                            >
                                <Row
                                    justify={"space-between"}
                                    className="text-white m-2"
                                >
                                    <Col md={18}>

                                        <h2 style={{ color: colorTextSecondary }}>
                                            <strong>
                                                Tudo o que você precisa.
                                            </strong>
                                        </h2>

                                        <h5 style={{ color: colorTextSecondary }}>
                                            Nossa formação faz você conhecer a fé como ela é.
                                        </h5>

                                    </Col>
                                    <Col md={7}>

                                        <Row justify={"center"}>
                                            <Col span={24} style={{ color: colorTextSecondary }}>
                                                <MdOutlineConnectWithoutContact size={200} />
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                            </Card>

                        </AnimationOnScroll>
                    </Card>

                </Col>
            </Row >


        </Content >
    );


}
