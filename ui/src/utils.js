export function getUnique(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);
  return unique;
}

export function areAnswersFulfilled(answers, questions) {
  if (!questions || !answers) return false;
  for (let i = 0; i < questions.length; i++) {
    if (!(i in answers)) return false;
  }
  return true;
}

export function endWithQuestionMark(s) {
  if (!s) return s;
  if (s.endsWith("?")) return s;
  else return s + "?";
}
