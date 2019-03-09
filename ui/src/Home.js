import React, { Component } from 'react';

export default class Share extends Component {
  render() {
    return (
        <div>
            <h5>Decentralized forms, for decentralized projects</h5>
            <p>Finally a way to collect feedback in a decentralized way!!</p>
            <a href={`${window.location.origin}/#/form/QmckmTWYsSTgwsgBj45HAqRirC8WNXLo7FRr11tdN6yboY`}>Check a demo form</a>
        </div>
    );
  }
}
