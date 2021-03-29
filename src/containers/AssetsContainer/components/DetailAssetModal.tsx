import { Modal, Form, Image, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
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
    const [units, setUnits] = useState<IUnit[]>();
    const [companies, setCompanies] = useState<ICompany[]>();
    useEffect(() => {
        form.setFieldsValue(selectedAsset);
    }, [form, selectedAsset]);

    useEffect(() => {
        async function getUnits() {
            const newUnits = await api.get('/units');
            setUnits(newUnits.data);
        }
        async function getCompanies() {
            const newCompanies = await api.get('/companies');
            setCompanies(newCompanies.data);
        }
        getUnits();
        getCompanies();
    }, []);

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

export default DetailAssetModal;
