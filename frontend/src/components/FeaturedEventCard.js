import React from "react";
import format from "date-fns/format";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const FeaturedEventCard = ({
  title,
  description,
  dates,
  eventImage,
  location
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={title} src={eventImage} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={format(dates, "MMM Do, HH:mm")}
      />
    </ListItem>
  );
};

export default FeaturedEventCard;
