import React, { useState } from 'react';
import { ResultSearchScreen } from './search.result.screen';
import { ContentController } from '../../../../controller/content/content.controller';
import { Card, Col, Row } from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import { ContentData } from '../../../../types/content/content';
import ReactPlayer from 'react-player';
import { verifyUrl } from '../../../../util/verify.url/verify.url';

export const SearchScreen = () => {
    const [articles, setArticles] = useState<ContentData[]>([]);

    const [search, setSearch] = useState<string>('');

    return (
        <Content className="mt-5">
            <Row justify={'center'}>
                <Col md={20}>
                    <Card
                        style={{
                            minHeight: 700
                        }}
                        className="border-0 shadow-lg p-3 mb-5 rounded"
                    >
                        <Row gutter={[20, 40]}>
                            <Col className="text-center" span={24}>
                                <h2>
                                    <strong>Pesquisar Conteúdos</strong>
                                </h2>
                            </Col>
                            <Col span={24}>
                                <Search
                                    placeholder="Digite para pesquisar..."
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                    }}
                                    size="large"
                                    onSearch={getSearch}
                                    enterButton
                                />
                            </Col>
                            <Col>
                                <ResultSearchScreen articles={initArticles()} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );

    async function getSearch() {
        const request = await ContentController.getBySearch(search);

        const data: ContentData[] = request.data;

        if (data) {
            setArticles(data);
        }
    }

    function initArticles() {
        const values: any[] = [];

        articles.map((value) => {
            const title = value.title ? value.title : '';
            const subTitle = value.subTitle ? value.subTitle : '';
            const jsx = verifyUrl.isYoutubeVideo(value.url) ? (
                <ReactPlayer
                    url={value.url}
                    width={'100%'}
                    height={170}
                    controls={false}
                />
            ) : (
                <img src={value.url} width="100%" className="rounded-4" />
            );
            return values.push({
                id: value.id,
                jsx: jsx,
                title: title,
                subTitle: subTitle,
                tag: value.tag
            });
        });
        return values;
    }
};
