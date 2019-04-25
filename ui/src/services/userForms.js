const localStorageKey = "userForms";

export function getUserForms() {
  const userFormsString = localStorage.getItem(localStorageKey);
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
    localStorage.setItem(localStorageKey, userFormsString);
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
