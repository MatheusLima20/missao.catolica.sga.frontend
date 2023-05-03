import { Col, Row, theme } from 'antd';
import React from 'react';
import { Images } from '../../../../config/images';
import { Menu } from '../menu';
import './header.css';

export const HeaderScreen = () => {
    const {
        token: { colorText, colorBgContainer }
    } = theme.useToken();

    return (
        <Row
            className="p-0"
            justify={'space-between'}
            align={'top'}
            style={{ backgroundColor: colorBgContainer }}
        >
            <Col push={1} md={7} className="logo">
                <Row>
                    <a href="/">
                        <Row align={'middle'}>
                            <Col>
                                <img
                                    className="img-logo"
                                    src={Images.logo}
                                    alt="Sua logo aqui."
                                />
                            </Col>
                            <Col about="">
                                <p style={{ color: colorText }}>
                                    <strong>Missão Católica</strong>
                                </p>
                            </Col>
                        </Row>
                    </a>
                </Row>
            </Col>
            <Col md={12}>
                <Menu />
            </Col>
        </Row>
    );
};
