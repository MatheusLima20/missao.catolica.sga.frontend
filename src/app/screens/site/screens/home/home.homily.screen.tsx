import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { StringFomatter } from '../../../../util/string.formatter/string.fomatter';

interface Props {
    videos: any[];
}

export const HomeHomilyScreen = (props: Props) => {
    const videos: any[] = props.videos;

    return (
        <Row id="homily" className="mb-5 text-center" justify={'center'}>
            <Col md={24}>
                <Row justify={'center'} gutter={[40, 40]}>
                    {videos.map((video, index) => {
                        const id = video.id;
                        const title: string = video.title;
                        const titleUrl = StringFomatter.removeSpecialCharacters(
                            StringFomatter.removeSpecialString(title)
                        )
                            .replaceAll(' ', '-')
                            .toLocaleLowerCase();
                        const subTitle: string = video.subTitle;
                        return (
                            <Col key={index} md={12}>
                                <a href={`/homilia-diaria/${titleUrl}/${id}`}>
                                    <Card
                                        hoverable
                                        style={{
                                            minHeight: 550,
                                            width: '100%'
                                        }}
                                        cover={video.jsx}
                                    >
                                        <Meta
                                            title={
                                                <h5>
                                                    <strong
                                                        style={{
                                                            whiteSpace:
                                                                'pre-line'
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
            </Col>
        </Row>
    );
};
