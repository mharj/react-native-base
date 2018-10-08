import React from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import actions from '../actions';

class Home extends React.Component {
	componentDidMount() {
		this.props.getHome(this.props.etag);
	}
	render() {
		const {t} = this.props;
		return (
			<View>
				<Text>{t('hello')} {t('world')}</Text>
				<Text>{this.props.value}</Text>
			</View>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		value: state.app.value,
		etag: state.app.etag,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(translate()(Home));
