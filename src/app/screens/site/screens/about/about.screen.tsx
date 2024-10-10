import './about.css';
import { ContentData } from '../../../../types/content/content';
import { Card, Col, Row } from 'antd';
import HTMLReactParser from 'html-react-parser';

interface Props {
    data: ContentData[];
}

export const AboutScreen = (props: Props) => {
    const data = props.data;

    const text = data[0]?.text ? data[0].text : '';

    return (
        <Row justify={'center'} className="mt-5">
            <Col md={20}>
                <Card
                    style={{ backgroundColor: '#efcfa6' }}
                    className="border-0 shadow-lg p-3 mb-5 rounded"
                >
                    <Row justify={'center'}>
                        <Col span={20}>{HTMLReactParser(text)}</Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};
