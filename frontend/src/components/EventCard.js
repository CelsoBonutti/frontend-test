import React, { useState } from "react";
import dayjs from "dayjs";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  menuItem: {
    textDecoration: "none",
    fontWeight: "bold",
    color: "black",
    fontFamily: "Roboto"
  }
});

const EventCard = ({ title, id, description, dates, eventImage }) => {
  const classes = useStyles();

  const [anchor, setAnchor] = useState(null);

  const openMenu = event => {
    setAnchor(event.currentTarget);
  };

  const hideMenu = () => {
    setAnchor(null);
  };

  return (
    <Card>
      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={!!anchor}
        onClose={hideMenu}
      >
        <a
          className={classes.menuItem}
          href={`https://twitter.com/intent/tweet?text=I'm going to ${title} @ ${dates}.`}
        >
          <MenuItem>Tweet</MenuItem>
        </a>
      </Menu>
      <CardHeader
        action={
          <IconButton aria-label="Settings" onClick={openMenu}>
            <ShareIcon />
          </IconButton>
        }
        title={title}
        subheader={dayjs(dates).format("MMM DD, HH:mm")}
      />
      <CardMedia className={classes.media} image={eventImage} title={title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={{ pathname: "/event", search: `?id=${id}` }}>
          <Button size="large" color="primary">
            View
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default EventCard;
