import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

// Screens
import List from './src/screens/List'
import Add from './src/screens/Add'
import Detail from './src/screens/Detail'
import Edit from './src/screens/Edit'

const MainStack = createStackNavigator(
	{
		List,
		Add,
		Detail,
		Edit,
	},
	{
		initialRouteName: 'List',
		defaultNavigationOptions: {
			header: null,
		},
	},
)

const AppContainer = createAppContainer(MainStack)

const App = () => {
	return <AppContainer />
}

export default AppContainer
