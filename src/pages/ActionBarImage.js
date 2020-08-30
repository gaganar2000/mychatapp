import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Logo from './images/chatlogo.png';

export default class ActionBarImage extends Component {
	render() {
		return (
			<View style={{ flexDirection:'row'}}>
             <Image source={Logo} style={{ width:50, height:50, borderRadius: 40 /2, margin: 15, marginRight: 15, marginTop:24 }}
             
             />
             <Text style={{borderRadius:1, color:'white'}}></Text>
             </View>
			);
	}
}