import React from 'react';
import "../../styles/styleGeneral.css";
/*Importaciones del time*/
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const Dates = ({ handleDateChange,param}) => {
    return (
        <div className='section-container'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="container-date">
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
                <div className="container-date">
                    <KeyboardTimePicker
                        margin="normal"
                        variant="inline"
                        id="time-picker"
                       // label="Time picker"
                        value={param}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </div>
            </MuiPickersUtilsProvider>
        </div>
    )
};

export default Dates;