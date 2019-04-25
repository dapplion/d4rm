import wrapActions from "utils/wrapActions";

const types = {
  setId: "setId",
  setTo: "setTo",
  setNetwork: "setNetwork",
  setAddress: "setAddress"
};

const actions = {
  setId: id => ({ id }),
  setTo: to => ({ to }),
  setNetwork: network => ({ network }),
  setAddress: address => ({ address })
};

export const mapDispatchToActions = dispatch =>
  wrapActions(actions, types, dispatch);

export function reducer(submit, action) {
  /**
   * Reducers are in the same order as types and actions
   */
  switch (action.type) {
    case types.setId:
      return { ...submit, id: action.id };
    case types.setTo:
      return { ...submit, to: action.to };
    case types.setNetwork:
      return { ...submit, network: action.network };
    case types.setAddress:
      return { ...submit, address: action.address };

    default:
      throw new Error("Unknown action");
  }
}
