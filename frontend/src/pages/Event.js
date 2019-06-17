import React, { Suspense } from "react";
import dayjs from "dayjs";
import useFetch from "fetch-suspense";
import qs from "qs";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { backendUrl } from "../data/constants";

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
  }
}));

const EventDetails = ({ location: { search } }) => {
  const classes = useStyles();
  const { id } = qs.parse(search, { ignoreQueryPrefix: true });
  const {
    event: { title, location, description, eventImage, dates }
  } = useFetch(`${backendUrl}/events/${id}`);

  return (
    <div className={classes.grid}>
      <div>
        <Typography variant="h5" gutterBottom>
          {title}
          <Typography variant="h6" gutterBottom>
            {location}
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
      <Suspense fallback="Carregando">
        <EventDetails location={location} />
      </Suspense>
    </div>
  );
};

export default Event;
