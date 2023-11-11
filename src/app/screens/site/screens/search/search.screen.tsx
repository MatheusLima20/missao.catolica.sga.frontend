import React, { useState } from 'react';
import { ResultSearchScreen } from './search.result.screen';
import { ContentController } from '../../../../controller/content/content.controller';
import { Card, Col, Result, Row, Spin, message } from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import { ContentData } from '../../../../types/content/content';
import ReactPlayer from 'react-player';
import { verifyUrl } from '../../../../util/verify.url/verify.url';

export const SearchScreen = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [articles, setArticles] = useState<ContentData[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [search, setSearch] = useState<string>('');

    return (
        <Content className="mt-5">
            {contextHolder}
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
                            <Col className="text-center" span={24}>
                                {articles.length !== 0 && !loading && (
                                    <ResultSearchScreen
                                        articles={initArticles()}
                                    />
                                )}

                                {loading && (
                                    <Spin size="large" tip="Carregando..." />
                                )}
                                {articles.length === 0 && !loading && (
                                    <Result
                                        title="Nenhum dado encontrado."
                                        subTitle="Digite novamente para pesquisar."
                                    />
                                )}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );

    async function getSearch() {
        setLoading(true);

        if (search.length < 3) {
            messageApi.open({
                key: 'search',
                type: 'info',
                content:
                    'São necessário pelo menos quatro caracteres para pesquisar.',
                duration: 7
            });
            setLoading(false);
            return;
        }

        const request = await ContentController.getBySearch(search);

        const data: ContentData[] = request.data;

        if (data) {
            setArticles(data);
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
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
                tag: value.tag,
                createdAt: value.createdAt
            });
        });
        return values;
    }
};
