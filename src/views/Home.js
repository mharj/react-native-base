import React from 'react';
import {translate} from 'react-i18next';
import {Text, View} from 'react-native';

class Home extends React.Component {
	render() {
		const {t} = this.props;
		return (
			<View>
				<Text>{t('hello')} {t('world')}</Text>
			</View>
		);
	}
}

export default translate()(Home);
