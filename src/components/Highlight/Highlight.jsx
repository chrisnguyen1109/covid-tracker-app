import { Grid } from '@mui/material';
import { useMemo } from 'react';
import HighLightCard from '../HighLightCard/HighLightCard';

export default function Highlight({ latestData }) {
    const summary = useMemo(() => {
        if (!latestData) return [];

        return [
            {
                title: 'Number of covid cases',
                count: latestData.Confirmed,
                type: 'confirmed',
            },
            {
                title: 'Number of recoverd cases',
                count: latestData.Recovered,
                type: 'recovered',
            },
            {
                title: 'Number of death cases',
                count: latestData.Deaths,
                type: 'death',
            },
        ];
    }, [latestData]);

    return (
        <Grid container spacing={3}>
            {summary.map(item => (
                <Grid item sm={4} xs={12} key={item.type}>
                    <HighLightCard
                        title={item.title}
                        count={item.count}
                        type={item.type}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
