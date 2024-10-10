import { Col, Dropdown, MenuProps, Row, theme } from 'antd';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { TbUserCircle } from 'react-icons/tb';
import { Logged } from '../../../logged.menu';

interface Props {
    navigateMenu: MenuNavigation[];
}

export const MenuScreen = (props: Props) => {
    const {
        token: { colorTextSecondary }
    } = theme.useToken();

    return (
        <Row justify={'end'}>
            <Col md={14}>
                <Menu />
            </Col>
        </Row>
    );

    function Menu() {
        return (
            <Row className="m-2">
                <Col md={24}>
                    <Row justify={'end'} align={'stretch'}>
                        <Col>
                            <Row gutter={[20, 0]}>
                                {props.navigateMenu.map((value, index: any) => {
                                    const items: MenuProps['items'] = [];
                                    value.subTitles.map((sub) => {
                                        items.push({
                                            label: (
                                                <a
                                                    className="fs-6"
                                                    href={sub.href}
                                                >
                                                    {sub.name}
                                                </a>
                                            ),
                                            key: sub.name
                                        }) as any;
                                    });
                                    return (
                                        <Col className="mt-2" key={index}>
                                            <Dropdown menu={{ items }}>
                                                <a
                                                    style={{
                                                        color: colorTextSecondary
                                                    }}
                                                    className="fs-6"
                                                >
                                                    {value.title}
                                                </a>
                                            </Dropdown>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                        <Col>
                            <Dropdown
                                className="ms-4"
                                trigger={['click']}
                                dropdownRender={() => <Logged />}
                            >
                                <a style={{ color: colorTextSecondary }}>
                                    <TbUserCircle size={40} />
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
};
