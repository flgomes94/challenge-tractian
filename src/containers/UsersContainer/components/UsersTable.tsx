import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react';
import IUser from '../../../types/User';

interface IUsersTableProps {
    onHandleSelectedUser: (record: IUser) => void;
    onHandleDeleteModel: (id: number) => void;
    users: IUser[];
}

const UsersTable = ({
    onHandleSelectedUser,
    onHandleDeleteModel,
    users,
}: IUsersTableProps) => {
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Unidade ',
            dataIndex: 'unitId',
            key: 'unitId',
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
            render: (text: string, record: IUser) => (
                <Space size="middle">
                    <Button onClick={() => onHandleSelectedUser(record)}>
                        Ver
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja cancelar esse usuário?"
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
            loading={!users?.length}
            dataSource={users}
            size="small"
            pagination={false}
            scroll={{ y: '50vh' }}
        />
    );
};

export default UsersTable;
