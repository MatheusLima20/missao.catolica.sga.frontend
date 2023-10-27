import { Button, Card, Col, Row } from 'antd';

interface Props {
    articles: any[];
}

export const HomeArticlesScreen = (props: Props) => {
    const articles: any[] = props.articles;

    return (
        <Row
            className="mb-5"
            align={'middle'}
            justify={'center'}
            gutter={[20, 20]}
        >
            {articles.map((article, index) => {
                const id = article.id;
                const title: string = article.title;
                const subTitle: string = article.subTitle;
                return (
                    <Col key={index} md={12} className="mb-5">
                        <Card
                            bordered={false}
                            hoverable={true}
                            className=" border"
                            style={{
                                textAlign: 'center',
                                height: 'auto'
                            }}
                        >
                            <Button
                                type="link"
                                style={{ height: 'auto' }}
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
                                    <Col md={10}>{article.jsx}</Col>
                                    <Col md={12}>
                                        <Row
                                            className="text-start text-black"
                                            justify={'start'}
                                        >
                                            <Col span={24}>
                                                <h4>
                                                    <strong>
                                                        {title.substring(0, 20)}
                                                    </strong>
                                                </h4>
                                                <p
                                                    style={{
                                                        whiteSpace: 'pre-line'
                                                    }}
                                                >
                                                    {subTitle.substring(0, 150)}
                                                </p>
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
