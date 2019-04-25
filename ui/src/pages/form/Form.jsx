import React, { useState, useEffect } from "react";
import { storeUserForm } from "services/userForms";
import fetchForm from "services/fetchForm";
import fetchSubmissions from "services/fetchSubmissions";
// Components
import Answer from "./Answer";
import Results from "./Results";
import Loading from "components/Loading";
import Section from "components/Section";
import Link from "components/Link";
import Button from "@material-ui/core/Button";

// Styles
import "./form.scss";

let cachedSubmissionsHash;
function Form({ match }) {
  const { hash, showResults } = match.params;

  const [form, setForm] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFormEffect() {
      try {
        setLoading(true);
        const _form = await fetchForm(hash);
        setForm(_form);
        console.log(`Fetched form for ${hash}`, _form);
        storeUserForm(hash, _form);
      } catch (e) {
        setError(e.message);
        console.error(`Èrror fetching form: ${e.stack}`);
      } finally {
        setLoading(false);
      }
    }
    if (hash) fetchFormEffect();
  }, [hash]);

  useEffect(() => {
    async function fetchSubmissionsEffect() {
      try {
        setLoading(true);
        const _submissions = await fetchSubmissions({
          address: form.submit.address,
          questions: form.questions
        });
        setSubmissions(_submissions);
        console.log(`Fetched submissions for ${hash}`, _submissions);
        cachedSubmissionsHash = hash;
      } catch (e) {
        setError(e.message);
        console.error(`Èrror fetching submissions: ${e.stack}`);
      } finally {
        setLoading(false);
      }
    }
    if (form && showResults && cachedSubmissionsHash !== hash)
      fetchSubmissionsEffect();
  }, [showResults, form]);

  return (
    <div className="site-width main-section">
      <Section id="form">
        {loading ? (
          <Loading />
        ) : !form ? (
          <h5>No form</h5>
        ) : showResults ? (
          <Results {...{ form, submissions }} />
        ) : (
          <Answer {...{ form }} />
        )}

        {form &&
          (showResults ? (
            <Link to={`/${hash}`}>
              <Button>Back to form</Button>
            </Link>
          ) : (
            <Link to={`/${hash}/results`}>
              <Button>See Results</Button>
            </Link>
          ))}

        {error && <h5>Error: {error}</h5>}
      </Section>
    </div>
  );
}

export default Form;

// Utilities
