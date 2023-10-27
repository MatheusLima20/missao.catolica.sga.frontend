import { Button, Card, Col, Row } from 'antd';

interface Props {
    videos: any[];
}

export const HomeVideosScreen = (props: Props) => {
    const videos: any[] = props.videos;

    return (
        <Row
            className="mb-5"
            align={'middle'}
            justify={'center'}
            gutter={[20, 20]}
        >
            {videos.map((video, index) => {
                const id = video.id;
                const title: string = video.title;
                const subTitle: string = video.subTitle;
                return (
                    <Col key={index} md={12} className="mb-5">
                        <Card
                            bordered={false}
                            hoverable={true}
                            className="w-100"
                            style={{
                                textAlign: 'center',
                                height: 'auto'
                            }}
                        >
                            <Button
                                type="link"
                                style={{
                                    height: 'auto'
                                }}
                                href={`/articles/${title.replaceAll(
                                    ' ',
                                    '-'
                                )}/${id}`}
                            >
                                <Row
                                    align={'middle'}
                                    justify={'center'}
                                    gutter={[20, 20]}
                                >
                                    <Col md={24}>{video.jsx}</Col>
                                    <Col md={24}>
                                        <Row
                                            className="text-center text-black"
                                            justify={'center'}
                                        >
                                            <Col span={24}>
                                                <div>
                                                    <h4>
                                                        <strong>
                                                            {title.substring(
                                                                0,
                                                                25
                                                            )}
                                                        </strong>
                                                    </h4>
                                                    <p
                                                        style={{
                                                            whiteSpace:
                                                                'pre-line'
                                                        }}
                                                    >
                                                        {subTitle.substring(
                                                            0,
                                                            150
                                                        )}
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Button>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};
