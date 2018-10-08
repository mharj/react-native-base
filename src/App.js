import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {withNamespaces} from 'react-i18next';
import {connect} from 'react-redux';
import {Route, NativeRouter as Router, Link} from 'react-router-native';
import Home from './views/Home';
import Login from './views/Login';
import Secret from './views/Secret';
import PrivateRoute from './components/PrivateRoute';

class App extends React.Component {
	render() {
		const {isLoggedIn, t, i18n} = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Welcome to React</Text>
				</View>
				<Router>
					<View>
						<View style={styles.nav}>
							<Button onPress={() => i18n.changeLanguage('fi')} title={t('fin')} color="#66f" />
							<Button onPress={() => i18n.changeLanguage('en')} title={t('eng')} color="#66f" />
							<Button onPress={() => i18n.changeLanguage('sv')} title={t('sve')} color="#66f" />
						</View>
						<View style={styles.nav}>
							<Link to="/" style={styles.navItem} underlayColor="#99f">
								<Text style={styles.navTextItem}>{t('home')}</Text>
							</Link>
							<Link to="/login" style={styles.navItem} underlayColor="#99f">
								<Text style={styles.navTextItem}>{t('login')}</Text>
							</Link>
							<Link to="/secret" style={isLoggedIn?styles.navItem:styles.navItemDisabled} underlayColor="#99f">
								<Text style={styles.navTextItem}>{t('secret')}</Text>
							</Link>
						</View>
						<View style={styles.main}>
							<Route exact={true} path="/" component={Home} />
							<Route exact={true} path="/login" component={Login} />
							<PrivateRoute isValid={isLoggedIn} failPath="/login" exact={true} path="/secret" component={Secret} />
						</View>
					</View>
				</Router>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 1,
		paddingTop: 40,
	},
	header: {
		backgroundColor: '#000',
	},
	title: {
		color: '#fff',
	},
	main: {
		flex: 1,
		paddingTop: 10,
	},
	nav: {
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	navItem: {
		alignItems: 'center',
		padding: 13,
		backgroundColor: '#66f',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
	},
	navItemDisabled: {
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#999',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
	},
	navTextItem: {
		color: '#fff',
	},
});
const mapStateToProps = (state) => {
	return {
		error: state.app.error,
		isLoading: state.app.isLoading,
		isLoggedIn: state.app.isLoggedIn,
	};
};
export default connect(mapStateToProps)(withNamespaces()(App));
