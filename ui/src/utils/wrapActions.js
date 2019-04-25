export default function wrapActions(actions, types, dispatch) {
  const wrappedActions = {};
  for (const [type, action] of Object.entries(actions)) {
    if (!types[type]) throw Error(`No type defined for action key: ${type}`);
    wrappedActions[type] = (...args) =>
      dispatch({ type: types[type], ...action(...args) });
  }
  return wrappedActions;
}
