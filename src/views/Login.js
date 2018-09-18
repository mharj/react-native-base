import React from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import actions from '../actions';
import {withRouter} from 'react-router-native';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: 'test',
			password: 'password',
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	handleLogin() {
		this.props
			.doLogin(this.state.username, this.state.password)
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				// ignore
			});
	}
	handleLogout() {
		this.props
			.doLogout()
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				// ignore
			});
	}
	render() {
		const {isLoggedIn, t} = this.props;
		return (
			<View>
				{isLoggedIn ? (
					<View>
						<Button onPress={this.handleLogout} title={t('logout')} color="#66f" />
					</View>
				) : (
					<View>
						<Text>Username:</Text>
						<TextInput style={styles.input} autoFocus={true} onChangeText={(text) => this.setState({username: text})} value={this.state.username} />
						<Text>Password:</Text>
						<TextInput
							style={styles.input}
							autoCapitalize={'none'}
							secureTextEntry={true}
							onChangeText={(text) => this.setState({password: text})}
							value={this.state.password}
						/>
						<Button onPress={this.handleLogin} title={t('login')} color="#66f" />
					</View>
				)}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 40,
		//		borderColor: 'red',
		//		borderWidth: 1,
	},
});
const mapStateToProps = (state) => {
	return {isLoggedIn: state.app.isLoggedIn};
};

export default withRouter(
	connect(
		mapStateToProps,
		actions,
	)(translate()(Login)),
);
