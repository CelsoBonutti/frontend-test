import React from "react";
import dayjs from "dayjs";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";

const FeaturedEventCard = ({
  title,
  description,
  dates,
  eventImage,
  location,
  id
}) => {
  return (
    <Link
      component={RouterLink}
      to={{ pathname: "/event", search: `?id=${id}` }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={title} src={eventImage} />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={dayjs(dates).format("MMM Do, HH:mm")}
        />
      </ListItem>
    </Link>
  );
};

export default FeaturedEventCard;
