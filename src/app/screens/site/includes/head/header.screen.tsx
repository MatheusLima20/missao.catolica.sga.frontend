import { Col, Row, theme } from 'antd';
import { Images } from '../../../../config/images';
import { Menu } from '../menu';
import './header.css';

export const HeaderScreen = () => {
    const {
        token: { colorPrimary, colorTextSecondary }
    } = theme.useToken();

    return (
        <Row
            justify={'center'}
            align={'top'}
            style={{ backgroundColor: colorPrimary }}
        >
            <Col span={20}>
                <Row justify={'space-between'}>
                    <Col md={9}>
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
                                    <Col className="ms-2">
                                        <p
                                            style={{
                                                color: colorTextSecondary
                                            }}
                                        >
                                            <strong>Missão Católica</strong>
                                        </p>
                                    </Col>
                                </Row>
                            </a>
                        </Row>
                    </Col>
                    <Col md={15}>
                        <Menu />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
