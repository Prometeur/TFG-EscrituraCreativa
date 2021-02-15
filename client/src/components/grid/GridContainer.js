import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


class GridContainer extends Component {

     constructor(props) {
         super(props);
        this.state = {
            grid:{
                margin : "0 -15px important",
                width: "unset",
            }
        };
     }

    render() {
       const classes = makeStyles(this.state.grid);
       const {children, ...rest} = this.props;
       return (
        <Grid container {...rest} className = {classes.grid}>
            {children}
        </Grid>
       );
    }
}

export default GridContainer;