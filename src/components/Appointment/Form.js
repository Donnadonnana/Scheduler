import React, { useState } from "react";
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {
  const [error, setError] = React.useState('');

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    if (student) {
      setStudent('')
      setInterviewer(null);
    } else {
      props.onCancel()
    }
  };
  const handleSaveClick = () => {
      if (!student) {
        setError('Student name cannot be blank');
        return;
      } else if (!interviewer) {
      setError('please select an interviewer');
        return;

      } else {
        setError('');
      } 
    props.onSave(student, interviewer)
  }
  return (
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        data-testid="student-name-input"
          />
        </form>
        {error && <div style={{ color: 'red',fontSize:'20px'}}>
          {error}
        </div>}        
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        /> 
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={reset}>Cancel</Button>
      <Button confirm onClick={handleSaveClick}>Save</Button>
    </section>
  </section>
</main>
  ); 
}