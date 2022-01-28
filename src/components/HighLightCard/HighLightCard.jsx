import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CountUp from 'react-countup';

const useStyles = makeStyles({
    wrapper: ({ type }) => {
        if (type === 'confirmed') return { borderLeft: '5px solid #c9302c' };
        if (type === 'recovered') return { borderLeft: '5px solid #28a745' };
        if (type === 'death') return { borderLeft: '5px solid gray' };
    },
    title: { fontSize: 18, marginBottom: 5 },
    count: { fontWeight: 'bold', fontSize: 18 },
});

export default function HighLightCard({ title, count, type }) {
    const classes = useStyles({ type });

    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <Typography
                    component="p"
                    variant="body2"
                    className={classes.title}
                >
                    {title}
                </Typography>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.count}
                >
                    <CountUp end={count} separator=" " duration={2} />
                </Typography>
            </CardContent>
        </Card>
    );
}
