import React, { useEffect, useState } from 'react';
import { Col, message } from 'antd';
import api from '../../services/api';

import ICompany from '../../types/Company';
import DetailsCompanyModal from './components/DetailsCompanyModal';
import CompaniesTable from './components/CompaniesTable';

const CompaniesPage = (): JSX.Element => {
    const [companies, setCompanies] = useState<ICompany[]>();
    const [selectedCompany, setSelectedCompany] = useState<ICompany>();
    const [showSeeModal, setShowSeeModal] = useState(false);
    useEffect(() => {
        async function getCompanies() {
            const response = await api.get('/companies');
            setCompanies(response.data);
            if (response.status !== 200) {
                message.error(response.statusText);
            }
        }
        getCompanies();
    }, []);
    const onHandleSelectedCompany = (company: ICompany) => {
        setSelectedCompany(company);
        setShowSeeModal(!showSeeModal);
    };

    const onHandleDeleteModel = async (id: number) => {
        const response = await api.delete(`/companies/${id}`);
        if (response.status !== 200) {
            message.error(response.statusText);
        }
    };

    return (
        <>
            {selectedCompany && (
                <DetailsCompanyModal
                    selectedCompany={selectedCompany}
                    setShowSeeModal={() => setShowSeeModal(!showSeeModal)}
                    showSeeModal={showSeeModal}
                />
            )}
            {companies && (
                <Col>
                    <h1>Lista de Empresas</h1>
                    <CompaniesTable
                        companies={companies}
                        onHandleDeleteModel={onHandleDeleteModel}
                        onHandleSelectedCompany={onHandleSelectedCompany}
                    />
                </Col>
            )}
        </>
    );
};

export default CompaniesPage;
