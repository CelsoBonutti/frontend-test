import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DayJsUtils from "@date-io/dayjs";

import EventList from "./pages/EventList";
import Event from "./pages/Event";
import "typeface-roboto";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <Router>
        <Route path="/" exact component={EventList} />
        <Route path="/event" component={Event} />
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
