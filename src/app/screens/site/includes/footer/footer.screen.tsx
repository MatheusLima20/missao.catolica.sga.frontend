import React from 'react';
import './footer.css';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { Footer } from 'antd/es/layout/layout';
import { Col, Row } from 'antd';
import { TbPoint } from 'react-icons/tb';

interface Props {
    navigateMenu: MenuNavigation[];
}

export const FooterScreen = (props: Props) => {
    return (
        <Footer className="mt-5 mb-5">
            <Row justify={'end'}>
                <Col span={24}>
                    <Row>
                        {props.navigateMenu.map((values, index) => {
                            return (
                                <Col key={index} md={3} className=" mt-5">
                                    <Row>
                                        <h6>
                                            <strong>{values.title}</strong>
                                        </h6>
                                    </Row>
                                    {values.subTitles.map((value, index) => {
                                        return (
                                            <Row key={index}>
                                                <div>
                                                    <a href={value.href}>
                                                        <span className="link">
                                                            <TbPoint
                                                                size={15}
                                                            />
                                                            &nbsp;
                                                            {value.name}
                                                        </span>
                                                    </a>
                                                </div>
                                            </Row>
                                        );
                                    })}
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </Footer>
    );
};
