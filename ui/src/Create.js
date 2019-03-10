import React from "react";

export default class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      questions: [{ title: "awesome question", answers: ["ahhh", "booooh"] }]
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <h3>Type your form title</h3>
        </div>
        <div className="col">
          <h3>TITLE</h3>
        </div>
      </div>
    );
  }
}
