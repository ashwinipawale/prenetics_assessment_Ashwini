import { userConstants } from '../_constants';

export function genResult(state = {}, action) {
  switch (action.type) {
    case userConstants.GETGENRESULT_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETGENRESULT_SUCCESS:
      return {
        items: action.genResult
      };
    case userConstants.GETGENRESULT_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}