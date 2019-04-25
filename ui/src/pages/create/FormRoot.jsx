import React, { useState, useEffect } from "react";
import {
  storeUserForm,
  setEditedForm,
  getEditedForm,
  clearEditedForm
} from "services/userForms";
import isSubmitValid from "./isSubmitValid";
import isFormValid from "./isFormValid";
import useDebouncedCallback from "use-debounce/lib/callback";
// Components
import FormEditor from "./FormEditor";
import SubmitEditor from "./SubmitEditor";
import FormDisplay from "pages/form/FormDisplay";
import SubmitDisplay from "./SubmitDisplay";
import Section from "components/Section";
import Link from "components/Link";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// Styles
import "./create.scss";

const emptyForm = {
  title: "",
  description: "",
  questions: [{ text: "", options: [] }]
};
const emptySubmit = {
  to: "",
  network: ""
};

function FormRoot() {
  const [initialForm, setInitialForm] = useState(emptyForm);
  const [initialSubmit, setInitialSubmit] = useState(emptySubmit);
  const [form, _setForm] = useState(initialForm);
  const [submit, _setSubmit] = useState(initialSubmit);
  // Upload process
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [hash, setHash] = useState("");

  const steps = ["Create form", "Choose submimission", "Publish"];

  /**
   * Persist the form being edited.
   * Use debouncing to prevent too many calls to JSON.stringify
   */
  const [debouncedCallback] = useDebouncedCallback(setEditedForm, 1000, []);
  function setForm(newForm) {
    _setForm(newForm);
    debouncedCallback({ ...newForm, submit });
  }
  function setSubmit(newSubmit) {
    _setSubmit(newSubmit);
    debouncedCallback({ ...form, submit: newSubmit });
  }

  useEffect(() => {
    const userEditedForm = getEditedForm();
    if (userEditedForm) {
      setInitialForm({
        title: userEditedForm.title,
        description: userEditedForm.description,
        questions: userEditedForm.questions
      });
      setInitialSubmit(userEditedForm.submit);
    }
  }, []);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <FormEditor {...{ setForm, initialForm }} />;
      case 1:
        return <SubmitEditor {...{ setSubmit, initialSubmit }} />;
      case 2:
        return (
          <>
            <Section className="submit-mechanism">
              {uploading ? (
                <>
                  <p>Uploading...</p>
                  <LinearProgress />
                </>
              ) : error ? (
                <div style={{ color: "red" }}>Error publishing: {error}</div>
              ) : (
                <>
                  <div className="title">Review and confirm form</div>
                  <Section style={{ opacity: 0.75 }}>
                    <FormDisplay {...{ ...form, disabled: true }} />
                    <SubmitDisplay {...{ submit }} />
                  </Section>
                </>
              )}
            </Section>
          </>
        );
      case 3:
        return (
          <>
            <Section>
              <p>Form successfully uploaded</p>
              <Link to={`/${hash}`}>
                <Button variant="contained" color="primary">
                  View form
                </Button>
              </Link>
            </Section>
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  async function publish() {
    setUploading(true);
    setError("");
    setHash("");
    try {
      const formObj = {
        title: form.title,
        description: form.description,
        questions: form.questions,
        submit: {
          to: submit.to,
          network: submit.network,
          address: submit.address
        }
      };
      console.log("Uploading form object", formObj);
      const hash = await window.add(formObj);
      setHash(hash);
      storeUserForm(hash, formObj);
      setActiveStep(3);
      // Clear stored data
      clearEditedForm();
      setInitialForm(emptyForm);
      setInitialSubmit(emptySubmit);
    } catch (e) {
      console.error(`Error uploading formObj: ${e.stack}`);
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  const [activeStep, setActiveStep] = useState(0);

  const disableNext =
    (activeStep === 0 && !isFormValid(form)) ||
    (activeStep === 1 && !isSubmitValid(submit));

  return (
    <div id="create" className="site-width main-section">
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}
        <div style={{ marginTop: "2rem" }}>
          {activeStep < steps.length && (
            <>
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(s => s - 1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={disableNext}
                onClick={() => {
                  if (activeStep === 2) publish();
                  else setActiveStep(s => s + 1);
                }}
              >
                {activeStep === steps.length - 1 ? "Publish" : "Next"}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-5" />
    </div>
  );
}

export default FormRoot;
