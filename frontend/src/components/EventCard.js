import React from "react";
import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
});

const EventCard = ({ title, description, dates, eventImage }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="Settings">
            <ShareIcon />
          </IconButton>
        }
        title={title}
        subheader={format(dates, "MMM Do, HH:mm")}
      />
      <CardMedia className={classes.media} image={eventImage} title={title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="large" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
