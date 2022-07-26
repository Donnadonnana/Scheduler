import React from "react";
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';


export default function Appointment(props) {
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );  

  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    await props.bookInterview(props.id, interview)
    transition(SHOW)
  }
   
  return (
    
    <article className="appointment">
      
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <div>Saving...</div>}
      {mode === SHOW && (
       <Show
       {...props}
     />
      )} 
      {mode === CREATE && 
        <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={(student, interviewer)=>save(student, interviewer)}
      />
     } 
    </article>
    

  );
}
