const USER_FORMS = "USER_FORMS";
const EDITED_FORM = "EDITED_FORM";

export function getUserForms() {
  const userFormsString = localStorage.getItem(USER_FORMS);
  if (!userFormsString) return [];
  try {
    return JSON.parse(userFormsString);
  } catch (e) {
    console.error(`Error parsing user forms: ${e.stack}`);
    return {};
  }
}

export function setUserForms(userForms) {
  try {
    const userFormsString = JSON.stringify(userForms);
    localStorage.setItem(USER_FORMS, userFormsString);
  } catch (e) {
    console.error(`Error storing userForm: ${e.stack}`);
  }
}

export function storeUserForm(hash, form) {
  console.log("storing user form");
  setUserForms({
    ...getUserForms(),
    [hash]: {
      title: form.title,
      lastOpenned: Date.now()
    }
  });
}

export function removeUserForm(hash) {
  const userForms = getUserForms();
  delete userForms[hash];
  setUserForms(userForms);
}

// Edited form

export function getEditedForm() {
  try {
    const formString = localStorage.getItem(EDITED_FORM);
    return formString ? JSON.parse(formString) : null;
  } catch (e) {
    console.error(`Error getting user edited form: ${e.stack}`);
  }
}

export function setEditedForm(form) {
  try {
    const formString = JSON.stringify(form);
    localStorage.setItem(EDITED_FORM, formString);
  } catch (e) {
    console.error(`Error storing user edited form: ${e.stack}`);
  }
}

export function clearEditedForm() {
  localStorage.removeItem(EDITED_FORM);
}
