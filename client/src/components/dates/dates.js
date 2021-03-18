import React from 'react';

/*Importaciones del time*/
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import '../../styles/styleGeneral.css';

const Dates = ({ handleDateChange,param}) => {
    return (
        <div className='section-container'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <div className="form-select">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                       // label="Date picker inline"
                        value={param}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                  </div>
                  <div className="form-select">
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                       // label="Time picker"
                        value={param}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                  </div>
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    )
};

export default Dates;