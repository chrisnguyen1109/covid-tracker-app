import { Container, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './api/covidApi';
import CountrySelector from './components/CountrySelector/CountrySelector';
import Highlight from './components/Highlight/Highlight';
import Summary from './components/Summary/Summary';
import '@fontsource/roboto';
import { sortBy } from 'lodash';

function App() {
    const [selectCountry, setSelectCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const getCountriesApi = async () => {
            const response = await getCountries();
            setCountries(sortBy(response, 'Country'));
            setSelectCountry('VN');
        };

        getCountriesApi();
    }, []);

    useEffect(() => {
        const getReportByCountryApi = async () => {
            const selectCountrySlug = countries.find(
                cou => cou.ISO2 === selectCountry
            );
            const response = await getReportByCountry(selectCountrySlug.Slug);
            setReports(response);
        };

        selectCountry && getReportByCountryApi();
    }, [selectCountry]);

    const changeCountryHandler = country => {
        setSelectCountry(country);
    };

    const latestData = reports[reports.length - 1];

    return (
        <Container maxWidth="xl" sx={{ mt: '20px' }}>
            <Typography variant="h2" component="h2">
                COVID-19 Tracker App
            </Typography>
            <Typography>{moment().format('LLL')}</Typography>
            <CountrySelector
                selectCountry={selectCountry}
                countries={countries}
                onChangeCountry={changeCountryHandler}
            />
            <Highlight latestData={latestData} />
            <Summary reports={reports} selectCountry={selectCountry} />
        </Container>
    );
}

export default App;
