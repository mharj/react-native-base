import {Types} from '../reducers';

/**
 * @param {string} etag
 * @return {void}
 */
export const getHome = (etag) => (dispatch, getState) => {
	dispatch({type: Types.app.LOADING});
	setTimeout(() => {
		//  ajax delay 1sec
		const headers = {};
		if (etag) {
			headers['if-none-match'] = etag;
		}
		fetch('https://jsonplaceholder.typicode.com/todos/1', {headers: headers})
			.then((response) => {
				let etag = null;
				if (response.status === 304) {
					return null;
				} else {
					if (response.headers.has('ETag')) {
						etag = response.headers.get('ETag').replace(/"/g, '');
					}
					return response.json().then((json) => {
						return {etag, json};
					});
				}
			})
			.then((data) => {
				if (data) {
					const {etag, json} = data;
					if (json && json.title) {
						dispatch({type: Types.app.LOADING_DONE, value: json.title, etag: etag});
					} else {
						throw new Error('no value found!');
					}
				} else {
					dispatch({type: Types.app.LOADING_NO_CHANGE});
				}
			})
			.catch((error) => {
				dispatch({type: Types.app.LOADING_ERROR, error});
			});
	}, 1000);
};

export const doLogin = (username, password) => (dispatch, getState) => {
	if ( username === 'test' && password === 'password') {
		return Promise.resolve( dispatch({type: Types.app.LOGIN}) );
	} else {
		return Promise.reject( dispatch({type: Types.app.LOGIN_ERROR, error: new Error('account or password not match')}) );
	}
};

export const doLogout = () => (dispatch, getState) => {
	return Promise.resolve( dispatch({type: Types.app.LOGOUT}) );
};
