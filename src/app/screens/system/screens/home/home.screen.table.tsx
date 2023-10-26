import {
    Button,
    Col,
    DatePicker,
    DatePickerProps,
    Input,
    InputRef,
    Row,
    Space,
    Table,
    TableProps
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { ContentController } from '../../../../controller/content/content.controller';
import { Content } from 'antd/es/layout/layout';
import {
    ColumnType,
    ColumnsType,
    FilterConfirmProps,
    SorterResult
} from 'antd/es/table/interface';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
import { ContentData } from '../../../../types/content/content';
import locale from 'antd/es/date-picker/locale/pt_BR';

interface DataType {
    key: number;
    id: number;
    title: string;
    subTitle: string;
    video?: string;
    fileName?: string;
    url?: string;
    text: string;
    page: string;
    contentType: string;
    createdAt: string;
}

type DataIndex = keyof DataType;

interface Props {
    getRowValues: (values: any) => any;
    loading: boolean;
}

export const HomeScreenTable = (props: Props) => {
    const [content, setContent] = useState<ContentData[]>([]);
    const [date, setDate] = useState('');

    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({
        order: 'ascend',
        columnKey: 'userName'
    });

    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        dataIndex: DataIndex
    ) => {
        confirm();
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex,
        title: string
    ): ColumnType<DataType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close
        }) => (
            <div style={{ padding: 10 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Pesquisar ${title}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<AiOutlineSearch size={20} />}
                        size="middle"
                        style={{ width: 90 }}
                    >
                        Pesquisar
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Limpar
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Fechar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        }
    });

    const columns: ColumnsType<DataType> = [
        {
            key: 'title',
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => {
                return a.title.localeCompare(b.title);
            },
            sortOrder:
                sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('title', 'Titulo')
        },
        {
            key: 'subTitle',
            title: 'SubTitulo',
            dataIndex: 'subTitle',
            sorter: (a, b) => {
                return a.subTitle.localeCompare(b.subTitle);
            },
            sortOrder:
                sortedInfo.columnKey === 'subTitle' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('subTitle', 'Sub Titulo')
        },
        {
            key: 'page',
            title: 'Pagina',
            dataIndex: 'page',
            sorter: (a, b) => {
                return a.page.localeCompare(b.page);
            },
            sortOrder:
                sortedInfo.columnKey === 'page' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('page', 'Página')
        },
        {
            key: 'contentType',
            title: 'Tipo',
            dataIndex: 'contentType',
            sorter: (a, b) => {
                return a.contentType.localeCompare(b.contentType);
            },
            sortOrder:
                sortedInfo.columnKey === 'contentType'
                    ? sortedInfo.order
                    : null,
            ellipsis: true,
            ...getColumnSearchProps('contentType', 'Tipo de Conteudo')
        },
        {
            key: 'action',
            title: 'Ações',
            render: (record: DataType) => (
                <Space size="middle">
                    <Button
                        href="#form"
                        title="Editar"
                        onClick={() => {
                            props.getRowValues({
                                id: record.id,
                                title: record.title,
                                text: record.text,
                                subTitle: record.subTitle,
                                contentType: record.contentType,
                                page: record.page,
                                url: record.url
                            } as DataType);
                        }}
                    >
                        <FiEdit size={20} />
                    </Button>
                </Space>
            )
        }
    ];

    const handleChange: TableProps<DataType>['onChange'] = (
        pagination,
        filters,
        sorter
    ) => {
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(dateString);
    };

    useEffect(() => {
        const getArticles = async () => {
            const request = await ContentController.get(date);

            const data: ContentData[] = request.data;

            if (data) {
                setContent(data);
            }
        };

        getArticles();
    }, [date, props.loading]);

    return (
        <Content>
            <Row justify={'center'}>
                <Col>
                    <DatePicker
                        onChange={onChange}
                        picker="month"
                        locale={locale}
                    />
                </Col>

                <Col span={24} className="mt-5">
                    <Table
                        columns={columns}
                        dataSource={initTable()}
                        onChange={handleChange}
                        pagination={{
                            pageSize: 5,
                            showTotal: () => (
                                <div className="text-black">
                                    <strong>Conteúdos: {content.length}</strong>
                                </div>
                            ),
                            pageSizeOptions: [5, 10, 20]
                        }}
                        scroll={{ y: 520 }}
                    />
                </Col>
            </Row>
        </Content>
    );

    function initTable(): DataType[] {
        const valuesData = content;

        const values: DataType[] = [];

        valuesData.map((value, index) => {
            return values.push({
                key: index,
                id: value.id as any,
                title: value.title as any,
                subTitle: value.subTitle as any,
                text: value.text as any,
                contentType: value.contentType,
                page: value.page as any,
                fileName: value.fileName as any,
                url: value.url,
                video: value.video,
                createdAt: value.createdAt as any
            });
        });

        return values;
    }
};
