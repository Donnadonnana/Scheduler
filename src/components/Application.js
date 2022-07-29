import React from "react";


import { useApplicationData } from "../hooks/useApplicationData";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import getInterview, { getAppointmentsForDay ,getInterviewersForDay} from "../helpers/selectors";

export default function Application(props) {
  
  const { state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
 const dailyAppointment = getAppointmentsForDay(state, state.day);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days} 
            
            value={state.day} 
            onChange={(value) => setDay(value)} 
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {dailyAppointment.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          const interviewerArray = getInterviewersForDay(state, state.day)
   
          
      
          return <Appointment 
            key={appointment.id}
            {...appointment} 
            interview={interview}
            interviewers={interviewerArray}
            bookInterview={(id, interview) => bookInterview(id, interview)}
            cancelInterview={(id,interview)=>cancelInterview(id,interview)}
        />
        })}
 
      </section>
    </main>
  );
}
