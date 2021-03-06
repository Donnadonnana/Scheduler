import React, { useState ,useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";


export default function Application(props) {
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  // const [appointments,setAppointments]=useState({})
  const [state, setState] = useState({
  day: "Monday",
  days: [],

  appointments: {}
  });

  const dailyAppointment = getAppointmentsForDay(state, state.day);
  // const appointmentsArray = Object.values(state.appointments).map((value) => {
  //   return value;
  // })
  console.log('@@@@@@@@@@@');
  console.log(dailyAppointment);
  console.log('!!111111');
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments')
    ]).then((all) => {
  
      setState(prev=>({...prev,days:all[0].data,appointments:all[1].data}))
    })
    // const dayURL = 'http://localhost:8001/api/days';
    // axios.get(dayURL).then(response=> {
   
    //   const days = response.data;

    //    const appointmentURL = 'http://localhost:8001/api/appointments';
    //   axios.get(appointmentURL).then(response=> {
    //   // setState.appointments(response.data)
    //   setState({ ...state, appointments: response.data, days })
      
    // })
    // })
   
  },[])
 
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
          return <Appointment 
            key={appointment.id}
           {...appointment} 
/>
        })}
 
      </section>
    </main>
  );
}
