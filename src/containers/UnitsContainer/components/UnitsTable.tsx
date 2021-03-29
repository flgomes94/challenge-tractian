import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react';
import IUnit from '../../../types/Unit';

interface IUnitsTableProps {
    onHandleSelectedUnit: (record: IUnit) => void;
    onHandleDeleteModel: (id: number) => void;
    units: IUnit[];
}

const UnitsTable = ({
    onHandleSelectedUnit,
    onHandleDeleteModel,
    units,
}: IUnitsTableProps): JSX.Element => {
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Empresa',
            dataIndex: 'companyId',
            key: 'companyId',
        },
        {
            title: 'Ações',
            dataIndex: '',
            key: 'x',
            render: (text: string, record: IUnit) => (
                <Space size="middle">
                    <Button onClick={() => onHandleSelectedUnit(record)}>
                        Ver
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja cancelar essa unidade?"
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
            columns={columns}
            loading={!units?.length}
            dataSource={units}
            size="small"
            pagination={false}
            scroll={{ y: '50vh' }}
        />
    );
};

export default UnitsTable;
