import React from "react";
import { error } from "../assets/images";

function Error() {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <img src={error} alt="404 not found" />
    </div>
  );
}

export default Error;
