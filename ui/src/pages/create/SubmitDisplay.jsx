import React from "react";
import fromCamelCase from "utils/fromCamelCase";

export default function SubmitDisplay({ submit }) {
  return (
    <>
      <h5>Submissions</h5>
      <p>
        Submit to {fromCamelCase(submit.to)} at {submit.network}{" "}
        {submit.address}
      </p>
    </>
  );
}
