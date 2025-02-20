import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import SearchIcon from "@material-ui/icons/Search";
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#000000",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigateTo('/')
    } 
    else if (value === 1) {
      navigateTo('/Movies')
    } 
    else if (value === 2) {
      navigateTo('/TVseries')
    } 
    else if (value === 3) {
      navigateTo('/Search')
    }
  }, [value, navigateTo]);
  

  return (
  
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "#3bb33d" }}
        label="Trending"
        icon={<WhatshotOutlinedIcon />}
      />
      <BottomNavigationAction
        style={{ color: "#3bb33d" }}
        label="Movies"
        icon={<MovieCreationOutlinedIcon />}
      />
      <BottomNavigationAction
        style={{ color: "#3bb33d" }}
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "#3bb33d" }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
