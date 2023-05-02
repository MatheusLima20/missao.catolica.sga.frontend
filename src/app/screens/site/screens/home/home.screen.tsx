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

const gridStyle: React.CSSProperties = {
    textAlign: 'center',
};

export const HomeScreen = () => {

    const {
        token: { colorText, colorBgBase },
    } = theme.useToken();

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
                        <AnimationOnScroll
                            initiallyVisible={false}
                            animatePreScroll={false}
                            animateIn="animate__fadeIn"
                            animateOut="animate__fadeOut"
                        >

                            <Card className="border-0 mb-5 mt-5" hoverable={true} title={(
                                <Row style={{ color: colorText }} className="mt-5 text-center">
                                    <Col md={24}>
                                        <h2>
                                            <strong>
                                                Lutando Contra Heresias!
                                            </strong>
                                        </h2>
                                    </Col>
                                </Row>
                            )}>
                                <Row>
                                    <Col span={24}>
                                        <Row>
                                            <Col className="w-100" md={8}>
                                                <Card.Grid className="w-100 h-100" style={gridStyle}>
                                                    <Row>
                                                        <Col span={24}>
                                                            <IoIosPeople size={70} />
                                                            <h3 className="text-color">
                                                                <strong>
                                                                    Formando Pregadores
                                                                </strong>
                                                            </h3>
                                                            <h6>
                                                                Disponibilizamos formações gratuitas
                                                                para que você possa evangelizar sua comunidade.
                                                            </h6>
                                                        </Col>
                                                    </Row>
                                                </Card.Grid>
                                            </Col>
                                            <Col className="w-100" md={8}>
                                                <Card.Grid className="w-100 h-100" style={gridStyle}>
                                                    <Row >
                                                        <Col span={24}>

                                                            <MdOutlineLiveTv size={70} />
                                                            <h3 className="text-color">
                                                                <strong>
                                                                    Lives
                                                                </strong>
                                                            </h3>
                                                            <h6>
                                                                Lives Oracionais Diariamente
                                                            </h6>

                                                        </Col>
                                                    </Row>
                                                </Card.Grid>
                                            </Col>
                                            <Col className="w-100" md={8}>
                                                <Card.Grid className="w-100 h-100" style={gridStyle}>
                                                    <Row>
                                                        <Col span={24}>
                                                            <GiLifeInTheBalance size={70} />
                                                            <h3 className="text-color">
                                                                <strong>
                                                                    A Verdade
                                                                </strong>
                                                            </h3>
                                                            <h6>
                                                                Combatemos firmemente as heresias,
                                                                falsas doutrinas e ideologias pagãs.'1'
                                                            </h6>
                                                        </Col>
                                                    </Row>
                                                </Card.Grid>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                            </Card>
                        </AnimationOnScroll>

                        <AnimationOnScroll
                            initiallyVisible={false}
                            animatePreScroll={false}
                            animateIn="animate__fadeIn"
                            animateOut="animate__fadeOut"
                        >

                            <Card hoverable={true} className="m-4 mt-5 rounde-3">
                                <Row justify={"space-between"} className="text-white m-3">
                                    <Col md={14}>

                                        <h2>
                                            <strong>
                                                Tudo o que você precisa.
                                            </strong>
                                        </h2>

                                        <h5>
                                            Nossa formação faz você conhecer a fé como ela é.
                                        </h5>

                                    </Col>
                                    <Col md={7}>

                                        <Row justify={"center"}>
                                            <Col span={24}>
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
