import { Col, Menu, MenuProps, Row, theme } from "antd";
import React, { useEffect, useState } from "react";
import { MenuNavigation } from "../../../../types/includes/include.types";


interface Props {
    navigateMenu: MenuNavigation[],
}

export const MenuScreen = (props: Props) => {

    const {
        token: { colorBgBase },
    } = theme.useToken();

    const [items, setItems] = useState<MenuProps["items"]>([]);

    useEffect(() => {
        startItems();
        // eslint-disable-next-line
    }, []);


    return (
        <Row className="justify-content-end">


            <Col span={24} className=" align-self-start">
                <Menu
                    mode="horizontal"
                    className="border-0"
                    style={{
                        backgroundColor: colorBgBase
                    }}
                    items={items}
                />
            </Col>

        </Row >
    );

    function startItems() {

        const items: MenuProps["items"] = [];
        
        props.navigateMenu.map((value, index: any) => {

            return items.push({
                label: (
                    <h5 className="p-2 ps-3 text-center">
                        {value.title}
                    </h5>
                ),
                key: value.title + index,
                children: value.subTitles.map((sub) => {
                    return (
                        {

                            label: (
                                <a href={sub.href}>
                                    {sub.name}
                                </a>
                            ),
                            key: sub.name,

                        } as any
                    )
                }),

            });

        });
        
        setItems(items);

    }

}