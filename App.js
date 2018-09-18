import React from 'react';
import RootApp from './src/App';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import configureStore from './configureStore';

let {store, persistor} = configureStore();

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<I18nextProvider i18n={i18n}>
						<RootApp />
					</I18nextProvider>
				</PersistGate>
			</Provider>
		);
	}
}
