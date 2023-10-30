import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineCloudServer } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { cookies } from '../../controller/user/adm.cookies';

interface Menu {
    name: string;
    icon: JSX.Element;
    href?: string;
    action?: () => void;
}

export const LoggedScreen = () => {
    const menu: Menu[] = [
        { name: 'Ir para o Site', icon: <BsGlobe size={20} />, href: '/' },
        {
            name: 'Gerenciar Site',
            icon: <AiOutlineCloudServer size={20} />,
            href: '/system'
        },
        { name: 'Sair', icon: <BiLogOut size={20} />, action: () => logout() }
    ];

    return (
        <Container className="g-0 m-0 p-0" style={{ minWidth: 250 }}>
            <Row className="p-0 g-0 m-0">
                <ListGroup className="m-0 g-0">
                    {menu.map((values, index) => {
                        return (
                            <ListGroup.Item
                                key={index}
                                action
                                variant="light"
                                href={values.href}
                                onClick={values.action}
                                className="border-0 mt-0"
                            >
                                <Row className="justify-content-between">
                                    <Col xs={'8'}>{values.name}</Col>
                                    <Col xs={'2'}>{values.icon}</Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Row>
        </Container>
    );

    function logout() {
        cookies.remove('data.user');
        setTimeout(() => {
            document.location = '/logout';
        }, 500);
    }
};
