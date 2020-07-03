import { RETRIVELPRODUCT, RETRIVELADDDATA, RETRIVELEDITATA, RETRIVELDELETEDATA } from '../actions/product.action';

const postState = {
  user: undefined,
  postlist: undefined,
  columnlist: undefined,
  importStatus: ''
};

const handlers = {
  [RETRIVELPRODUCT]: (_, action) => ({
    productData: action,
    postlist: undefined,
    importStatus: ''
  }),
  [RETRIVELADDDATA]: (_, action) => ({
    addData: action,
    addlist: undefined
  }),
  [RETRIVELEDITATA]: (_, action) => ({
    editData: action,
    addlist: undefined
  }),
  [RETRIVELDELETEDATA]: (_, action) => ({
    deleteData: action,
    addlist: undefined
  })
};

export default function productReducer(state = postState, action) {
  const handler = handlers[action.type];
  if (!handler) {
    return state;
  }

  const resultOfDispatchedAction = handler(state, action);
  return { ...state, ...resultOfDispatchedAction };
}
