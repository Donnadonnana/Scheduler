import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;
  const day = days.map((eachDay) => <DayListItem key={eachDay.id} name={eachDay.name} spots={eachDay.spots} selected={eachDay.name === props.day} setDay={props.setDay} ></DayListItem>);
  

  return(
    <ul>
      {day}
    </ul>
  )
}