import React, { Suspense } from "react";
import useFetch from "fetch-suspense";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import { formatEvents } from "../helpers/functions";
import { backendUrl } from "../data/constants";
import { useToggler } from "../helpers/hooks";
import EventCard from "../components/EventCard";
import FeaturedEventCard from "../components/FeaturedEventCard";
import CreateEventDialog from "./CreateEventDialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  loadingIndicator: {
    flex: 1
  },
  fab: {
    position: "fixed",
    right: 16,
    bottom: 16
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gridGap: "16px",
    padding: 16,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    }
  },
  eventGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "16px",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "1fr"
    },
    [theme.breakpoints.only("sm")]: {
      gridTemplateColumns: "1fr 1fr"
    }
  }
}));

const EventGrid = () => {
  const { events } = useFetch(`${backendUrl}/events`, {
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  });
  console.log(events);
  return formatEvents(events).map(event => <EventCard {...event} />);
};

const FeaturedEvents = () => {
  const { events } = useFetch(`${backendUrl}/events/featured`, {
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  });
  return formatEvents(events).map(event => <FeaturedEventCard {...event} />);
};

const EventList = () => {
  const classes = useStyles();
  const [dialogVisibility, showDialog, hideDialog] = useToggler(false);

  return (
    <div className={classes.root}>
      <CreateEventDialog open={dialogVisibility} onClose={hideDialog} />
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Events
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.grid}>
        <div className={classes.eventGrid}>
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
        </div>
        <div>
          <Typography variant="h6" className={classes.title}>
            Highlights
          </Typography>
          <List>
            <Suspense fallback={<CircularProgress size="40" />}>
              <FeaturedEvents />
            </Suspense>
          </List>
        </div>
      </div>
      <Fab
        onClick={showDialog}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default EventList;
