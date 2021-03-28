import { Row } from 'antd';

import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import IAsset from '../../types/Asset';
import AssetsTable from './components/AssetsTable';
import DetailAssetModal from './components/DetailAssetModal';
import AssetsStatisticsCards from './components/AssetsStatisticsCards';
import AssetsStatisticsGraph from './components/AssetsStatisticsGraph';

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
                    <AssetsStatisticsGraph assets={assets} />
                </Row>
            )}
            {assets && (
                <Row gutter={16}>
                    <AssetsStatisticsCards assets={assets} />
                </Row>
            )}

            <Row gutter={16} />
            {assets && (
                <AssetsTable
                    assets={assets}
                    onHandleSelectedAsset={onHandleSelectedAsset}
                />
            )}
        </>
    );
};

export default AssetsPage;
