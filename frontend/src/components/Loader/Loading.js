import React from "react";
import { Spinner } from "react-bootstrap";
import './Loader.css'

function Loading() {
  return (
    <div className="loader-container"
    >
      <Spinner className="spinner"
        animation="border"
      />
    </div>
  );
}

export default Loading;
