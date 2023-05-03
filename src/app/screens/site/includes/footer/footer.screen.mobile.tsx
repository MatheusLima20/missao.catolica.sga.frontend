import React from 'react';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import Accordion from 'react-bootstrap/Accordion';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { MenuList } from '../menu.list/menu.list';

interface Props {
    navigateMenu: MenuNavigation[];
}

const CustomToggle = React.forwardRef(({ children }: any, ref: any) => (
    <div ref={ref}>
        <strong>{children}</strong>
    </div>
));

export const FooterMobileScreen = (props: Props) => {
    return (
        <div className="row mt-5 w-100 g-0">
            <div className="row mt-5 mb-5 g-0 ">
                <div className="row g-0 justify-content-center">
                    <Accordion as={CustomToggle}>
                        {props.navigateMenu.map((values, index) => {
                            return (
                                <div key={index}>
                                    <Accordion.Item
                                        eventKey={index.toString()}
                                        className="p-3"
                                    >
                                        <Accordion.Header>
                                            <div className="row justify-content-between w-100">
                                                <div className="col-10">
                                                    {values.title}
                                                </div>
                                                <div className="col-1">
                                                    <IoMdArrowDropdownCircle />
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {values.subTitles.map(
                                                (value, index) => {
                                                    return (
                                                        <MenuList
                                                            key={index}
                                                            href={value.href}
                                                            name={value.name}
                                                        />
                                                    );
                                                }
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </div>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};
