import { Card, Col } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import * as Highcharts from 'highcharts';
import _ from 'lodash';
import IAsset from '../../../types/Asset';

interface IAssetsStatisticsGraphProps {
    assets: IAsset[];
}

const AssetsStatisticsGraph = ({
    assets,
}: IAssetsStatisticsGraphProps): JSX.Element => {
    const assetsByStatus = (status: 'inAlert' | 'inOperation' | 'inDowntime') =>
        assets?.length
            ? _.filter(assets, (asset) => asset.status === status).length
            : 0;

    return (
        <Col flex={1}>
            <Card
                style={{
                    maxHeight: '50vh',
                    justifyContent: 'center',
                    display: 'flex',
                }}
            >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: 0,
                            plotShadow: false,
                            height: 200,
                        },
                        title: {
                            text: 'Estatísticas',
                        },
                        tooltip: {
                            pointFormat:
                                '{series.name}: <b>{point.percentage:.1f}%</b>',
                        },
                        series: [
                            {
                                type: 'pie',
                                name: 'Ativos',
                                data: [
                                    ['Em Alerta', assetsByStatus('inAlert')],
                                    [
                                        'Desligados',
                                        assetsByStatus('inDowntime'),
                                    ],
                                    [
                                        'Em Operação',
                                        assetsByStatus('inOperation'),
                                    ],
                                    [
                                        'Desconhecidos',
                                        assets?.length
                                            ? assets?.length -
                                              assetsByStatus('inAlert') -
                                              assetsByStatus('inDowntime') -
                                              assetsByStatus('inOperation')
                                            : 0,
                                    ],
                                ],
                            },
                        ],
                    }}
                />
            </Card>
        </Col>
    );
};

export default AssetsStatisticsGraph;
