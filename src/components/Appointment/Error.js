import React from "react";

export function ErrorDelete(props) {
  return (
   <main className="appointment__card appointment__card--error">
  <section className="appointment__error-message">
    <h1 className="text--semi-bold">Error</h1>
    <h3 className="text--light">Could not delete appointment</h3>
  </section>
  <img
    className="appointment__error-close"
    src="images/close.png"
        alt="Close"
        onClick={props.onClose}
  />
</main>
  );
}
export function ErrorSave(props) {
  return (
   <main className="appointment__card appointment__card--error">
  <section className="appointment__error-message">
    <h1 className="text--semi-bold">Error</h1>
    <h3 className="text--light">Could not save appointment</h3>
  </section>
  <img
    className="appointment__error-close"
    src="images/close.png"
        alt="Close"
        onClick={props.onClose}
  />
</main>
  );
}