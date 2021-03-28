import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import api from '../../../../services/api';

import IUnit from '../../../../types/Unit';
import DetailUnitModal from './components/DetailsUnitModal';

const UnitsPage = (): JSX.Element => {
    const [units, setUnits] = useState<IUnit[]>();
    const [selectedUnit, setSelectedUnit] = useState<IUnit>();
    const [showSeeModal, setShowSeeModal] = useState(false);
    useEffect(() => {
        async function getUnits() {
            const newUnits = await api.get('/units');
            setUnits(newUnits.data);
        }
        getUnits();
    }, []);
    const onHandleSelectedUnit = (unit: IUnit) => {
        setSelectedUnit(unit);
        setShowSeeModal(!showSeeModal);
    };

    const onHandleDeleteModel = async (id: number) => {
        await api.delete(`/units/${id}`);
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
            title: 'Empresa',
            dataIndex: 'companyId',
            key: 'companyId',
        },
        {
            title: 'Ações',
            dataIndex: '',
            key: 'x',
            render: (text: string, record: IUnit) => (
                <Space size="middle">
                    <Button onClick={() => onHandleSelectedUnit(record)}>
                        Ver
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja cancelar essa unidade?"
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
            {selectedUnit && (
                <DetailUnitModal
                    selectedUnit={selectedUnit}
                    setShowSeeModal={() => setShowSeeModal(!showSeeModal)}
                    showSeeModal={showSeeModal}
                />
            )}
            <h1>Lista de Unidades</h1>
            <Table
                columns={columns}
                loading={!units?.length}
                dataSource={units}
                size="small"
                pagination={false}
                scroll={{ y: '80vh' }}
            />
        </>
    );
};

export default UnitsPage;
