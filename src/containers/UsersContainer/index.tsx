import React, { useEffect, useState } from 'react';
import { Col, message } from 'antd';
import api from '../../services/api';
import IUser from '../../types/User';
import DetailUserModal from './components/DetailsUserModal';
import UsersTable from './components/UsersTable';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>();
    const [selectedUser, setSelectedUser] = useState<IUser>();
    const [showSeeModal, setShowSeeModal] = useState(false);
    useEffect(() => {
        async function getUsers() {
            const response = await api.get('/users');
            if (response.status !== 200) {
                message.error(response.statusText);
            }
            setUsers(response.data);
        }
        getUsers();
    }, []);
    const onHandleSelectedUser = (user: IUser) => {
        setSelectedUser(user);
        setShowSeeModal(!showSeeModal);
    };

    const onHandleDeleteModel = async (id: number) => {
        const response = await api.delete(`/users/${id}`);
        if (response.status !== 200) {
            message.error(response.statusText);
        }
    };

    return (
        <>
            {selectedUser && (
                <DetailUserModal
                    selectedUser={selectedUser}
                    setShowSeeModal={() => setShowSeeModal(!showSeeModal)}
                    showSeeModal={showSeeModal}
                />
            )}
            {users && (
                <Col>
                    <h1>Lista de Usuários</h1>
                    <UsersTable
                        users={users}
                        onHandleDeleteModel={onHandleDeleteModel}
                        onHandleSelectedUser={onHandleSelectedUser}
                    />
                </Col>
            )}
        </>
    );
};

export default UsersPage;
