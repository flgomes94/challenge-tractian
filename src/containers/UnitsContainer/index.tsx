import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import api from '../../services/api';

import IUnit from '../../types/Unit';
import DetailUnitModal from './components/DetailsUnitModal';
import UnitsTable from './components/UnitsTable';

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
