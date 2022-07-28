import React, { useState ,useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import getInterview, { getAppointmentsForDay,getInterviewersForDay} from "../helpers/selectors";

export default function Application(props) {
  
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  // const [appointments,setAppointments]=useState({})
  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers:{}
  });
  
  const dailyAppointment = getAppointmentsForDay(state, state.day);
  // const appointmentsArray = Object.values(state.appointments).map((value) => {
  //   return value;
  // })
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev=>({...prev,days:all[0].data,appointments:all[1].data,interviewers:all[2].data}))
    })
    // const dayURL = 'http://localhost:8001/api/days';
    // axios.get(dayURL).then(response=> {
    //   const days = response.data
    //    const appointmentURL = 'http://localhost:8001/api/appointments';
    //   axios.get(appointmentURL).then(response=> {
    //   // setState.appointments(response.data)
    //   setState({ ...state, appointments: response.data, days })
    // })
    // })
  }, [])
  const bookInterview = async (id, interview) => {
    const appointment = {
     ...state.appointments[id],
    interview: { ...interview }
    };
    const appointments = {
    ...state.appointments,
    [id]: appointment
    };
    try {
      await axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview,
      })

      setState({
        ...state,
        appointments:appointments
        });
    } catch (e) {
      throw e;
    }
  }
  const cancelInterview = async (id, interview) => {
       const appointment = {
     ...state.appointments[id],
    interview:null
    };
    const appointments = {
    ...state.appointments,
    [id]: appointment
    };
    try {
      await axios.delete(`http://localhost:8001/api/appointments/${id}`, 
      )

      setState({
        ...state,
        appointments:appointments
        });
    } catch (e) {
       throw e;
    }
  }
 
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
            onChange={(value) => setState({...state, day: value})} 
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
