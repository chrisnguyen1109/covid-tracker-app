import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { useEffect, useRef, useState } from 'react';
import { getMapDataByCountry } from '../../api/covidApi';
import { cloneDeep } from 'lodash';

highchartsMap(Highcharts);

const initOptions = {
    chart: {
        height: '500',
    },
    title: {
        text: null,
    },
    mapNavigation: {
        enabled: true,
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '	#7A0826'],
        ],
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
    },
    series: [
        {
            name: 'Population',
            joinBy: ['hc-key', 'key'],
        },
    ],
};

export default function HighMap({ selectCountry }) {
    const [options, setOptions] = useState({});
    const [mapData, setMapData] = useState(null);
    const chartRef = useRef();

    useEffect(() => {
        const getMapDataByCountryApi = async () => {
            try {
                const response = await getMapDataByCountry(
                    selectCountry.toLowerCase()
                );

                if (response && Object.keys(response).length) {
                    const fakeData = response.features.map(
                        (feature, index) => ({
                            key: feature.properties['hc-key'],
                            value: index,
                        })
                    );

                    setOptions(() => ({
                        ...initOptions,
                        title: {
                            text: response.title,
                        },
                        series: [
                            {
                                ...initOptions.series[0],
                                mapData: response,
                                data: fakeData,
                            },
                        ],
                    }));

                    setMapData(response);
                } else {
                    setMapData(null);
                }
            } catch (err) {
                console.log(err);
                setMapData(null);
            }
        };

        selectCountry && getMapDataByCountryApi();
    }, [selectCountry]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            });
        }
    }, [options, mapData]);

    if (!mapData) return null;

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={cloneDeep(options)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    );
}
