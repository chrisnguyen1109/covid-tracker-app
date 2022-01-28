import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';

const generateOptions = data => {
    const categories = data.map(item => moment(item.Date).format('DD/MM/YYYY'));

    return {
        chart: {
            height: 500,
        },
        title: {
            text: 'Number of covid cases',
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#F3585B'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} cases</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Number of covid cases',
                data: data.map(item => item.Confirmed),
            },
        ],
    };
};

export default function LineChart({ reports }) {
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('');

    useEffect(() => {
        let customData = [];

        switch (reportType) {
            case '':
                customData = reports;
                break;
            case '30':
                customData = reports.slice(-30);
                break;
            case '7':
                customData = reports.slice(-7);
                break;
            default:
                customData = reports;
        }

        setOptions(generateOptions(customData));
    }, [reports, reportType]);

    return (
        <>
            <ButtonGroup
                size="small"
                aria-label="outlined primary button group"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    color={reportType === '' ? 'error' : 'primary'}
                    onClick={() => setReportType('')}
                >
                    All
                </Button>
                <Button
                    color={reportType === '30' ? 'error' : 'primary'}
                    onClick={() => setReportType('30')}
                >
                    30 days
                </Button>
                <Button
                    color={reportType === '7' ? 'error' : 'primary'}
                    onClick={() => setReportType('7')}
                >
                    7 days
                </Button>
            </ButtonGroup>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </>
    );
}
