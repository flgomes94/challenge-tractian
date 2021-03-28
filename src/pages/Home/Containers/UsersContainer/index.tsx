import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import api from '../../../../services/api';
import IUser from '../../../../types/User';
import DetailUserModal from './components/DetailsUserModal';

const UsersPage = (): JSX.Element => {
    const [users, setUsers] = useState<IUser[]>();
    const [selectedUser, setSelectedUser] = useState<IUser>();
    const [showSeeModal, setShowSeeModal] = useState(false);
    useEffect(() => {
        async function getUsers() {
            const newUsers = await api.get('/users');
            setUsers(newUsers.data);
        }
        getUsers();
    }, []);
    const onHandleSelectedUser = (user: IUser) => {
        setSelectedUser(user);
        setShowSeeModal(!showSeeModal);
    };

    const onHandleDeleteModel = async (id: number) => {
        await api.delete(`/users/${id}`);
    };
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
        <>
            {selectedUser && (
                <DetailUserModal
                    selectedUser={selectedUser}
                    setShowSeeModal={() => setShowSeeModal(!showSeeModal)}
                    showSeeModal={showSeeModal}
                />
            )}
            <h1>Lista de Usuários</h1>
            <Table
                columns={columns}
                loading={!users?.length}
                dataSource={users}
                size="small"
                pagination={false}
                scroll={{ y: '80vh' }}
            />
        </>
    );
};

export default UsersPage;
