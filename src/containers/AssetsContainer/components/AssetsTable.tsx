import React, { useState } from 'react';
import { Button, Popconfirm, Progress, Space, Table, Tag } from 'antd';
// eslint-disable-next-line import/no-duplicates
import { formatRelative } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ptBR } from 'date-fns/locale';

import Status from '../../../helpers/Status';
import IAsset from '../../../types/Asset';
import api from '../../../services/api';

interface IAssetsTableProps {
    assets: IAsset[];
    onHandleSelectedAsset: (asset: IAsset) => void;
}

const AssetsTable = ({
    assets,
    onHandleSelectedAsset,
}: IAssetsTableProps): JSX.Element => {
    const HeathColor = (value: number): string => {
        if (value < 50) {
            return '#f5222d';
        }
        if (value < 70) {
            return '#fa8c16';
        }
        return '#52c41a';
    };

    const onHandleDeleteModel = async (id: number) => {
        await api.delete(`/assets/${id}`);
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
            title: 'Sensores',
            width: 150,
            dataIndex: 'sensors',
            key: 'sensors',
            sorter: (a: IAsset, b: IAsset) =>
                a.sensors.length - b.sensors.length,
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
            title: 'Últ. Atualização',
            width: 100,
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
            render: (text: string, record: IAsset) => (
                <Space size="middle">
                    <Button onClick={() => onHandleSelectedAsset(record)}>
                        Ver
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja cancelar esse ativo?"
                        okText="Sim"
                        cancelText="Cancelar"
                        onConfirm={() => onHandleDeleteModel(record.id)}
                    >
                        <Button>Deletar</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <Table
            scroll={{ y: '30vh' }}
            pagination={false}
            loading={!assets}
            size="small"
            dataSource={assets}
            columns={columns}
        />
    );
};

export default AssetsTable;
