import {
    AlertOutlined,
    ArrowUpOutlined,
    DashboardOutlined,
    InfoCircleOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import {
    Col,
    Row,
    Card,
    Table,
    Tag,
    Progress,
    Space,
    Statistic,
    Tooltip,
    Modal,
    Button,
    Image,
    Form,
    Input,
} from 'antd';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { formatRelative } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';

interface IAsset {
    id: number;
    model: string;
    name: string;
    healthscore: number;
    image: string;
    companyId: number;
    unitId: number;
    status: 'inAlert' | 'inOperation' | 'inDowntime';
    specifications: {
        maxTemp: number;
        power: number;
        rpm: number;
    };
    metrics: {
        lastUptimeAt: string;
        totalUptime: number;
        totalCollectsUptime: number;
    };
}

const Status = (text: string) => {
    switch (text) {
        case 'inAlert':
            return ['Em alerta', 'red'];
        case 'inOperation':
            return ['Em operação', 'green'];
        case 'inDowntime':
            return ['Em queda', 'orange'];
        default:
            return ['Sem estado definido', 'red'];
    }
};

const HeathColor = (value: number) => {
    if (value < 50) {
        return 'red';
    }
    if (value < 70) {
        return '#f50';
    }
    return '#87d068';
};

const AssetsPage: React.FC = () => {
    const [assets, setAssets] = useState<IAsset[]>();
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<IAsset>();
    const [showSeeModal, setShowSeeModal] = useState(false);

    const onHandleSelectedAsset = (asset: IAsset) => {
        setSelectedAsset(asset);
        setShowSeeModal(!showSeeModal);
    };

    const onHandleDeleteModel = async (id: number) => {
        setDeleteLoading(true);
        await api.delete(`/assets/${id}`);
        setDeleteLoading(false);
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            sorter: (a: IAsset, b: IAsset) => a.id - b.id,
        },
        {
            title: 'Modelo',
            dataIndex: 'model',
            key: 'model',
            sorter: (a: IAsset, b: IAsset) => a.model.length - b.model.length,
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: IAsset, b: IAsset) => a.name.length - b.name.length,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a: IAsset, b: IAsset) =>
                (a.status ? a.status.length : 0) -
                (b.status ? b.status.length : 0),
            render: (text: string) => (
                <Tag color={Status(text)[1]}>{Status(text)[0]}</Tag>
            ),
        },
        {
            title: 'Saúde',
            dataIndex: 'healthscore',
            key: 'healthscore',
            sorter: (a: IAsset, b: IAsset) => a.healthscore - b.healthscore,
            render: (text: number) => (
                <Progress
                    percent={text}
                    showInfo={false}
                    steps={10}
                    strokeColor={HeathColor(text)}
                />
            ),
        },
        {
            title: 'Última atualização',
            sorter: (a: IAsset, b: IAsset) =>
                Number(a.metrics.lastUptimeAt) - Number(b.metrics.lastUptimeAt),
            render: (text: string, record: IAsset) => {
                return formatRelative(
                    new Date(record.metrics.lastUptimeAt),
                    new Date(),
                    { locale: ptBR },
                );
            },
        },
        {
            title: 'Ações',
            dataIndex: '',
            key: 'x',
            render: (text: string, record: any) => (
                <Space size="middle">
                    <Button onClick={() => onHandleSelectedAsset(record)}>
                        Ver
                    </Button>
                    <Button onClick={() => onHandleDeleteModel(record.id)}>
                        Deletar
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        async function getAssets() {
            const newAssets = await api.get('/assets');
            setAssets(newAssets.data);
        }
        getAssets();
    }, []);
    const healthPercentageByValue = (value: number) =>
        assets?.length
            ? (_.filter(assets, (asset) => asset.healthscore > value).length /
                  assets.length) *
              100
            : 0;

    const assetsByStatus = (status: 'inAlert' | 'inOperation' | 'inDowntime') =>
        assets?.length
            ? _.filter(assets, (asset) => asset.status === status).length
            : 0;

    const maxAssetByTemperature = _.maxBy(
        assets,
        (asset) => asset.specifications.maxTemp,
    );
    const maxAssetByPower = _.maxBy(
        assets,
        (asset) => asset.specifications.power,
    );

    const minAssetByRPM = _.minBy(assets, (asset) => asset.specifications.rpm);
    const onFinish = () => {
        return null;
    };

    const onFinishFailed = () => {
        return null;
    };

    const onHandleOkModal = async () => {
        const { id, name, model, companyId, unitId } = form.getFieldsValue();
        setConfirmLoading(true);
        await api.put(`/assets/${id}`, { name, model, companyId, unitId });
        setConfirmLoading(false);
        setShowSeeModal(!showSeeModal);
    };
    return (
        <>
            <Modal
                visible={showSeeModal}
                onCancel={() => setShowSeeModal(!showSeeModal)}
                confirmLoading={confirmLoading}
                onOk={onHandleOkModal}
                destroyOnClose
                cancelText="Cancelar"
            >
                <Image width="auto" src={selectedAsset?.image || ''} />
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        id: selectedAsset?.id || '',
                        model: selectedAsset?.model || '',
                        name: selectedAsset?.name || '',
                        unitId: selectedAsset?.unitId || '',
                        companyId: selectedAsset?.companyId || '',
                    }}
                >
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Modelo" name="model">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nome" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Unidade" name="unitId">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Empresa" name="companyId">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title={
                                <Tooltip title="Porcentagem de ativos que estão com estado de saúde acima de 70%">
                                    <span>Em perfeito estado</span>{' '}
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                            loading={!assets?.length}
                            value={healthPercentageByValue(70)}
                            precision={2}
                            valueStyle={{ color: '#52c41a' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title={
                                <Tooltip title="Temperatura mais alta registrada entre os ativos cadastrados">
                                    <span>Temperatura mais alta</span>{' '}
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                            value={
                                maxAssetByTemperature?.specifications.maxTemp ||
                                0
                            }
                            loading={!assets?.length}
                            suffix="ºC"
                            valueStyle={{ color: '#fadb14' }}
                            prefix={<AlertOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title={
                                <Tooltip title="Potência mais alta registrada entre os ativos cadastrados">
                                    <span>Potência mais alta</span>{' '}
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                            suffix="kWh"
                            value={maxAssetByPower?.specifications.power || 0}
                            loading={!assets?.length}
                            valueStyle={{ color: '#f5222d' }}
                            prefix={<DashboardOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title={
                                <Tooltip title="RPM mais alto registrado entre os ativos cadastrados">
                                    <span>RPM mais alto</span>{' '}
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                            suffix="RPM"
                            value={minAssetByRPM?.specifications.rpm || 0}
                            loading={!assets?.length}
                            valueStyle={{ color: '#52c41a' }}
                            prefix={<ReloadOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col flex={1}>
                    <Card
                        style={{
                            maxHeight: '50vh',
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                    >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: 0,
                                    plotShadow: false,
                                    height: 200,
                                },
                                title: {
                                    text: 'Estatísticas',
                                },
                                tooltip: {
                                    pointFormat:
                                        '{series.name}: <b>{point.percentage:.1f}%</b>',
                                },
                                series: [
                                    {
                                        type: 'pie',
                                        name: 'Ativos',
                                        data: [
                                            [
                                                'Em Alerta',
                                                assetsByStatus('inAlert'),
                                            ],
                                            [
                                                'Desligados',
                                                assetsByStatus('inDowntime'),
                                            ],
                                            [
                                                'Em Operação',
                                                assetsByStatus('inOperation'),
                                            ],
                                            [
                                                'Desconhecidos',
                                                assets?.length
                                                    ? assets?.length -
                                                      assetsByStatus(
                                                          'inAlert',
                                                      ) -
                                                      assetsByStatus(
                                                          'inDowntime',
                                                      ) -
                                                      assetsByStatus(
                                                          'inOperation',
                                                      )
                                                    : 0,
                                            ],
                                        ],
                                    },
                                ],
                            }}
                        />
                    </Card>
                </Col>
            </Row>
            <Table
                scroll={{ y: '30vh' }}
                pagination={false}
                loading={!assets}
                size="small"
                dataSource={assets}
                columns={columns}
            />
        </>
    );
};

export default AssetsPage;
