import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { formatEvents } from "../helpers/functions";
import { backendUrl } from "../data/constants";
import { useToggler, useGET } from "../helpers/hooks";
import EventCard from "../components/EventCard";
import FeaturedEventCard from "../components/FeaturedEventCard";
import CreateEventDialog from "../components/CreateEventDialog/CreateEventDialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  fab: {
    position: "fixed",
    right: 16,
    bottom: 16
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
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
  },
  featuredEventGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    [theme.breakpoints.between("sm", "md")]: {
      gridTemplateColumns: "1fr 1fr"
    }
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px"
  }
}));

const EventList = () => {
  const classes = useStyles();
  const [dialogVisibility, showDialog, hideDialog] = useToggler(false);
  const [events, loadingEvents, refetchEvents] = useGET(`${backendUrl}/events`);
  const [featuredEvents, loadingFeaturedEvents, refetchFeaturedEvents] = useGET(
    `${backendUrl}/events/featured`
  );

  const eventList = loadingEvents ? (
    <CircularProgress size={150} />
  ) : (
    formatEvents(events.events).map(event => <EventCard {...event} />)
  );

  const featuredEventList = loadingFeaturedEvents ? (
    <CircularProgress size={150} />
  ) : (
    formatEvents(featuredEvents.events).map(event => (
      <FeaturedEventCard {...event} />
    ))
  );

  const refetch = () => {
    refetchEvents();
    refetchFeaturedEvents();
  };

  return (
    <div className={classes.root}>
      <CreateEventDialog
        onEventCreated={refetch}
        open={dialogVisibility}
        onClose={hideDialog}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Events
          </Typography>
        </Toolbar>
      </AppBar>
      {loadingEvents || loadingFeaturedEvents ? (
        <div className={classes.loading}>
          <CircularProgress size={150} />
        </div>
      ) : (
        <div className={classes.grid}>
          <div>
            <Typography variant="h6" className={classes.title}>
              Highlights
            </Typography>
            <div className={classes.featuredEventGrid}>{featuredEventList}</div>
          </div>
          <div className={classes.eventGrid}>{eventList}</div>
        </div>
      )}
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
