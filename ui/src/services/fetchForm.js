import ipfs from "services/ipfs";

function validateForm(form) {
  if (!form.title) throw Error("Invalid form: Must contain a title");
  if (!form.questions || !Array.isArray(form.questions))
    throw Error("Invalid form: Must contain questions");
  if (!form.submit)
    throw Error("Invalid form: Must contain submit specification");

  // Make old forms compatible
  // ###### DEV remove
  form.questions = form.questions.map(({ text, title, options, answers }) => ({
    text: text || title,
    options: options || answers
  }));
  return form;
}

export default async function fetchForm(hash) {
  if (!ipfs.isHash(hash)) throw Error(`Invalid IPFS hash: ${hash}`);
  let form = await ipfs.cat(hash);
  form = validateForm(form);
  return form;
}
