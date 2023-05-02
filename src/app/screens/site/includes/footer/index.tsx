import React, { useEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { MenuNavigation } from "../../../../types/includes/include.types";
import { FooterScreen } from "./footer.screen";
import { FooterMobileScreen } from "./footer.screen.mobile";
import "./footer.css";
import { AcceptCookies } from "../conf/accept.cookies";


const menuFooter: MenuNavigation[] = [
    {
        title: "Para seu negócio",
        subTitles: [{
            name: "Nossos Serviços",
            href: "/services"
        },
            //{
            //     name: "Tecnologia",
            //    href: "/technology"
            //}
        ]
    },
    {
        title: "Ajuda",
        subTitles: [{
            name: "Politica de privacidade",
            href: "/privacity-police"
        },
            //{
            //   name: "Trabalhe conosco",
            //   href: "/work-us"
            //}
        ]
    },
    //{
    //title: "Ajuda",
    //subTitles: [{
    //   name: "Contato",
    //  href: "/contact"
    //}]
    //}
];

export const Footer = () => {

    const [dimensions, setDimensions] = useState({
        height: typeof window !== 'undefined' && window.innerHeight,
        width: typeof window !== 'undefined' && window.innerWidth,
    });
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };
        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <AnimationOnScroll
                initiallyVisible={false}
                animateIn="animate__fadeIn"
                animateOut="animate__fadeOut"
            >
                {(dimensions.width > 1005) && <FooterScreen navigateMenu={menuFooter} />}
                {(dimensions.width < 1005) && <FooterMobileScreen navigateMenu={menuFooter} />}
            </AnimationOnScroll>
            <AcceptCookies />
        </>
    );

}