import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';

interface Props {
    videos: any[];
}

export const HomeHomilyScreen = (props: Props) => {
    const videos: any[] = props.videos;

    return (
        <Row
            id="homily"
            className="mb-5 m-4"
            align={'middle'}
            justify={'center'}
            gutter={[70, 70]}
        >
            {videos.map((video, index) => {
                const id = video.id;
                const title: string = video.title;
                const subTitle: string = video.subTitle;
                return (
                    <Col key={index} md={12} className="text-center">
                        <a
                            href={`/homilia-diaria/${title.replaceAll(
                                ' ',
                                '-'
                            )}/${id}`}
                        >
                            <Card
                                hoverable
                                style={{ minHeight: 550 }}
                                cover={video.jsx}
                            >
                                <Meta
                                    title={
                                        <h5>
                                            <strong
                                                style={{
                                                    whiteSpace: 'pre-line'
                                                }}
                                            >
                                                {title}
                                            </strong>
                                        </h5>
                                    }
                                    description={subTitle}
                                />
                            </Card>
                        </a>
                    </Col>
                );
            })}
        </Row>
    );
};
