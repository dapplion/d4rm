import React, { Component } from 'react';
import parseHash from './parseHash' 


export default class Share extends Component {
  constructor() {
    super();
  }


  render() {
    const hash = parseHash()
    return (
        <div>
            <h3>Your dForm lives in this link</h3>
            <p>Finally a way to collect feedback in a decentralized way!!</p>
            <form>
                <div className="input-group">
                    <input type="text" className="form-control" value={`https://d4rm.io/form/${hash}`} placeholder="Some path" id="copy-input"/>
                </div>
            </form>
        </div>
    );
  }
}
