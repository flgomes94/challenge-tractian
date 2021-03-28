import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import api from '../../../../services/api';

import ICompany from '../../../../types/Company';
import DetailsCompanyModal from './components/DetailsCompanyModal';

const CompaniesPage = (): JSX.Element => {
    const [companies, setCompanies] = useState<ICompany[]>();
    const [selectedCompany, setSelectedCompany] = useState<ICompany>();
    const [showSeeModal, setShowSeeModal] = useState(false);
    useEffect(() => {
        async function getCompanies() {
            const newCompanies = await api.get('/companies');
            setCompanies(newCompanies.data);
        }
        getCompanies();
    }, []);
    const onHandleSelectedCompany = (company: ICompany) => {
        setSelectedCompany(company);
        setShowSeeModal(!showSeeModal);
    };

    const onHandleDeleteModel = async (id: number) => {
        await api.delete(`/companies/${id}`);
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
            title: 'Ações',
            dataIndex: '',
            key: 'x',
            render: (text: string, record: ICompany) => (
                <Space size="middle">
                    <Button onClick={() => onHandleSelectedCompany(record)}>
                        Ver
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja cancelar essa empresa?"
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
            {selectedCompany && (
                <DetailsCompanyModal
                    selectedCompany={selectedCompany}
                    setShowSeeModal={() => setShowSeeModal(!showSeeModal)}
                    showSeeModal={showSeeModal}
                />
            )}
            <h1>Lista de Empresas</h1>
            <Table
                columns={columns}
                loading={!companies?.length}
                dataSource={companies}
                size="small"
                pagination={false}
                scroll={{ y: '80vh' }}
            />
        </>
    );
};

export default CompaniesPage;
