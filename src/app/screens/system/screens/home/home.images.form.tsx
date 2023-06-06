import React, { useState } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    Input,
    message,
    Modal,
    Row,
    UploadFile,
    UploadProps
} from 'antd';
import { Content, Gallery } from '../../../../types/content/content';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { ContentController } from '../../../../controller/content/content.controller';
import 'suneditor/dist/css/suneditor.min.css';
import Meta from 'antd/es/card/Meta';

type InitialValues = {
    title?: string;
    fileName?: string;
    contentType: string;
    id?: number;
};

const initialValues: InitialValues = {
    id: 0,
    title: undefined,
    fileName: undefined,
    contentType: ''
};

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface Props {
    gallery: Gallery[];
    onSave: () => void;
}

export const HomeImagesForm = (props: Props) => {
    const gallery = props.gallery;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [file, setFile] = useState<RcFile>();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [values, setValues] = useState(initialValues);
    const [messageApi, contextHolder] = message.useMessage();

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setValues({ ...values, [name]: value });
    };

    const handleReset = () => {
        const element = document.getElementById('form_img') as any;
        setValues({ ...initialValues });
        element.reset();
    };

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
        );
    };

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        const file = newFileList[0];
        if (file) {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error(
                    'Só é permitido imagens nos formatos JPG, JPEG e PNG!'
                );
                return;
            }
            const fileSize: any = file.size;
            const isLt2M = fileSize / 1024 / 1024 < 5;
            if (!isLt2M) {
                message.error('A imagem tem mais de 5MB!');
                return;
            }
        }
        setFileList(newFileList);
    };

    const uploadProps: UploadProps = {
        maxCount: 1,
        fileList: fileList,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFile(file);
            return false;
        }
    };

    return (
        <Row>
            {contextHolder}
            <Col span={24} className="mb-5">
                <Form
                    id="form_img"
                    layout="vertical"
                    size="large"
                    requiredMark={false}
                    autoComplete="on"
                    initialValues={initialValues}
                    fields={[
                        { name: 'title', value: values.title },
                        { name: 'contentType', value: values.contentType }
                    ]}
                    onFinish={save}
                >
                    <Row justify={'center'} gutter={[20, 0]}>
                        <Col md={12}>
                            <Form.Item
                                label="Titulo"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Digite o título.',
                                        max: 20,
                                        min: 3
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
                        <Col md={12}>
                            <Form.Item
                                label="Tipo"
                                name="contentType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Digite o tipo.',
                                        max: 20,
                                        min: 3
                                    }
                                ]}
                            >
                                <Input
                                    name="contentType"
                                    value={values.contentType}
                                    onChange={handleChange}
                                    placeholder="Digite seu tipo..."
                                />
                            </Form.Item>
                        </Col>

                        <Col md={24}>
                            <Form.Item label="Imagem" name="file">
                                <Dragger
                                    {...uploadProps}
                                    name="file"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={onChange}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Clique ou arraste a imagem para a área
                                        de upload.
                                    </p>
                                    <p className="ant-upload-hint">
                                        Envie arquivos imagens com menos de 5Mb,
                                        e resolução de 1366 X 768
                                    </p>
                                </Dragger>
                                <Modal
                                    open={previewOpen}
                                    title={previewTitle}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img
                                        alt="example"
                                        style={{ width: '100%' }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </Form.Item>
                        </Col>

                        <Col span={24} className="mt-5">
                            <Row justify={'center'} className="text-center">
                                <Col md={4}>
                                    <Button type="primary" htmlType="submit">
                                        <strong>Enviar</strong>
                                    </Button>
                                </Col>

                                <Col md={4}>
                                    <Button
                                        type="default"
                                        onClick={handleReset}
                                    >
                                        <strong>Limpar</strong>
                                    </Button>
                                </Col>
                                <Col md={4}>
                                    <Button
                                        type="default"
                                        onClick={() => {
                                            props.onSave();
                                            showModal();
                                        }}
                                    >
                                        <strong>Galeria</strong>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>

            <Col span={24}>
                <Modal
                    title="Galeria de Imagens"
                    width="100%"
                    open={isModalOpen}
                    onCancel={handleOk}
                    footer={[
                        <Button key="back" onClick={handleOk}>
                            Sair
                        </Button>
                    ]}
                >
                    <Row justify={'center'} gutter={[0, 50]}>
                        {gallery.map((value, index) => {
                            return (
                                <Col md={7} key={index} className="text-center">
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={
                                            <Image
                                                src={value.src}
                                                style={{ alignItems: 'center' }}
                                            />
                                        }
                                    >
                                        <Meta
                                            title={value.tag}
                                            description={value.alt}
                                        ></Meta>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Modal>
            </Col>
        </Row>
    );

    async function save() {
        if (values.contentType !== 'text' && !fileList.length) {
            messageApi.open({
                key: 'platform.registration',
                type: 'error',
                content: 'Um arquivo precisa ser inserido!',
                duration: 7
            });
            return;
        }
        messageApi.open({
            key: 'content.registration',
            type: 'loading',
            content: 'Enviando...',
            duration: 7
        });

        const dataValues: Content = {
            title: values.title,
            contentType: values.contentType
        };

        const request = await ContentController.store(dataValues, file);

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
                setFileList([]);
            }
        }, 1000);
    }
};
