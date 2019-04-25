import React, { useState, useEffect } from "react";
import { getUserForms } from "services/userForms";
import timeAgo from "utils/timeAgo";
// Components
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from "components/Link";
// Styles
import FormatListNumbered from "@material-ui/icons/FormatListNumbered";
import OpenInNew from "@material-ui/icons/OpenInNew";
import "./home.scss";

function FormPreview({ hash, title, lastOpenned }) {
  return (
    <Link to={`/${hash}`}>
      <Paper className="form-preview">
        <FormatListNumbered className="miniature" />
        <div className="formTitle">{title}</div>
        <div className="bottom">
          <span className="time">Openned {timeAgo(lastOpenned)}</span>{" "}
          {/* <Clear onClick={() => removeUserForm(hash)} /> */}
          <OpenInNew />
        </div>
      </Paper>
    </Link>
  );
}

function Home() {
  const [userForms, setUserForms] = useState([]);
  useEffect(() => {
    const _userForms = Object.entries(getUserForms())
      .map(([hash, form]) => ({
        ...form,
        hash
      }))
      .sort((a, b) => b.lastOpenned - a.lastOpenned);
    console.log("Got user forms", _userForms);
    setUserForms(_userForms);
  }, []);

  console.log(userForms);

  return (
    <div id="home">
      <section>
        <div className="site-width">
          <div className="title">
            Decentralized forms, for decentralized projects
          </div>
          <p>Finally a way to collect feedback in a decentralized way</p>
          <Link to="/create">
            <Button variant="contained" color="primary">
              Start a new form
            </Button>
          </Link>

          {Boolean(userForms.length) && (
            <div className="recent-forms">
              <div className="sub-title">Recent forms</div>
              <div className="user-forms">
                {userForms.map(({ hash, title, lastOpenned }) => (
                  <FormPreview key={hash} {...{ hash, title, lastOpenned }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="site-width">
          <div className="title">Show the world that you believe in Web3</div>
          <p>
            Stop relying on google's tools to do the marketing of your
            decentralized project. Embrace the Web3 concept on corner of your
            DApp user experience.
          </p>
          <p>
            <a
              href="https://github.com/dapplion/d4rm"
              style={{ textDecoration: "none" }}
            >
              Show me the source code
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
