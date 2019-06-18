import React from "react";
import dayjs from "dayjs";
import qs from "qs";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { backendUrl } from "../data/constants";
import { useGET } from "../helpers/hooks";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "4fr 1fr",
    gridGap: "16px",
    padding: "16px",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    }
  },
  image: {
    width: "100%"
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "3fr 1fr"
    },
    [theme.breakpoints.down("xs")]: {
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

const EventDetails = ({ location: { search } }) => {
  const classes = useStyles();
  const { id } = qs.parse(search, { ignoreQueryPrefix: true });
  const [event, loading] = useGET(`${backendUrl}/events/${id}`);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress size={150} />
      </div>
    );
  }

  const {
    event: { title, location, description, eventImage, dates }
  } = event;

  return (
    <div className={classes.grid}>
      <div>
        <Typography variant="h5" gutterBottom>
          {title}
          <Typography variant="h6" gutterBottom>
            @{location}
          </Typography>
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
      </div>
      <div class={classes.imageGrid}>
        <img className={classes.image} src={eventImage} alt={title} />
        <div>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dates.map(date => (
                <TableRow key={date}>
                  <TableCell component="th" scope="row">
                    {dayjs(date).format("MMMM DD")}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(date).format("HH:mm")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const Event = ({ location, history }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={history.goBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Event
          </Typography>
        </Toolbar>
      </AppBar>
      <EventDetails location={location} />
    </div>
  );
};

export default Event;
