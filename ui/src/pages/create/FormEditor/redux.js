import { swapItems, deleteItem } from "utils/arrays";
import wrapActions from "utils/wrapActions";

const types = {
  setTitle: "setTitle",
  setDescription: "setDescription",
  addQuestion: "addQuestion",
  deleteQuestion: "deleteQuestion",
  addOption: "addOption",
  setText: "setText",
  setOption: "setOption",
  moveOptionUp: "moveOptionUp",
  moveOptionDown: "moveOptionDown",
  deleteOption: "deleteOption"
};

const actions = {
  setTitle: title => ({ title }),
  setDescription: description => ({ description }),
  addQuestion: () => {},
  deleteQuestion: i => ({ i }),
  addOption: i => ({ i }),
  setText: (i, text) => ({ i, text }),
  setOption: (i, j, text) => ({ i, j, text }),
  moveOptionUp: (i, j) => ({ i, j }),
  moveOptionDown: (i, j) => ({ i, j }),
  deleteOption: (i, j) => ({ i, j })
};

export const mapDispatchToActions = dispatch =>
  wrapActions(actions, types, dispatch);

export function reducer(form, action) {
  /**
   * Custom reducer helpers to isolate the logic
   */
  const updateQuestions = fn => ({
    ...form,
    questions: fn(form.questions)
  });
  const updateQuestion = (i, fn) =>
    updateQuestions(questions =>
      Object.assign([], questions, {
        [i]: { ...questions[i], ...fn(questions[i]) }
      })
    );
  const updateOption = (i, j, option) =>
    updateQuestion(i, question => ({
      options: Object.assign([], question.options, { [j]: option })
    }));

  /**
   * Reducers are in the same order as types and actions
   */
  switch (action.type) {
    case types.setTitle:
      return { ...form, title: action.title };
    case types.setDescription:
      return { ...form, description: action.description };

    case types.addQuestion:
      return updateQuestions(questions => [
        ...questions,
        { text: "", options: [] }
      ]);
    case types.deleteQuestion:
      return updateQuestions(questions => deleteItem(questions, action.i));

    case types.addOption:
      return updateQuestion(action.i, question => ({
        options: [...question.options, ""]
      }));
    case types.setText:
      return updateQuestion(action.i, () => ({ text: action.text }));
    case types.setOption:
      return updateOption(action.i, action.j, action.text);
    case types.moveOptionUp:
      return updateQuestion(action.i, question => ({
        options: swapItems(question.options, action.j, action.j - 1)
      }));
    case types.moveOptionDown:
      return updateQuestion(action.i, question => ({
        options: swapItems(question.options, action.j, action.j + 1)
      }));
    case types.deleteOption:
      return updateQuestion(action.i, question => ({
        options: deleteItem(question.options, action.j)
      }));
    default:
      throw new Error("Unknown action");
  }
}
