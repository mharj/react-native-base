import {Reducer, AnyAction} from 'redux';

export interface IState {
	isLoading: boolean,
	isLoggedIn: boolean,
	value: any,
	etag: string | null,
	error: Error | null,
}

export const reducer:Reducer<IState> = (state:IState, action: AnyAction) =>{}