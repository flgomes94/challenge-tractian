import { Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import api from '../../../services/api';
import IUser from '../../../types/User';

interface IDetailUserModalProps {
    selectedUser: IUser;
    showSeeModal: boolean;
    setShowSeeModal: () => void;
}

const DetailUserModal = ({
    selectedUser,
    showSeeModal,
    setShowSeeModal,
}: IDetailUserModalProps): JSX.Element => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    React.useEffect(() => {
        form.setFieldsValue(selectedUser);
    }, [form, selectedUser]);

    const onHandleOkModal = async () => {
        const { id, name, email, companyId, unitId } = form.getFieldsValue();
        setConfirmLoading(true);
        await api.put(`/users/${id}`, { name, email, companyId, unitId });
        setConfirmLoading(false);
        setShowSeeModal();
    };

    const onFinishFailed = () => {
        return null;
    };

    const onFinish = () => {
        return null;
    };

    return (
        <>
            <Modal
                visible={showSeeModal}
                onCancel={() => setShowSeeModal()}
                confirmLoading={confirmLoading}
                onOk={onHandleOkModal}
                destroyOnClose
                cancelText="Cancelar"
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        id: selectedUser?.id || '',
                        name: selectedUser?.name || '',
                        email: selectedUser?.email || '',
                        unitId: selectedUser?.unitId || '',
                        companyId: selectedUser?.companyId || '',
                    }}
                >
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Nome" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
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
        </>
    );
};

export default DetailUserModal;
