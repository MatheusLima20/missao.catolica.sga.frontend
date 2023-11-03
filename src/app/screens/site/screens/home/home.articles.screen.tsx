import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { StringFomatter } from '../../../../util/string.formatter/string.fomatter';

interface Props {
    articles: any[];
}

export const HomeArticlesScreen = (props: Props) => {
    const articles: any[] = props.articles;

    return (
        <Row id="articles" className="mb-5 text-center" justify={'center'}>
            <Col md={24}>
                <Row justify={'center'} gutter={[40, 40]}>
                    {articles.map((article, index) => {
                        const id = article.id;
                        const title: string = article.title;
                        const titleUrl = StringFomatter.removeSpecialCharacters(
                            StringFomatter.removeSpecialString(title)
                        )
                            .replaceAll(' ', '-')
                            .toLocaleLowerCase();
                        const subTitle: string = article.subTitle;
                        return (
                            <Col key={index} md={8}>
                                <a href={`/artigo/${titleUrl}/${id}`}>
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
