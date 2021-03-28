import { Row, Form } from 'antd';

import React, { useEffect, useState } from 'react';

import api from '../../../../services/api';
import IAsset from '../../../../types/Asset';
import AssetTable from './components/AssetTable';
import DetailAssetModal from './components/DetailAssetModal';
import StatisticsCards from './components/StatisticsCards';
import StatisticsGraph from './components/StatisticsGraph';

const AssetsPage: React.FC = () => {
    const [assets, setAssets] = useState<IAsset[]>();
    const [showSeeModal, setShowSeeModal] = useState(false);

    const [selectedAsset, setSelectedAsset] = useState<IAsset>();

    useEffect(() => {
        async function getAssets() {
            const newAssets = await api.get('/assets');
            setAssets(newAssets.data);
        }
        getAssets();
    }, []);

    const onHandleSelectedAsset = (asset: IAsset) => {
        setSelectedAsset(asset);
        setShowSeeModal(!showSeeModal);
    };

    return (
        <>
            {selectedAsset && (
                <DetailAssetModal
                    selectedAsset={selectedAsset}
                    showSeeModal={showSeeModal}
                    setShowSeeModal={() => setShowSeeModal(!showSeeModal)}
                />
            )}
            {assets && (
                <Row gutter={16}>
                    <StatisticsGraph assets={assets} />
                </Row>
            )}
            {assets && (
                <Row gutter={16}>
                    <StatisticsCards assets={assets} />
                </Row>
            )}

            <Row gutter={16} />
            {assets && (
                <AssetTable
                    assets={assets}
                    onHandleSelectedAsset={onHandleSelectedAsset}
                />
            )}
        </>
    );
};

export default AssetsPage;
