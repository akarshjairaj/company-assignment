import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { config } from "../config/Config";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Drawer from "@material-ui/core/Drawer";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";

export default function Header({ user, setDateRange, setUser }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedEndtDate, setSelectedEndDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleApply = () => {
    setDateRange({
      startDate: selectedStartDate.getTime().toString(),
      endDate: selectedEndtDate.getTime().toString(),
    });
    setDrawerOpen(false);
  };

  useEffect(() => {
    let body = { organization: "DemoTest", view: "Auction" };
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token": user.token,
    };
    let fetchObj = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    fetch(`${config.rootApi}/api/v1/getDateRange`, fetchObj)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((json) => {
        // console.log("DATE RANGE", json);
        var startDateMilliseconds = parseInt(json.result.startDate);
        var startDate = new Date(startDateMilliseconds);
        var endDateMilliseconds = parseInt(json.result.endDate);
        var endDate = new Date(endDateMilliseconds);
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [user]);

  return (
    <Paper>
      <header>
        <h2 className="header-title">Executive Dashboard</h2>
        <DateRangeIcon
          className="date-icon"
          onClick={(e) => {
            setDrawerOpen(true);
          }}
        />
      </header>
      <Drawer anchor="right" open={drawerOpen}>
        <div className="filter-pane-container">
          <div className="filter-pane">
            <p className="filter-pane-title">Filter Dates</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="start-date-picker"
                label="Pick Start Date"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="end-date-picker"
                label="Pick End Date"
                value={selectedEndtDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <div className="filter-pane-button-container">
              <Button
                variant="contained"
                onClick={() => {
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
          <div className="signout-container">
            <Button variant="contained" color="primary" onClick={() => {setUser({ loggedIn: false, token: "" })}}>
              Sign Out
            </Button>
          </div>
        </div>
      </Drawer>
    </Paper>
  );
}
