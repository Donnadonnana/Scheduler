import React from "react";
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import {StatusSave,StatusDelete} from './Status';
import Empty from './Empty';
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import {ErrorSave,ErrorDelete} from "./Error";



const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELET = 'DELETE';
const COMFIRM = 'COMFIRM';
const EDIT = 'EDIT';
const ERROR_SVAE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {

 
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );  

  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    try {
     
      transition(SAVING);

      await props.bookInterview(props.id, interview)

        transition(SHOW)

    } catch (e) {
      transition(ERROR_SVAE)
    }
   }
   
  const cancel = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    try{ transition(DELET);
    await props.cancelInterview(props.id, interview)
      transition(EMPTY)
    } catch (e) {
      transition(ERROR_DELETE)
    }
   
  }
  return (
    
    <article className="appointment">
      
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_SVAE && <ErrorSave
        onClose={() => back()} />}
      {mode === ERROR_DELETE && <ErrorDelete
        onClose={() =>transition(SHOW)
        } />}

      {mode === SAVING && <StatusSave />}
      {mode === DELET && <StatusDelete />}
      {mode === COMFIRM && <Confirm
        onConfirm={() => cancel(props.student, props.interviewer)}
        onCancel={()=>back()}/>}
      {mode === SHOW && (
       <Show
          {...props}
          onDelete={() => transition(COMFIRM)}
          onEdit={()=>transition(EDIT)}
     />
      )} 
      {mode === CREATE && 
        <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={(student, interviewer) => save(student, interviewer)}
      />
      } 
      {mode === EDIT &&
        <Form
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        student={props.interview.student}
        onCancel={() => back()}
        onSave={(student, interviewer)=>save(student, interviewer)}
      />
      }
    </article>
    

  );
}
