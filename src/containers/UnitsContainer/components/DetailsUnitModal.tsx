import { Modal, Form, Input, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import ICompany from '../../../types/Company';
import IUnit from '../../../types/Unit';

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
    const [companies, setCompanies] = useState<ICompany[]>();

    React.useEffect(() => {
        form.setFieldsValue(selectedUnit);
    }, [form, selectedUnit]);

    useEffect(() => {
        async function getCompanies() {
            const response = await api.get('/companies');
            if (response.status !== 200) {
                message.error(response.statusText);
            }
            setCompanies(response.data);
        }
        getCompanies();
    }, []);

    const onHandleOkModal = async () => {
        const { id, name, companyId } = form.getFieldsValue();
        setConfirmLoading(true);
        const response = await api.put(`/units/${id}`, { name, companyId });
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

export default DetailUnitModal;
