import { put, takeLatest } from 'redux-saga/effects';

function* setUser(action) {
    try {
        yield put({type: "USER_SUBMITED", data: action.payloads});
     } catch (e) {
        yield put({type: "USER_REJECTED", message: e.message});
     }
  }

export default function* mySaga() {
  yield takeLatest("SET_USER", setUser);
}
