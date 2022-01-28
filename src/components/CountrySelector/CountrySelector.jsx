import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

export default function CountrySelector({
    selectCountry,
    countries,
    onChangeCountry,
}) {
    const handleChange = e => {
        onChangeCountry(e.target.value);
    };

    return (
        <FormControl sx={{ my: 3, minWidth: '300px' }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectCountry}
                label="Country"
                onChange={handleChange}
            >
                {countries.map(country => (
                    <MenuItem key={country.ISO2} value={country.ISO2}>
                        {country.Country}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Please select a country</FormHelperText>
        </FormControl>
    );
}
