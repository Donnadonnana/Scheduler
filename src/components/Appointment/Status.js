import React from "react";
export  function StatusSave(props) {
  return (
    <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 className="text--semi-bold">Saving...</h1>
</main>
  );
}

export function StatusDelete(props) {
  return (
    <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 className="text--semi-bold">Deleting...</h1>
</main>
  );
}