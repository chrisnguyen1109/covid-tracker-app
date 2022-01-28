import { Grid } from '@mui/material';
import HighMap from '../HighMap/HighMap';
import LineChart from '../LineChart/LineChart';

export default function Summary({ reports, selectCountry }) {
    return (
        <div style={{ marginTop: '60px' }}>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart reports={reports} />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMap selectCountry={selectCountry} />
                </Grid>
            </Grid>
        </div>
    );
}
