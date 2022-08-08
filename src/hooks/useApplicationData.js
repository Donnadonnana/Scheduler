import { useState, useEffect } from "react";
import axios from "axios";
import { StatusSave } from "../components/Appointment/Status";


export const useApplicationData = () => {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers:{}
});  
  
  useEffect(() => {
    const getData = async () => {

      console.log(axios)
      
    const data = await Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      console.log(data);
    setState(prev=>({...prev,days:data[0].data,appointments:data[1].data,interviewers:data[2].data}))
      
    }
      getData();
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

      const updatedDays = state.days.map((day) => {
        if (day.name === state.day) {
          return {
            ...day,
            spots: day.spots - 1,
          }
        } else {
          return day;
        }
      })

      setState({
        ...state,
        appointments: appointments,
        days: updatedDays
    
        });

      return true;
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

      const updatedDays = state.days.map((day) => {
        if (day.name === state.day) {
          return {
            ...day,
            spots: day.spots + 1,
          }
        } else {
          return day;
        }
      })

      setState({
        ...state,
        appointments: appointments,
        days:updatedDays
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