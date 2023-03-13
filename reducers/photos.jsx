const types = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

const actionCreators = {
  loading: () => ({type: types.LOADING}),
  failure: () => ({type: types.FAILURE}),
  success: (photos, page) => ({
    type: types.SUCCESS,
    payload: {photos, page},
  }),
};

export {actionCreators};
