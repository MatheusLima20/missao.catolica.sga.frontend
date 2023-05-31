import React, { useState } from 'react';
import {
    Button,
    Col,
    Form,
    Input,
    message,
    Modal,
    Row,
    Select,
    UploadFile,
    UploadProps
} from 'antd';
import { Content } from '../../../../types/content/content';
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { ContentController } from '../../../../controller/content/content.controller';

type InitialValues = {
    title?: string;
    subTitle?: string;
    video?: string;
    path?: string;
    fileName?: string;
    imageUrl?: string;
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
    page: '',
    contentType: 'text',
    imageUrl: undefined,
    video: undefined
};

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const HomeForm = () => {
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
        const element = document.getElementById('form') as any;
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

    const props: UploadProps = {
        maxCount: 1,
        fileList: fileList,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: () => {
            return false;
        }
    };

    return (
        <Row>
            {contextHolder}
            <Col span={24} className="mb-5">
                <Form
                    id="form"
                    layout="vertical"
                    size="large"
                    requiredMark={false}
                    initialValues={initialValues}
                    fields={[
                        { name: 'title', value: values.title },
                        { name: 'subTitle', value: values.subTitle },
                        { name: 'contentType', value: values.contentType }
                    ]}
                    onFinish={save}
                >
                    <Row justify={'center'} gutter={[20, 0]}>
                        <Col md={8}>
                            <Form.Item label="Titulo" name="title">
                                <Input
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    placeholder="Digite seu titulo..."
                                />
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item label="SubTítulo" name="subTitle">
                                <Input
                                    name="subTitle"
                                    value={values.subTitle}
                                    onChange={handleChange}
                                    placeholder="Digite seu subtítulo..."
                                />
                            </Form.Item>
                        </Col>
                        <Col md={8}>
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
                                                name: 'contentType',
                                                value: value
                                            }
                                        };
                                        handleChange(event);
                                    }}
                                    options={[
                                        { value: 'text', label: 'Texto' },
                                        { value: 'slider', label: 'Slider' }
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                        {values.contentType === 'text' && (
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
                                    <TextArea
                                        rows={7}
                                        name="text"
                                        placeholder="Digite seu texto..."
                                        maxLength={2500}
                                        showCount={true}
                                    />
                                </Form.Item>
                            </Col>
                        )}

                        {values.contentType === 'slider' && (
                            <Col md={24}>
                                <Form.Item label="Imagem" name="file">
                                    <Dragger
                                        {...props}
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
                                            Clique ou arraste a imagem para a
                                            área de upload.
                                        </p>
                                        <p className="ant-upload-hint">
                                            Envie arquivos imagens com menos de
                                            5Mb, e resolução de 1366 X 768
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
                        )}

                        <Col md={24} className="mt-5">
                            <Row justify={'center'}>
                                <Col md={4} className="text-center">
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
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );

    async function save() {
        if (values.contentType === 'slider' && !fileList.length) {
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
            subTitle: values.subTitle,
            text: values.text,
            page: 'home',
            contentType: values.contentType
        };

        const request = await ContentController.store(dataValues, fileList[0]);

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
