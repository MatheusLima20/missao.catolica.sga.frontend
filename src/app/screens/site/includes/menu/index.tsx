import React, { useEffect, useState } from 'react';
import { MenuMobileScreen } from './menu.mobile.screen';
import { MenuScreen } from './menu.screen';
import './menu.css';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { Col, Row } from 'antd';

const navigateMenu: MenuNavigation[] = [
    {
        title: 'Missões',
        subTitles: [
            { name: 'Quem Somos', href: '/about' }
            // /{ name: "Trabalhe conosco", href: "/work-us" },
        ]
    },
    {
        title: 'Pregadores',
        subTitles: [
            { name: 'Nossos Serviços', href: '/services' }
            // { name: "Tecnologia", href: "/technology" },
        ]
    },
    {
        title: 'Retiros',
        subTitles: [
            { name: 'Nossos Serviços', href: '/services' }
            // { name: "Tecnologia", href: "/technology" },
        ]
    },
    {
        title: 'Artigos',
        subTitles: [
            { name: 'Nossos Serviços', href: '/services' }
            // { name: "Tecnologia", href: "/technology" },
        ]
    },
    {
        title: 'Sobre',
        subTitles: [
            { name: 'Politica de privacidade', href: '/privacity-police' }
        ]
    }
];

export const Menu = () => {
    const [screenMobile, setScreenMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            const sizeMobile: boolean = window.innerWidth < 1090;
            setScreenMobile(sizeMobile);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {!screenMobile && (
                <Row align={'top'}>
                    <Col md={24}>
                        <MenuScreen navigateMenu={navigateMenu} />
                    </Col>
                </Row>
            )}

            {screenMobile && (
                <Row justify={'center'} align="bottom">
                    <Col md={8}>
                        <MenuMobileScreen navigateMenu={navigateMenu} />
                    </Col>
                </Row>
            )}
        </>
    );
};
