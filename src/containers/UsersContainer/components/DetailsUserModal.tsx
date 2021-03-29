import { Modal, Form, Input, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import ICompany from '../../../types/Company';
import IUnit from '../../../types/Unit';
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

    const [units, setUnits] = useState<IUnit[]>();
    const [companies, setCompanies] = useState<ICompany[]>();

    React.useEffect(() => {
        form.setFieldsValue(selectedUser);
    }, [form, selectedUser]);

    useEffect(() => {
        async function getUnits() {
            const response = await api.get('/units');
            if (response.status !== 200) {
                message.error(response.statusText);
            }
            setUnits(response.data);
        }
        async function getCompanies() {
            const response = await api.get('/companies');
            if (response.status !== 200) {
                message.error(response.statusText);
            }
            setCompanies(response.data);
        }
        getUnits();
        getCompanies();
    }, []);

    const onHandleOkModal = async () => {
        const { id, name, email, companyId, unitId } = form.getFieldsValue();
        setConfirmLoading(true);
        const response = await api.put(`/users/${id}`, {
            name,
            email,
            companyId,
            unitId,
        });
        setConfirmLoading(false);
        setShowSeeModal();
        if (response.status !== 200) {
            message.error(response.statusText);
        }
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
                        <Select>
                            {units?.map((unit) => (
                                <Select.Option value={unit.id} key={unit.id}>
                                    {`${unit.id} - ${unit.name}`}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Empresa" name="companyId">
                        <Select>
                            {companies?.map((company) => (
                                <Select.Option
                                    value={company.id}
                                    key={company.id}
                                >
                                    {`${company.id} - ${company.name}`}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default DetailUserModal;
