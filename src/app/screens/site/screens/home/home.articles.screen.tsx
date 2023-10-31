import { Button, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';

interface Props {
    articles: any[];
}

export const HomeArticlesScreen = (props: Props) => {
    const articles: any[] = props.articles;

    return (
        <Row className="mb-5" justify={'center'} gutter={[20, 20]}>
            {articles.map((article, index) => {
                const id = article.id;
                const title: string = article.title;
                const subTitle: string = article.subTitle;
                return (
                    <Col key={index} md={8}>
                        <Button
                            type="link"
                            style={{ height: 'auto' }}
                            href={`/artigo/${title.replaceAll(' ', '-')}/${id}`}
                        >
                            <Card
                                hoverable
                                style={{ minHeight: 350 }}
                                cover={article.jsx}
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
                        </Button>
                    </Col>
                );
            })}
        </Row>
    );
};
