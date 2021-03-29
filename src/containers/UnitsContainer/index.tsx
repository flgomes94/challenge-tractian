import React, { useEffect, useState } from 'react';
import { Col, message } from 'antd';
import api from '../../services/api';

import IUnit from '../../types/Unit';
import DetailUnitModal from './components/DetailsUnitModal';
import UnitsTable from './components/UnitsTable';

const UnitsPage: React.FC = () => {
    const [units, setUnits] = useState<IUnit[]>();
    const [selectedUnit, setSelectedUnit] = useState<IUnit>();
    const [showSeeModal, setShowSeeModal] = useState(false);
    useEffect(() => {
        async function getUnits() {
            const response = await api.get('/units');
            if (response.status !== 200) {
                message.error(response.statusText);
            }
            setUnits(response.data);
        }
        getUnits();
    }, []);
    const onHandleSelectedUnit = (unit: IUnit) => {
        setSelectedUnit(unit);
        setShowSeeModal(!showSeeModal);
    };

    const onHandleDeleteModel = async (id: number) => {
        const response = await api.delete(`/units/${id}`);
        if (response.status !== 200) {
            message.error(response.statusText);
        }
    };

    return (
        <>
            {selectedUnit && (
                <DetailUnitModal
                    selectedUnit={selectedUnit}
                    setShowSeeModal={() => setShowSeeModal(!showSeeModal)}
                    showSeeModal={showSeeModal}
                />
            )}

            {units && (
                <Col>
                    <h1>Lista de Unidades</h1>
                    <UnitsTable
                        units={units}
                        onHandleDeleteModel={onHandleDeleteModel}
                        onHandleSelectedUnit={onHandleSelectedUnit}
                    />
                </Col>
            )}
        </>
    );
};

export default UnitsPage;
