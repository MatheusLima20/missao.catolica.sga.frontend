import { useState } from 'react';
import { Alert, Button, Card, Col, Form, Input, message, Row } from 'antd';
import { UserController } from '../../../../controller/user/user.controller';
import { BiUserCircle } from 'react-icons/bi';
import { MdEmail, MdLock, MdLockOutline } from 'react-icons/md';
import { companyCPFCNPJ } from '../../../../util/platform.number/platform.number';
import { FiAlertTriangle } from 'react-icons/fi';

type InitialValues = {
    userName: string;
    email: string;
    password: string;
    passwordRepeated: string;
};

const initialValues: InitialValues = {
    userName: '',
    email: '',
    password: '',
    passwordRepeated: ''
};

export const RegisterFormScreen = () => {
    const [values, setValues] = useState(initialValues);
    const [messageApi, contextHolder] = message.useMessage();

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setValues({ ...values, [name]: value });
    };

    const handleReset = () => {
        const element = document.getElementById('form_register') as any;
        setValues({ ...initialValues });
        element.reset();
    };

    return (
        <Row justify={'center'}>
            <Col md={20}>
                <Card className="border-0 shadow-lg p-3 mb-5 mt-5 rounded">
                    <Row justify={'center'} gutter={[0, 30]}>
                        {contextHolder}
                        <Col span={20}>
                            <Alert
                                message={
                                    <Row
                                        justify={'center'}
                                        className="m-2 text-center"
                                    >
                                        <Col span={20}>
                                            <h4>
                                                <p>
                                                    {
                                                        <FiAlertTriangle
                                                            style={{
                                                                color: '#cba135'
                                                            }}
                                                            size={70}
                                                        />
                                                    }
                                                    <br />
                                                    <strong>Atenção!</strong>
                                                </p>
                                            </h4>
                                            <p>
                                                <strong>
                                                    A sua aprovação ficará
                                                    sujeita a aprovação de
                                                    nossos ADMs. Então a
                                                    realização do login não
                                                    ocorrerá de forma imediata.
                                                </strong>
                                            </p>
                                        </Col>
                                    </Row>
                                }
                                type="warning"
                            />
                        </Col>
                        <Col md={22} className="mb-5">
                            <Form
                                id="form_register"
                                layout="vertical"
                                size="large"
                                requiredMark={false}
                                autoComplete="on"
                                initialValues={initialValues}
                                fields={[
                                    {
                                        name: 'userName',
                                        value: values.userName
                                    },
                                    { name: 'email', value: values.email },
                                    {
                                        name: 'password',
                                        value: values.password
                                    },
                                    {
                                        name: 'passwordRepeated',
                                        value: values.passwordRepeated
                                    }
                                ]}
                                onFinish={save}
                            >
                                <Row justify={'center'} gutter={[20, 0]}>
                                    <Col md={12}>
                                        <Form.Item
                                            label="Nome"
                                            name="userName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Digite o seu nome!',
                                                    max: 30,
                                                    min: 5
                                                }
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <BiUserCircle size={30} />
                                                }
                                                name="userName"
                                                value={values.email}
                                                onChange={handleChange}
                                                placeholder="Digite seu nome..."
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'email',
                                                    message:
                                                        'Digite um email valido!'
                                                }
                                            ]}
                                        >
                                            <Input
                                                prefix={<MdEmail size={30} />}
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                placeholder="Digite seu email..."
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Item
                                            label="Senha"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Digite uma senha valida!',
                                                    max: 30,
                                                    min: 6
                                                }
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={
                                                    <MdLockOutline size={30} />
                                                }
                                                name="password"
                                                value={values.email}
                                                onChange={handleChange}
                                                placeholder="Digite sua senha..."
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item
                                            label="Repeta Senha"
                                            name="passwordRepeated"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Digite uma senha valida!'
                                                }
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<MdLock size={30} />}
                                                name="passwordRepeated"
                                                value={values.email}
                                                onChange={handleChange}
                                                placeholder="Digite sua senha..."
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24} className="mt-5">
                                        <Row
                                            justify={'center'}
                                            className="text-center"
                                        >
                                            <Col md={4}>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                >
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
                </Card>
            </Col>
        </Row>
    );

    async function save() {
        messageApi.open({
            key: 'register',
            type: 'loading',
            content: 'Enviando...',
            duration: 7
        });

        const dataValues: any = {
            ...values,
            platformCPFCNPJ: companyCPFCNPJ
        };

        const request = await UserController.storeEditor(dataValues);

        const error = request.error;

        const message = request.message;

        const type = error ? 'error' : 'success';

        setTimeout(() => {
            messageApi.open({
                key: 'register',
                type: type,
                content: message,
                duration: 7
            });
            if (!error) {
                handleReset();
                setTimeout(() => {
                    location.href = '/';
                }, 3000);
            }
        }, 3000);
    }
};
