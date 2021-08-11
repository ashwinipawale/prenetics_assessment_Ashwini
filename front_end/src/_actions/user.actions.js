import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getProfile,
    getGeneticResult
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getProfile() {
    return dispatch => {
        dispatch(request());
        
        userService.getProfile()
        .then(
            profile => dispatch(success(profile)),
            error => dispatch(failure(error.toString()))
        );
    };

    function request() { return { type: userConstants.GETPROFILE_REQUEST } }
    function success(profile) { return { type: userConstants.GETPROFILE_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.GETPROFILE_FAILURE, error } }
}

function getGeneticResult() {
    return dispatch => {
        dispatch(request());
        
        userService.getGeneticResult()
        .then(
            genResult => dispatch(success(genResult)),
            error => dispatch(failure(error.toString()))
        );
    };

    function request() { return { type: userConstants.GETGENRESULT_REQUEST } }
    function success(genResult) { return { type: userConstants.GETGENRESULT_SUCCESS, genResult } }
    function failure(error) { return { type: userConstants.GETGENRESULT_FAILURE, error } }
}