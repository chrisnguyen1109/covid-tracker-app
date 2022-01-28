import axiosClient from './axiosClient';
import moment from 'moment';

export const getCountries = () => {
    return axiosClient.get('/countries');
};

export const getReportByCountry = country => {
    return axiosClient.get(
        `/dayone/country/${country}?from=2021-01-01T00:00:00&to=${moment()
            .utc(0)
            .format()}`
    );
};

export const getMapDataByCountry = country => {
    return import(
        `@highcharts/map-collection/countries/${country}/${country}-all.geo.json`
    );
};
