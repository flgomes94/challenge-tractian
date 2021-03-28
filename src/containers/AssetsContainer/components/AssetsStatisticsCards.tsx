import {
    AlertOutlined,
    ArrowUpOutlined,
    DashboardOutlined,
    InfoCircleOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { Card, Col, Statistic, Tooltip } from 'antd';
import _ from 'lodash';
import React from 'react';
import IAsset from '../../../types/Asset';

interface IStatisticsCardProps {
    assets: IAsset[];
}

const AssetsStatisticsCards = ({
    assets,
}: IStatisticsCardProps): JSX.Element => {
    const healthPercentageByValue = (value: number) =>
        assets?.length
            ? (_.filter(assets, (asset) => asset.healthscore > value).length /
                  assets.length) *
              100
            : 0;

    const maxAssetByTemperature = _.maxBy(
        assets,
        (asset) => asset.specifications.maxTemp,
    );
    const maxAssetByPower = _.maxBy(
        assets,
        (asset) => asset.specifications.power,
    );

    const minAssetByRPM = _.minBy(assets, (asset) => asset.specifications.rpm);

    return (
        <>
            <Col span={6}>
                <Card>
                    <Statistic
                        title={
                            <Tooltip title="Porcentagem de ativos que estão com estado de saúde acima de 70%">
                                <span>Em perfeito estado</span>{' '}
                                <InfoCircleOutlined />
                            </Tooltip>
                        }
                        loading={!assets?.length}
                        value={healthPercentageByValue(70)}
                        precision={2}
                        valueStyle={{ color: '#52c41a' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title={
                            <Tooltip title="Temperatura mais alta registrada entre os ativos cadastrados">
                                <span>Temperatura mais alta</span>{' '}
                                <InfoCircleOutlined />
                            </Tooltip>
                        }
                        value={
                            maxAssetByTemperature?.specifications.maxTemp || 0
                        }
                        loading={!assets?.length}
                        suffix="ºC"
                        valueStyle={{ color: '#fadb14' }}
                        prefix={<AlertOutlined />}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title={
                            <Tooltip title="Potência mais alta registrada entre os ativos cadastrados">
                                <span>Potência mais alta</span>{' '}
                                <InfoCircleOutlined />
                            </Tooltip>
                        }
                        suffix="kWh"
                        value={maxAssetByPower?.specifications.power || 0}
                        loading={!assets?.length}
                        valueStyle={{ color: '#f5222d' }}
                        prefix={<DashboardOutlined />}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title={
                            <Tooltip title="RPM mais alto registrado entre os ativos cadastrados">
                                <span>RPM mais alto</span>{' '}
                                <InfoCircleOutlined />
                            </Tooltip>
                        }
                        suffix="RPM"
                        value={minAssetByRPM?.specifications.rpm || 0}
                        loading={!assets?.length}
                        valueStyle={{ color: '#52c41a' }}
                        prefix={<ReloadOutlined />}
                    />
                </Card>
            </Col>
        </>
    );
};

export default AssetsStatisticsCards;
