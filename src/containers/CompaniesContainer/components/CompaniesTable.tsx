import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react';
import ICompany from '../../../types/Company';

interface ICompaniesTableProps {
    onHandleSelectedCompany: (record: ICompany) => void;
    onHandleDeleteModel: (id: number) => void;
    companies: ICompany[];
}

const CompaniesTable = ({
    onHandleSelectedCompany,
    onHandleDeleteModel,
    companies,
}: ICompaniesTableProps): JSX.Element => {
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
            title: 'Ações',
            dataIndex: '',
            key: 'x',
            render: (text: string, record: ICompany) => (
                <Space size="middle">
                    <Button onClick={() => onHandleSelectedCompany(record)}>
                        Ver
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja cancelar essa empresa?"
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
            loading={!companies?.length}
            dataSource={companies}
            size="small"
            pagination={false}
            scroll={{ y: '50vh' }}
        />
    );
};

export default CompaniesTable;
