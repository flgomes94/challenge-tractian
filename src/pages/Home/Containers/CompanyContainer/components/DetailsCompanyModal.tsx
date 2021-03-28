import { Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import api from '../../../../../services/api';
import ICompany from '../../../../../types/Company';

interface IDetailCompanyModalProps {
    selectedCompany: ICompany;
    showSeeModal: boolean;
    setShowSeeModal: () => void;
}

const DetailsCompanyModal = ({
    selectedCompany,
    showSeeModal,
    setShowSeeModal,
}: IDetailCompanyModalProps): JSX.Element => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    React.useEffect(() => {
        form.setFieldsValue(selectedCompany);
    }, [form, selectedCompany]);

    const onHandleOkModal = async () => {
        const { id, name } = form.getFieldsValue();
        setConfirmLoading(true);
        await api.put(`/companies/${id}`, { name, id });
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
                        id: selectedCompany?.id || '',
                        name: selectedCompany?.name || '',
                    }}
                >
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Nome" name="name">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default DetailsCompanyModal;
