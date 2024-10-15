import {
    Button,
    Col,
    Input,
    InputRef,
    Row,
    Space,
    Table,
    TableProps
} from 'antd';
import { useRef, useState } from 'react';
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
import dayjs from 'dayjs';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';

interface DataType {
    key: number;
    id: number;
    title: string;
    subTitle: string;
    visible: boolean;
    fileName?: string;
    url?: string;
    text: string;
    tag: string;
    viewsAmount?: number;
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
    const [search, setSearch] = useState('');

    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({
        order: 'ascend',
        columnKey: 'userName'
    });

    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        _selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _dataIndex: DataIndex
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
            fixed: 'left',
            title: 'Title',
            width: 220,
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
            width: 200,
            sorter: (a, b) => {
                return a.subTitle.localeCompare(b.subTitle);
            },
            sortOrder:
                sortedInfo.columnKey === 'subTitle' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('subTitle', 'Sub Titulo')
        },
        {
            key: 'tag',
            title: 'Tag',
            dataIndex: 'tag',
            width: 150,
            sorter: (a, b) => {
                return a.tag.localeCompare(b.tag);
            },
            sortOrder: sortedInfo.columnKey === 'tag' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('tag', 'Tag...')
        },
        {
            key: 'visible',
            title: 'Visivel',
            dataIndex: 'visible',
            width: 150,
            render: (visible: boolean) => {
                return (
                    <Row>
                        <Col>
                            {visible ? (
                                <BsFillEyeFill size={20} />
                            ) : (
                                <BsFillEyeSlashFill size={20} />
                            )}
                        </Col>
                    </Row>
                );
            }
        },
        {
            key: 'viewsAmount',
            title: 'Visualizações',
            dataIndex: 'viewsAmount',
            width: 150,
            sorter: (a, b) => {
                const viewA: number = a.viewsAmount ? a.viewsAmount : 0;
                const viewB: number = b.viewsAmount ? b.viewsAmount : 0;
                return viewA - viewB;
            }
        },
        {
            key: 'createdAt',
            title: 'Criado Em',
            dataIndex: 'createdAt',
            width: 200,
            sorter: (a, b) => {
                const dateA = a.createdAt
                    .substring(0, 9)
                    .split('/')
                    .reverse()
                    .join('-');

                const dateB = b.createdAt
                    .substring(0, 9)
                    .split('/')
                    .reverse()
                    .join('-');

                const dateNumberA = Number.parseInt(dateA.replaceAll('-', ''));
                const dateNumberB = Number.parseInt(dateB.replaceAll('-', ''));
                const result = dateNumberB - dateNumberA;
                return result;
            },
            sortOrder:
                sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('createdAt', 'Data')
        },
        {
            key: 'action',
            fixed: 'right',
            title: 'Ações',
            width: 200,
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
                                tag: record.tag,
                                visible: record.visible,
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
        _pagination,
        _filters,
        sorter
    ) => {
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    return (
        <Content>
            <Row justify={'center'}>
                <Col>
                    <Input
                        onChange={(value) => {
                            const text = value.target.value;
                            setSearch(text);
                        }}
                        suffix={
                            <Button onClick={getArticles}>
                                <IoSearchSharp size={20} />
                            </Button>
                        }
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
                        scroll={{ y: 520, x: 500 }}
                    />
                </Col>
            </Row>
        </Content>
    );

    async function getArticles() {
        if (search.length === 0) {
            return;
        }
        const request = await ContentController.get(search);

        const data: ContentData[] = request.data;

        if (data) {
            setContent(data);
        }
    }

    function initTable(): DataType[] {
        const valuesData = content;

        const values: DataType[] = [];

        valuesData.map((value, index) => {
            const title = value?.title ? value.title : '';
            const subTitle = value?.subTitle ? value.subTitle : '';
            const createdAt = dayjs(value.createdAt).format('DD/MM/YYYY');
            return values.push({
                key: index,
                id: value.id as any,
                title: title,
                subTitle: subTitle,
                text: value.text as any,
                contentType: value.contentType,
                visible: value.visible,
                tag: value.tag as any,
                fileName: value.fileName as any,
                viewsAmount: value.viewsAmount as any,
                url: value.url,
                createdAt: createdAt
            });
        });

        return values;
    }
};
