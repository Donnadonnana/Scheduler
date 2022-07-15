import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers;
  const interviwer = interviewers.map((eachInterviwer) => <InterviewerListItem id={eachInterviwer.id} name={eachInterviwer.name} avatar={eachInterviwer.avatar} selected={eachInterviwer.id===props.interviewer} setInterviewer={props.setInterviewer}></InterviewerListItem>);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviwer}</ul>
    </section>
  );
}