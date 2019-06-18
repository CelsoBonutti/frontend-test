import React from "react";
import dayjs from "dayjs";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DateTimePicker } from "@material-ui/pickers";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import placeholder from "../../assets/images/image-placeholder.png";
import { createEventStore } from "./EventStore";
import { backendUrl } from "../../data/constants";

const useStyles = makeStyles(theme => ({
  content: {
    padding: "8px 16px"
  },
  imageInput: {
    display: "none"
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridGap: "16px",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr"
    }
  },
  textGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "16px",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr"
    }
  },
  fullWidthInput: {
    gridColumn: "1/3",
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1"
    }
  },
  datePicker: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  dateInput: {
    width: "100%"
  },
  table: {
    padding: "16px",
    height: "200"
  },
  image: {
    width: "100%",
    height: "200px"
  }
}));

const CreateEventDialog = ({ open, onClose, onEventCreated, fullScreen }) => {
  const classes = useStyles();

  const formData = useLocalStore(createEventStore);

  const createEvent = async () => {
    try {
      await fetch(`${backendUrl}/events`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            ...formData.eventInformation
          }
        })
      });
      formData.clearForm();
      onEventCreated();
    } catch (e) {
      console.log(e);
    }
  };

  return useObserver(() => (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      className={classes.root}
      maxWidth="xl"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
      <DialogContent className={classes.content}>
        <div className={classes.mainGrid}>
          <div>
            <div className={classes.textGrid}>
              <TextField
                className={classes.input}
                autoFocus
                value={formData.title}
                onChange={e => formData.setTitle(e.target.value)}
                id="title"
                label="Title"
                type="text"
                variant="outlined"
              />
              <TextField
                className={classes.input}
                value={formData.location}
                onChange={e => formData.setLocation(e.target.value)}
                id="location"
                label="Location"
                type="text"
                variant="outlined"
              />
              <TextField
                className={classes.fullWidthInput}
                value={formData.description}
                onChange={e => formData.setDescription(e.target.value)}
                multiline
                rows="5"
                id="description"
                label="Description"
                variant="outlined"
              />
              <div className={classes.imageContainer}>
                <img
                  className={classes.image}
                  alt={formData.title}
                  src={formData.image || placeholder}
                />
              </div>
              <input
                accept="image/*"
                className={classes.imageInput}
                id="contained-button-file"
                type="file"
                onChange={e => formData.setImage(e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                >
                  Select
                </Button>
              </label>
            </div>
          </div>
          <div>
            <div className={classes.datePicker}>
              <DateTimePicker
                label="Date / Time"
                inputVariant="outlined"
                className={classes.dateInput}
                value={formData.date}
                onChange={formData.addDate}
              />
            </div>
            <div className={classes.table}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.dates.map((date, index) => (
                    <TableRow key={date}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {dayjs(date).format("MMM DD, HH:mm")}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="Remove date"
                          onClick={() => formData.removeDate(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={createEvent}
          disabled={!formData.isValid}
          color="primary"
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  ));
};

export default withMobileDialog()(CreateEventDialog);
