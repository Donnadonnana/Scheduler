import { useState, useEffect } from "react";
import axios from "axios";


export const useApplicationData = () => {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers:{}
});  
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev=>({...prev,days:all[0].data,appointments:all[1].data,interviewers:all[2].data}))
    })
  }, [])

  const setDay = (value) => {
    setState({ ...state, day: value });
  }

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


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
  
}