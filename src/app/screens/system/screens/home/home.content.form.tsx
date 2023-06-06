import React, { useRef, useState } from 'react';
import { Button, Col, Form, Image, Input, message, Row, Select } from 'antd';
import { Content } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';
import SunEditor from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from 'suneditor/src/plugins';
import { cookies } from '../../../../controller/user/adm.cookies';

type InitialValues = {
    title?: string;
    subTitle?: string;
    video?: string;
    path?: string;
    fileName?: string;
    url?: string;
    text?: string;
    page: string;
    contentType: string;
    id?: number;
};

const initialValues: InitialValues = {
    id: 0,
    title: undefined,
    subTitle: undefined,
    text: undefined,
    path: undefined,
    fileName: undefined,
    page: 'home',
    contentType: 'text',
    url: undefined,
    video: undefined
};

const cookie = cookies.get('data.user');

const token = cookie.token;

export const HomeContentForm = () => {
    const editor = useRef<SunEditorCore>();

    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
        setTimeout(() => {
            editor.current?.setOptions({
                charCounter: true,
                charCounterType: 'byte',
                maxCharCount: 5000
            });
        }, 500);
    };

    const [values, setValues] = useState(initialValues);
    const [messageApi, contextHolder] = message.useMessage();

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setValues({ ...values, [name]: value });
    };

    const handleReset = () => {
        const element = document.getElementById('form') as any;
        setValues({ ...initialValues });
        element.reset();
    };

    return (
        <Row gutter={[0, 20]}>
            {contextHolder}
            <Col span={24} className="mb-5">
                <Form
                    id="form"
                    layout="vertical"
                    size="large"
                    requiredMark={false}
                    scrollToFirstError={true}
                    initialValues={initialValues}
                    fields={[
                        { name: 'title', value: values.title },
                        { name: 'subTitle', value: values.subTitle },
                        { name: 'contentType', value: values.contentType },
                        { name: 'page', value: values.page },
                        { name: 'url', value: values.url }
                    ]}
                    onFinish={save}
                >
                    <Row justify={'center'} gutter={[20, 0]}>
                        <Col md={4}>
                            <Form.Item label="Página" name="page">
                                <Select
                                    defaultValue={values.page}
                                    value={values.page}
                                    onChange={(value) => {
                                        setValues({
                                            ...initialValues,
                                            page: value
                                        });
                                    }}
                                    options={[
                                        { value: 'home', label: 'Home' },
                                        { value: 'article', label: 'Artigos' }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={4}>
                            <Form.Item
                                label="Tipo de Conteúdo"
                                name="contentType"
                            >
                                <Select
                                    defaultValue={values.contentType}
                                    value={values.contentType}
                                    onChange={(value) => {
                                        setValues({
                                            ...initialValues,
                                            contentType: value,
                                            page: values.page
                                        });
                                    }}
                                    options={[
                                        { value: 'text', label: 'Texto' },
                                        { value: 'slider', label: 'Slider' },
                                        { value: 'article', label: 'Artigo' }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item
                                label="Titulo"
                                name="title"
                                rules={[
                                    {
                                        required:
                                            values.contentType === 'article',
                                        message: 'Digite o título.'
                                    }
                                ]}
                            >
                                <Input
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    placeholder="Digite seu titulo..."
                                />
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item
                                label="Subtítulo"
                                name="subTitle"
                                rules={[
                                    {
                                        required:
                                            values.contentType === 'article',
                                        message: 'Digite o subtítulo.'
                                    }
                                ]}
                            >
                                <Input
                                    name="subTitle"
                                    value={values.subTitle}
                                    onChange={handleChange}
                                    placeholder="Digite seu subtítulo..."
                                />
                            </Form.Item>
                        </Col>

                        {values.contentType !== 'slider' && (
                            <Col md={24}>
                                <Form.Item
                                    label="Texto"
                                    name="text"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Por favor, digite o texto!'
                                        }
                                    ]}
                                >
                                    <SunEditor
                                        name="text"
                                        height="400"
                                        setAllPlugins={true}
                                        lang={'pt_br'}
                                        placeholder="Digite seu texto..."
                                        setOptions={{
                                            imageGalleryHeader: {
                                                authorization: `Bearer ${token}`
                                            },
                                            imageGalleryUrl:
                                                'http://localhost:3001/content-gallery',
                                            plugins: plugins,
                                            buttonList: [
                                                // default
                                                ['undo', 'redo'],
                                                [
                                                    ':p-More Paragraph-default.more_paragraph',
                                                    'font',
                                                    'fontSize',
                                                    'formatBlock',
                                                    'paragraphStyle',
                                                    'blockquote'
                                                ],
                                                [
                                                    'bold',
                                                    'underline',
                                                    'italic',
                                                    'strike',
                                                    'subscript',
                                                    'superscript'
                                                ],
                                                [
                                                    'fontColor',
                                                    'hiliteColor',
                                                    'textStyle'
                                                ],
                                                ['removeFormat'],
                                                ['outdent', 'indent'],
                                                [
                                                    'align',
                                                    'horizontalRule',
                                                    'list',
                                                    'lineHeight'
                                                ],
                                                [
                                                    '-right',
                                                    ':i-More Misc-default.more_vertical',
                                                    'fullScreen',
                                                    'showBlocks',
                                                    'codeView',
                                                    'preview',
                                                    'print'
                                                ],
                                                ['table'],
                                                [
                                                    '-right',
                                                    'imageGallery',
                                                    'video',
                                                    'audio',
                                                    'link'
                                                ],
                                                // (min-width: 992)
                                                [
                                                    '%992',
                                                    [
                                                        ['undo', 'redo'],
                                                        [
                                                            ':p-More Paragraph-default.more_paragraph',
                                                            'font',
                                                            'fontSize',
                                                            'formatBlock',
                                                            'paragraphStyle',
                                                            'blockquote'
                                                        ],
                                                        [
                                                            'bold',
                                                            'underline',
                                                            'italic',
                                                            'strike'
                                                        ],
                                                        [
                                                            ':t-More Text-default.more_text',
                                                            'subscript',
                                                            'superscript',
                                                            'fontColor',
                                                            'hiliteColor',
                                                            'textStyle'
                                                        ],
                                                        ['removeFormat'],
                                                        ['outdent', 'indent'],
                                                        [
                                                            'align',
                                                            'horizontalRule',
                                                            'list',
                                                            'lineHeight'
                                                        ],
                                                        [
                                                            '-right',
                                                            ':i-More Misc-default.more_vertical',
                                                            'fullScreen',
                                                            'showBlocks',
                                                            'codeView',
                                                            'preview',
                                                            'print'
                                                        ],
                                                        [
                                                            '-right',
                                                            ':r-More Rich-default.more_plus',
                                                            'table',
                                                            'link',
                                                            'imageGallery',
                                                            'video',
                                                            'audio'
                                                        ]
                                                    ]
                                                ],
                                                // (min-width: 767)
                                                [
                                                    '%767',
                                                    [
                                                        ['undo', 'redo'],
                                                        [
                                                            ':p-More Paragraph-default.more_paragraph',
                                                            'font',
                                                            'fontSize',
                                                            'formatBlock',
                                                            'paragraphStyle',
                                                            'blockquote'
                                                        ],
                                                        [
                                                            ':t-More Text-default.more_text',
                                                            'bold',
                                                            'underline',
                                                            'italic',
                                                            'strike',
                                                            'subscript',
                                                            'superscript',
                                                            'fontColor',
                                                            'hiliteColor',
                                                            'textStyle'
                                                        ],
                                                        ['removeFormat'],
                                                        ['outdent', 'indent'],
                                                        [
                                                            ':e-More Line-default.more_horizontal',
                                                            'align',
                                                            'horizontalRule',
                                                            'list',
                                                            'lineHeight'
                                                        ],
                                                        [
                                                            ':r-More Rich-default.more_plus',
                                                            'table',
                                                            'link',
                                                            'imageGallery',
                                                            'video',
                                                            'audio'
                                                        ],
                                                        [
                                                            '-right',
                                                            ':i-More Misc-default.more_vertical',
                                                            'fullScreen',
                                                            'showBlocks',
                                                            'codeView',
                                                            'preview',
                                                            'print'
                                                        ]
                                                    ]
                                                ],
                                                // (min-width: 480)
                                                [
                                                    '%480',
                                                    [
                                                        ['undo', 'redo'],
                                                        [
                                                            ':p-More Paragraph-default.more_paragraph',
                                                            'font',
                                                            'fontSize',
                                                            'formatBlock',
                                                            'paragraphStyle',
                                                            'blockquote'
                                                        ],
                                                        [
                                                            ':t-More Text-default.more_text',
                                                            'bold',
                                                            'underline',
                                                            'italic',
                                                            'strike',
                                                            'subscript',
                                                            'superscript',
                                                            'fontColor',
                                                            'hiliteColor',
                                                            'textStyle',
                                                            'removeFormat'
                                                        ],
                                                        [
                                                            ':e-More Line-default.more_horizontal',
                                                            'outdent',
                                                            'indent',
                                                            'align',
                                                            'horizontalRule',
                                                            'list',
                                                            'lineHeight'
                                                        ],
                                                        [
                                                            ':r-More Rich-default.more_plus',
                                                            'table',
                                                            'link',
                                                            'imageGallery',
                                                            'video',
                                                            'audio'
                                                        ],
                                                        [
                                                            '-right',
                                                            ':i-More Misc-default.more_vertical',
                                                            'fullScreen',
                                                            'showBlocks',
                                                            'codeView',
                                                            'preview',
                                                            'print'
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        }}
                                        getSunEditorInstance={
                                            getSunEditorInstance
                                        }
                                        onChange={(value: any) => {
                                            setValues({
                                                ...values,
                                                text: value
                                            });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        )}

                        {values.contentType !== 'text' && (
                            <Col md={24}>
                                <Form.Item
                                    label="Imagem"
                                    name="url"
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                >
                                    <Input
                                        name="url"
                                        value={values.url}
                                        onChange={handleChange}
                                        placeholder="Digite a url..."
                                    />
                                </Form.Item>
                            </Col>
                        )}

                        <Col span={24}>
                            <Row justify={'center'} className="text-center">
                                <Col span={24}>
                                    <Image src={values.url} width={400} />
                                </Col>
                            </Row>
                        </Col>

                        <Col md={24} className="mt-5">
                            <Row justify={'center'} gutter={[30, 0]}>
                                <Col>
                                    <Button type="primary" htmlType="submit">
                                        <strong>Enviar</strong>
                                    </Button>
                                </Col>

                                <Col>
                                    <Button
                                        type="default"
                                        onClick={handleReset}
                                    >
                                        <strong>Limpar</strong>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );

    async function save() {
        messageApi.open({
            key: 'content.registration',
            type: 'loading',
            content: 'Enviando...',
            duration: 7
        });

        const dataValues: Content = {
            title: values.title,
            subTitle: values.subTitle,
            text: values.text,
            page: values.page,
            contentType: values.contentType,
            url: values.url
        };

        const request = await ContentController.store(dataValues);

        const error = request.error;

        const message = request.message;

        const type = error ? 'error' : 'success';

        setTimeout(() => {
            messageApi.open({
                key: 'content.registration',
                type: type,
                content: message,
                duration: 7
            });
            if (!error) {
                handleReset();
            }
        }, 1000);
    }
};
