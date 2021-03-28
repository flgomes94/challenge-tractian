import { Modal, Form, Image, Input, Select } from 'antd';
import React, { useState } from 'react';
import api from '../../../services/api';
import IAsset from '../../../types/Asset';
import ICompany from '../../../types/Company';
import IUnit from '../../../types/Unit';

interface IDetailAssetModalProps {
    selectedAsset: IAsset;
    showSeeModal: boolean;
    setShowSeeModal: () => void;
}

const DetailAssetModal = ({
    selectedAsset,
    showSeeModal,
    setShowSeeModal,
}: IDetailAssetModalProps): JSX.Element => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    React.useEffect(() => {
        form.setFieldsValue(selectedAsset);
    }, [form, selectedAsset]);

    const onHandleOkModal = async () => {
        const { id, name, model, companyId, unitId } = form.getFieldsValue();
        setConfirmLoading(true);
        await api.put(`/assets/${id}`, { name, model, companyId, unitId });
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
                forceRender
                cancelText="Cancelar"
            >
                <Image width="auto" src={selectedAsset?.image || ''} />
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed}
                    preserve={false}
                >
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Modelo" name="model">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nome" name="name">
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

export default DetailAssetModal;
