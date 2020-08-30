import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Chat from './pages/Chat';

const AuthStackNavigator = createStackNavigator({
	Welcome: {
		screen: Welcome,
		},
	Login: {
		screen: Login,
	},		
	Register: {
		screen: Register,
	},		
}, { headerMode: 'none'});


const AppStackNavigator = createStackNavigator({
	Home: {
		screen: Home, 
		navigationOptions: {
			headerShown: false,
		},
	},
	Chat: {
		screen: Chat,
		navigationOptions: {
			headerShown: true,
		},
	},
});

const SwitchNavigator = createSwitchNavigator({
	AuthLoading: AuthStackNavigator,
	App: AppStackNavigator
	},
	{
		initialRouteName: 'AuthLoading',
});
const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;