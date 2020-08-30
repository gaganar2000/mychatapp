import React, { Component } from 'react';
import {Text, Image, Alert, TouchableOpacity,ImageBackground, TextInput, StyleSheet, View} from 'react-native';
import logo from './images/chatlogo.png';
import backgrounds from './images/backgrounds.jpg';
import Toast from 'react-native-simple-toast';
import { userRegister, userAuth } from '../actions/userAction';
import { connect } from 'react-redux'; 

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			displayname: '',
			email: '',
			password: '',
			errors: {},
		};
		this.validateForm = this.validateForm.bind(this);
	}
	handleName = (text) => {
		this.setState ({ name: text})
	}
	handleDisplayname = (text) => {
		this.setState ({ displayname: text})
	}
	handleEmail = (text) => {
		this.setState ({ email: text })
	}
	handlePassword = (text) => {
		this.setState ({ password: text})
	}

    componentDidMount() {
		this.props.userAuth()
	}
	validateForm() {
		const { errors } = this.state;
		const names = this.state.name;
		const emailaddr = this.state.email;
		const pass = this.state.password;
		const display = this.state.displayname;
		const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
		if ( names ==='') {
			errors.names = "Name cannot be empty";
		}
		else if(names && names.length < 5) {
			errors.names = "Name should be more than 4 characters";
		}
		else {
			errors.names = '';
		}
		if ( display ==='') {
			errors.display = "Name cannot be empty";
		}
		else if(display && display.length < 5) {
			errors.display = "Name should be more than 4 characters";
		}
		else {
			errors.display = '';
		}
		if( emailaddr === '') {
			errors.emailaddr = "Email address cannot be null";
		}
		else if( emailaddr.length > 0 && !reg.test(emailaddr)) {
			errors.emailaddr = "Please provide correct email address";
		}
		else {
			errors.emailaddr = '';
		}
		if( pass === '') {
			errors.pass = "Password cannot be null";
		}
		else if ( pass && pass.length < 5) {
			errors.pass = "Password should be more than 5 characters";
		}
		else {
			errors.pass ='';
		}
		this.setState({ errors })
		if( errors.names==='' && errors.display==='' && errors.emailaddr === '' && errors.pass==='') {
			const userinfo = {
				name: this.state.name,
			displayname: this.state.displayname,
			email: this.state.email,
			password: this.state.password
			}
			this.props.onRegister(userinfo)
			//this.submitForm();
		}
	}

	componentDidUpdate(nextProps) {
		if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!== nextProps.userAuth && this.props.userReducer.userAuthSuccess===true) {
			this.props.navigation.navigate('Home');
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<View style={styles.container}>
			<ImageBackground source={backgrounds} style={styles.background}>
			<View style={styles.container}>
			      <Image style={styles.image} source = { logo}/>
                  <TextInput style={styles.input}
                        underlinecolorAndroid = "transparent"
                        placeholder = "Name"
                        placeholderTextColor = "black"
                        autoCapitalize = "words"
                        onChangeText = { this.handleName }/>
                  <Text style = {styles.errorstyle}>{ errors.names }</Text>

                  <TextInput style={styles.input}
                        underlinecolorAndroid = "transparent"
                        placeholder = "Display Name"
                        placeholderTextColor = "black"
                        autoCapitalize = "words"
                        onChangeText = { this.handleDisplayname }/>
                  <Text style = {styles.errorstyle}>{ errors.display }</Text>

                  <TextInput style={styles.input}
                        underinecolorAndroid = "transparent"
                        placeholder = "Email"
                        placeholderTextColor = "black"
                        onChangeText = { this.handleEmail}/>
                  <Text style = {styles.errorstyle}>{ errors.emailaddr }</Text>

                  <TextInput style={styles.input}
                       underinecolorAndroid = "transparent"
                       placeholder = "Password"
                       placeholderTextColor = "black"
                       secureTextEntry={true}
                       onChangeText = { this.handlePassword }/>
                  <Text style = {styles.errorstyle}>{ errors.pass }</Text>

                 <TouchableOpacity style={styles.submitButton}
                      onPress = {
                      	  () => this.validateForm()
                      }>
                      <Text style = {styles.submitButtonText}> Register </Text>
                 </TouchableOpacity>
                 <Text style={styles.signin}> Go to Login Page</Text>
                 <TouchableOpacity style = {styles.submitButton}
			                       onPress = {
			                       	() => this.props.navigation.navigate('Login')}>
			       <Text style= {styles.submitButtonText}> Login </Text>
                  </TouchableOpacity> 
            </View>
            </ImageBackground>
            </View>
        );
 	}
}
function mapStateToProps(state) {
	return {
		userReducer: state.userReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onRegister: (userinfo) => dispatch(userRegister(userinfo)),
		userAuth: () => dispatch(userAuth())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Register);


const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	background:{
		flex:1,
		width:'100%',
		height:'100%',
		alignItems: 'center',
	},
	input: {
		borderColor: "orange",
		borderRadius: 15,
		backgroundColor: 'white',
		marginTop: 5,
		height: 40,
		borderWidth: 2,
		width: 280,
		padding: 10,
		fontSize: 16,
		lineHeight: 20,
		color: 'black'
	},
	signin: {
		fontSize:15,
		color: 'white',
		marginTop:'7%',
	},
	submitButton: {
		backgroundColor: 'yellow',
		width: 200,
		margin: 15,
		height: 45,
		marginTop: 10,
		borderRadius: 50,
		alignItems: 'center'
	},
	submitButtonText: {
		color: 'black',
		fontSize: 18,
		fontWeight: 'bold',
		alignItems:'center',
		marginTop: 10,
		
	},
	errorstyle: {
		fontSize: 13,
		color: "red",
		marginBottom: 8
	},
	image: {
		width:150,
		height:150,
		borderRadius: 30,
		marginTop: '10%',
		marginBottom: '5%'
	}
})