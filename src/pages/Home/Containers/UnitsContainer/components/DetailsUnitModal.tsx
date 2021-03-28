import { Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import api from '../../../../../services/api';
import IUnit from '../../../../../types/Unit';

interface IDetailUnitModalProps {
    selectedUnit: IUnit;
    showSeeModal: boolean;
    setShowSeeModal: () => void;
}

const DetailUnitModal = ({
    selectedUnit,
    showSeeModal,
    setShowSeeModal,
}: IDetailUnitModalProps): JSX.Element => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    React.useEffect(() => {
        form.setFieldsValue(selectedUnit);
    }, [form, selectedUnit]);

    const onHandleOkModal = async () => {
        const { id, name, companyId } = form.getFieldsValue();
        setConfirmLoading(true);
        await api.put(`/Units/${id}`, { name, companyId });
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
                        id: selectedUnit?.id || '',
                        name: selectedUnit?.name || '',
                        companyId: selectedUnit?.companyId || '',
                    }}
                >
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Nome" name="name">
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

export default DetailUnitModal;
