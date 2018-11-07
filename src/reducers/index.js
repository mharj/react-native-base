import {combineReducers} from 'redux';
import {reducer as AppReducer, Types as AppTypes} from './appReducer';

const Types = {
	app: AppTypes,
};

const rootReducer = combineReducers({
	app: AppReducer,
});

export {rootReducer, Types};
