import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import User from '../Screen/User'
import Admin from '../Screen/Admin'
import LoginScreen from '../Screen/LoginScreen'


const TestNavigator = createStackNavigator({
    User: User,
    Admin:Admin,
    Login:LoginScreen
},{
    initialRouteName:'Login'
})

export default createAppContainer(TestNavigator)