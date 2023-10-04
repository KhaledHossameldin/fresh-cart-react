import React from "react";

function ErrorLabel({ error, isTouched = true }) {
  if (!error || !isTouched) return <></>;
  return (
    <div className="alert alert-danger p-2 mb-3 mt-2" role="alert">
      {error}
    </div>
  );
}

export default ErrorLabel;
