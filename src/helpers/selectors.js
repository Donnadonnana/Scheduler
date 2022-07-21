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