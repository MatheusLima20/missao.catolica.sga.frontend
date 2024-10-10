import { useRef, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Image,
    Input,
    message,
    Modal,
    Radio,
    Row,
    Select,
    Switch
} from 'antd';
import { ContentData, Gallery } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';
import SunEditor from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css';
import { pt_br } from 'suneditor/src/lang';
import plugins from 'suneditor/src/plugins';
import { cookies } from '../../../../controller/user/adm.cookies';
import { FaImages } from 'react-icons/fa';
import Meta from 'antd/es/card/Meta';
import { HomeScreenTable } from './home.screen.table';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { verifyUrl } from '../../../../util/verify.url/verify.url';
import { baseURL } from '../../../../config/axios';

type InitialValues = {
    title?: string;
    subTitle?: string;
    path?: string;
    url?: string;
    tag: string;
    contentType: string;
    id?: number;
    visible: boolean;
};

const initialValues: InitialValues = {
    id: 0,
    title: undefined,
    subTitle: undefined,
    path: undefined,
    tag: 'caution',
    contentType: 'slider',
    url: undefined,
    visible: false
};

const cookie = cookies.get('data.user');

const token = cookie.token;

interface Props {
    gallery: Gallery[];
    onClick: () => void;
}

export const HomeContentForm = (props: Props) => {
    const gallery = props.gallery;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [text, setText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [restartSunEditor, setRestartSunEditor] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const editor = useRef<SunEditorCore>();

    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
        setTimeout(() => {
            editor.current?.setOptions({
                charCounter: true,
                charCounterType: 'byte',
                maxCharCount: 100000,
                value: text
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
        element.reset();
        setValues({
            ...initialValues,
            tag: values.tag,
            contentType: values.contentType
        });
        setText('');
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
                        { name: 'tag', value: values.tag },
                        { name: 'url', value: values.url },
                        { name: 'text', value: text }
                    ]}
                    onFinish={save}
                >
                    <Row justify={'center'} gutter={[20, 0]}>
                        <Col md={5}>
                            <Form.Item
                                label="Tipo de Conteúdo"
                                name="contentType"
                            >
                                <Select
                                    defaultValue={values.contentType}
                                    value={values.contentType}
                                    onChange={(value) => {
                                        const event = {
                                            target: {
                                                value: value,
                                                name: 'contentType'
                                            }
                                        };

                                        if (value === 'slider') {
                                            setText('');
                                        }

                                        handleChange(event);
                                    }}
                                    options={[
                                        { value: 'text', label: 'Texto' },
                                        { value: 'slider', label: 'Slider' },
                                        { value: 'article', label: 'Artigo' },
                                        { value: 'video', label: 'Video' }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={5}>
                            <Form.Item label="Assunto" name={'tag'}>
                                <Select
                                    defaultValue={values.tag}
                                    value={values.tag}
                                    onChange={(value) => {
                                        const event = {
                                            target: {
                                                value: value,
                                                name: 'tag'
                                            }
                                        };

                                        handleChange(event);
                                    }}
                                    options={[
                                        {
                                            value: 'Apologética',
                                            label: 'Apologética'
                                        },
                                        { value: 'caution', label: 'Avisos' },
                                        {
                                            value: 'Cristologia',
                                            label: 'Cristologia'
                                        },
                                        { value: 'Doutrina', label: 'Dotrina' },
                                        {
                                            value: 'Espiritualidade',
                                            label: 'Espiritualidade'
                                        },
                                        {
                                            value: 'Liturgia',
                                            label: 'Liturgia'
                                        },
                                        {
                                            value: 'Formação',
                                            label: 'Formação'
                                        },
                                        {
                                            value: 'Mariologia',
                                            label: 'Mariologia'
                                        },
                                        {
                                            value: 'Santos e Mártires',
                                            label: 'Santos e Mártires'
                                        },
                                        {
                                            value: 'História da Igreja',
                                            label: 'História da Igreja'
                                        },
                                        { value: 'homily', label: 'Homilia' },
                                        { value: 'video', label: 'Video' },
                                        { value: 'about', label: 'Sobre' },
                                        {
                                            value: 'privacy-policy',
                                            label: 'Politica de Privacidade'
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={14}>
                            <Form.Item
                                label="Titulo"
                                name="title"
                                rules={[
                                    {
                                        required:
                                            values.contentType === 'article' ||
                                            values.contentType === 'video',
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
                        <Col md={20}>
                            <Form.Item
                                label="Subtítulo"
                                name="subTitle"
                                rules={[
                                    {
                                        required:
                                            values.contentType === 'article' ||
                                            values.contentType === 'video',
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

                        <Col md={4}>
                            <Form.Item
                                label="Ativo"
                                name="visible"
                                rules={[
                                    {
                                        required:
                                            values.contentType === 'article',
                                        message: 'Digite o subtítulo.'
                                    }
                                ]}
                            >
                                <Switch
                                    size="default"
                                    checked={values.visible}
                                    checkedChildren={
                                        <BsFillEyeFill size={20} />
                                    }
                                    unCheckedChildren={
                                        <BsFillEyeSlashFill size={20} />
                                    }
                                    onChange={(value: any) => {
                                        setValues({
                                            ...values,
                                            visible: value
                                        });
                                    }}
                                    defaultChecked={false}
                                />
                            </Form.Item>
                        </Col>

                        <Col md={24}>
                            <Form.Item
                                label="Texto"
                                name={'text'}
                                rules={[
                                    {
                                        required:
                                            values.contentType !== 'slider',
                                        message: 'Por favor, digite o texto!'
                                    }
                                ]}
                            >
                                {!restartSunEditor && (
                                    <SunEditor
                                        name="text"
                                        height="400"
                                        disable={
                                            values.contentType === 'slider'
                                        }
                                        setAllPlugins={true}
                                        lang={pt_br}
                                        placeholder="Digite seu texto..."
                                        setOptions={{
                                            value: text,
                                            imageGalleryHeader: {
                                                authorization: `Bearer ${token}`
                                            },
                                            imageGalleryUrl: `${baseURL}/content-gallery`,
                                            defaultStyle:
                                                'font-family: verdana; font-size: 18px;',
                                            plugins: plugins,
                                            fontSize: [8, 10, 14, 18, 24, 36],
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
                                                    'list'
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
                                                            'list'
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
                                                            'list'
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
                                                            'list'
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
                                            setText(value);
                                        }}
                                    />
                                )}
                            </Form.Item>
                        </Col>

                        <Col md={24}>
                            <Form.Item
                                label="URL Imagem/Video"
                                name="url"
                                rules={[
                                    {
                                        required: values.contentType !== 'text'
                                    }
                                ]}
                            >
                                <Input
                                    name="url"
                                    disabled={
                                        values.contentType !== 'video' &&
                                        values.contentType !== 'slider'
                                    }
                                    value={values.url}
                                    onClick={() => props.onClick()}
                                    onChange={handleChange}
                                    size="large"
                                    placeholder="Digite a url..."
                                    suffix={
                                        <Button
                                            disabled={
                                                values.contentType === 'text' ||
                                                values.contentType === 'video'
                                            }
                                            size="large"
                                            onClick={() => {
                                                props.onClick();
                                                showModal();
                                            }}
                                            icon={<FaImages size={30} />}
                                        />
                                    }
                                />
                            </Form.Item>
                        </Col>

                        {values.contentType !== 'text' &&
                            values.contentType !== 'video' && (
                                <Col span={24}>
                                    <Row
                                        justify={'center'}
                                        className="text-center"
                                    >
                                        <Col span={24}>
                                            <Image
                                                src={values.url}
                                                width={400}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            )}

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
            <Col span={24}>
                <HomeScreenTable
                    loading={loading}
                    getRowValues={(value: ContentData) => {
                        setValues({
                            id: value.id as any,
                            contentType: value.contentType,
                            tag: value.tag as any,
                            subTitle: value.subTitle as any,
                            title: value.title as any,
                            url: value.url as any,
                            visible: value.visible
                        });
                        setRestartSunEditor(true);
                        const newText = value.text ? value.text : '';
                        setText(newText);
                        setTimeout(() => {
                            setRestartSunEditor(false);
                        }, 500);
                    }}
                />
            </Col>
            <Col span={24}>
                <Modal
                    style={{ top: 20 }}
                    title={
                        <Row gutter={[0, 30]} className="mb-5">
                            <Col md={24}>
                                <p>Galeria de Imagens</p>
                            </Col>
                            <Col md={24}>
                                {startOptionsGallery().map((value, index) => {
                                    const tag = value.tag;
                                    return (
                                        <Radio.Button
                                            key={index}
                                            checked={
                                                tags.filter(
                                                    (value) => value === tag
                                                ).length !== 0
                                            }
                                            onClick={() => {
                                                selectButtom(tag);
                                            }}
                                            value={value.tag}
                                        >
                                            {value.tag}
                                        </Radio.Button>
                                    );
                                })}
                            </Col>
                            <Divider />
                        </Row>
                    }
                    width="100%"
                    open={isModalOpen}
                    onCancel={handleOk}
                    footer={[
                        <Button key="back" onClick={handleOk}>
                            Sair
                        </Button>
                    ]}
                >
                    <div style={{ height: 400, overflow: 'auto' }}>
                        <Row justify={'center'} gutter={[0, 50]}>
                            {startGallery().map((value, index) => {
                                return (
                                    <Col
                                        md={7}
                                        key={index}
                                        className="text-center"
                                    >
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={
                                                <Image
                                                    src={value.src}
                                                    style={{
                                                        alignItems: 'center'
                                                    }}
                                                />
                                            }
                                        >
                                            <Meta
                                                title={value.tag}
                                                description={
                                                    <Row className="w-100">
                                                        <Col span={24}>
                                                            {value.alt}
                                                        </Col>
                                                        <Col md={24}>
                                                            <Button
                                                                type="default"
                                                                size="large"
                                                                title="Selecionar"
                                                                onClick={() => {
                                                                    setValues({
                                                                        ...values,
                                                                        url: value.src
                                                                    });
                                                                    handleOk();
                                                                }}
                                                            >
                                                                <strong>
                                                                    Selecionar
                                                                </strong>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                }
                                            ></Meta>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Modal>
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

        const isYoutube = verifyUrl.isYoutubeVideo(values.url);

        if (values.contentType === 'video' && !isYoutube) {
            messageApi.open({
                key: 'content.registration',
                type: 'error',
                content: 'O video tem que ser do youtube.',
                duration: 7
            });
            return;
        }
        setLoading(true);

        const dataValues: ContentData = {
            title: values.title,
            subTitle: values.subTitle,
            text: text,
            tag: values.tag,
            visible: String(values.visible) as any,
            contentType: values.contentType,
            url: values.contentType !== 'text' ? values.url : undefined
        };

        let request: any;

        if (!values.id) {
            request = await ContentController.store(dataValues);
        } else {
            request = await ContentController.patch(
                {
                    ...dataValues
                },
                values.id
            );
        }

        const error = request.error;

        const message = request.message;

        const type = error ? 'error' : 'success';

        setRestartSunEditor(true);

        setTimeout(() => {
            messageApi.open({
                key: 'content.registration',
                type: type,
                content: message,
                duration: 7
            });
            setLoading(false);
            if (!error) {
                handleReset();
                setRestartSunEditor(false);
            }
        }, 1000);
    }

    function startGallery() {
        const options: any[] = [...tags];
        let newGallery: any[] = [];

        gallery.map((value) => {
            if (options.filter((option) => option === value.tag).length) {
                newGallery.push(value);
            }
        });
        if (!options.length) {
            newGallery = [...gallery];
        }

        return newGallery;
    }

    function startOptionsGallery() {
        const options: any[] = [];

        gallery.map((value) => {
            if (!options.filter((option) => option.tag === value.tag).length) {
                options.push(value);
            }
        });

        return options.sort((a, b) =>
            a.tag.toUpperCase().localeCompare(b.tag.toUpperCase())
        );
    }

    function selectButtom(valueTag: string) {
        const haveTag = tags.filter((tag) => tag === valueTag);
        const list = [...tags];
        if (haveTag.length) {
            const remove = list.indexOf(valueTag);
            list.splice(remove, 1);
            setTags(list);
            return;
        }
        setTags([...tags, valueTag]);
    }
};
