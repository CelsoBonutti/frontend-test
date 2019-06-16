import React, { Suspense } from "react";
import useFetch from "fetch-suspense";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import { formatEvents } from "../helpers/functions";
import { backendUrl } from "../data/constants";
import EventCard from "../components/EventCard";
import FeaturedEventCard from "../components/FeaturedEventCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  gridContainer: {
    padding: 16
  },
  loadingIndicator: {
    flex: 1
  },
  fab: {
    position: "fixed",
    right: 16,
    bottom: 16
  }
}));

const EventGrid = () => {
  const { events } = useFetch(`${backendUrl}/events`, {
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  });
  console.log(events);
  return formatEvents(events).map(event => (
    <Grid item sm={12} key={event.id} lg={4}>
      <EventCard {...event} />
    </Grid>
  ));
};

const FeaturedEvents = () => {
  const { events } = useFetch(`${backendUrl}/events/featured`, {
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  });
  return formatEvents(events).map(event => <FeaturedEventCard {...event} />);
};

const Events = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Events
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item sm={12} md={9}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Suspense
              fallback={
                <CircularProgress
                  size="40"
                  className={classes.loadingIndicator}
                />
              }
            >
              <EventGrid />
            </Suspense>
          </Grid>
        </Grid>
        <Grid item sm={0} md={3}>
          <Typography variant="h6" className={classes.title}>
            Highlights
          </Typography>
          <List>
            <Suspense fallback={<CircularProgress size="40" />}>
              <FeaturedEvents />
            </Suspense>
          </List>
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Events;
