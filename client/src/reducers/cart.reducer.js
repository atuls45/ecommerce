import { RETRIVELCART, RETRIVELADDDATA, RETRIVELCARTCOUNT, RETRIVELDELETEDATA } from '../actions/cart.action';

const postState = {
  user: undefined,
  postlist: undefined,
  columnlist: undefined
};

const handlers = {
  [RETRIVELCART]: (_, action) => ({
    cartData: action,
    postlist: undefined
  }),
  [RETRIVELCARTCOUNT]: (_, action) => ({
    cartCountData: action,
    postlist: undefined
  }),
  [RETRIVELADDDATA]: (_, action) => ({
    addData: action,
    addlist: undefined
  }),
  [RETRIVELDELETEDATA]: (_, action) => ({
    deleteData: action,
    addlist: undefined
  })
};

export default function cartReducer(state = postState, action) {
  const handler = handlers[action.type];
  if (!handler) {
    return state;
  }

  const resultOfDispatchedAction = handler(state, action);
  return { ...state, ...resultOfDispatchedAction };
}
