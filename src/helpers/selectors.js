export function getAppointmentsForDay(state, day) {

  const appointments = state.days.filter(
    appointment => appointment.name === day
  )[0]?.appointments || [];

  let res = [];

  Object.keys(state.appointments || {}).forEach((appointmentKey) => {
    const appointment = state.appointments[appointmentKey];
    if (appointments.includes(appointment.id)) {
      res.push(appointment);
    }
  });

  return res;

}

export default function getInterview(state, interview) {

  if (interview === null) return null;
  const interviewerID = interview.interviewer;

  const allInterviewers = state.interviewers;
  const interviewerData = allInterviewers[interviewerID.toString()];

  return {
    interviewer: interviewerData,
    student: interview.student,
  }
}

export function getInterviewersForDay(state, day) {
  const interviewrs = state.days.filter(
    interviewer => interviewer.name === day
  )[0]?.interviewers || [];
  let res = [];
  Object.keys(state.interviewers).forEach((interviewerKey) => {
    const interviewerVal = state.interviewers[interviewerKey];
    if (interviewrs.includes(interviewerVal.id)) {
      res.push(interviewerVal);
    }
  })
  return res;
  
  
}