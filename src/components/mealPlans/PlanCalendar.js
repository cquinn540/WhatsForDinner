import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/index';
import PlanCalendarDay from "./PlanCalendarDay";
import {withStyles} from "@material-ui/core";

const isSameDay = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate() &&
        date1.getFullYear() === date2.getFullYear();
};

const styles = {
    calendar: {
        paddingLeft: '1em',
        paddingRight: '1em',
    }
};

const PlanCalendar = function (props) {
    const { classes, meals, startDate, endDate } = props;
    // create array of Date objects for each day between start and end dates
    const dates = [];
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
    }

    return <div className={classes.calendar}>
        <Grid container spacing={8}>
            {dates.map((date, index) =>
                <Grid item xs={12} md={4} lg={2} key={index}>
                    <PlanCalendarDay date={date}
                                     onRecipeDelete={props.onRecipeDelete}
                                     onMealEdit={props.onMealEdit}
                                     meals={meals.filter(meal => isSameDay(date, meal.dateTime))}/>
                </Grid>
            )}
        </Grid>
    </div>
};

PlanCalendar.propTypes = {
    meals: PropTypes.array,
    onRecipeDelete: PropTypes.func,
    onMealEdit: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
};

export default withStyles(styles)(PlanCalendar);