import { Card, Col, Row, Space, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { StringFomatter } from '../../../../util/string.formatter/string.fomatter';

interface Props {
    articles: any[];
}

export const ResultSearchScreen = (props: Props) => {
    const articles: any[] = props.articles;

    return (
        <Row id="articles" className="mb-5 text-center" justify={'center'}>
            <Col md={24}>
                <Row justify={'center'} gutter={[40, 40]}>
                    {articles.map((article, index) => {
                        const id = article.id;
                        const title: string = article.title;
                        const tag: string = article.tag;
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
                                                <div>
                                                    <Space
                                                        className="mb-3 text-start"
                                                        size={[5, 8]}
                                                        wrap
                                                    >
                                                        <Tag color="red">
                                                            <span
                                                                style={{
                                                                    fontSize: 15,
                                                                    textAlign:
                                                                        'start'
                                                                }}
                                                            >
                                                                {tag}
                                                            </span>
                                                        </Tag>
                                                        <span
                                                            style={{
                                                                fontSize: 12
                                                            }}
                                                        >
                                                            {StringFomatter.formatDate(
                                                                article?.createdAt as any
                                                            )}
                                                        </span>
                                                    </Space>

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
                                                </div>
                                            }
                                            description={subTitle}
                                            style={{ flexDirection: 'row' }}
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
