import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Logo from './images/chatlogo.png';
import User from './images/images.png';
import Pswd from './images/pswd.jpeg';
import Background from './images/backgrounds.jpg';
import LinearGradient from 'react-native-linear-gradient'
import { userLogin, userAuth} from '../actions/userAction';
import { connect } from 'react-redux'; 
import Toast from 'react-native-simple-toast';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
		};
         this.validateForm = this.validateForm.bind(this);
	}
	handleEmail = (text) => {
		this.setState({ email: text })
	}
	handlePassword = (text) => {
		this.setState({ password: text })
	}

	validateForm() {
		const { errors } = this.state;
		const emailaddr = this.state.email;
		const pass = this.state.password;
		const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
		if (emailaddr === '') {
			errors.email = "Email address cannot be empty.";
		}
        	else if (emailaddr.length > 0 && !reg.test(emailaddr)) {
			errors.email = "Please provide correct email address";
		}
		else {
			errors.email = '';
		}

		if(pass === '') {
			errors.pass = "Password cannot be empty.";
		}
		else if (pass && pass.length < 5) {
			errors.pass = "Password should be more than 5 characters.";
		}
		else {
			errors.pass ='';
		}
		this.setState({ errors })
		if(errors.email==='' && errors.pass==='') {
            const userinfo = {
            	email: this.state.email,
            	password: this.state.password
            }
            this.props.onLogin(userinfo)
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
			<ImageBackground source={Background} style={styles.background}>
			    <View style = {styles.container}>
			        <Image source={Logo} style={styles.image}/>
			        <Text style={styles.display}> MyChat </Text>
                    <View style={styles.SectionStyle}>
                        <Image source={User} style={styles.ImageStyle} />
			            <TextInput style = {styles.input}
			                underlinecolorAndroid = "transparent"
			                placeholder = "Email"
			                placeholderTextColor = "black"
			                autoCapitalize = "none"
			                onChangeText = {this.handleEmail}/>
			       </View> 
			      <Text style={styles.errorstyle}>{errors.email}</Text>

                  <View style={styles.SectionStyle}>
                        <Image source={Pswd} style={styles.ImageStyle} />
   			            <TextInput style = {styles.input}
			                underlinecolorAndroid = "transparent"
			                placeholder = "Password"
			                type = "password"
			                placeholderTextColor = "black"
			                autoCapitalize = "none"
			                secureTextEntry={true}
			                onChangeText = {this.handlePassword}/>
			      </View>

			     <Text style={styles.errorstyle}>{errors.pass}</Text>
                  
			      <TouchableOpacity style = {styles.submitButton}
			                       onPress = {
			                       	() => this.validateForm()
			                       }>
			       <Text style= {styles.submitButtonText}> Login </Text>
                  </TouchableOpacity>
                  <Text style={styles.signin}> Are you a new user??</Text>
                  <TouchableOpacity style = {styles.submitButton}
			                       onPress = {
			                       	() => this.props.navigation.navigate('Register')}>
			       <Text style= {styles.submitButtonText}> Register</Text>
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
		onLogin: (userinfo) => dispatch(userLogin(userinfo)),
		
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Login);


const styles = StyleSheet.create(
{
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex:1,
	},
	background:{
		flex:1,
		width:420,
		height:660,
		alignItems: 'center',
		opacity: 4
	},
	input: {
		width: 260,
		padding: 10,
		fontSize: 16,
		lineHeight: 20,
		color: 'black'
	},
	image: {
		marginTop:'8%',
		width:150,
		borderRadius:1,
		height:150,
	},
	SectionStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: 'orange',
		height: 45,
		borderRadius: 50,
		marginTop: 10
	},
	ImageStyle: {
		padding: 10,
		margin: 5,
		height: 27,
		width: 27,
		resizeMode: 'stretch',
		alignItems:'center'
	},
	images: {
		width:150,
		height:49,
		marginBottom:'7%',
		borderRadius: 15
	},
	display:{
		fontSize: 30,
		fontWeight: 'bold',
		color:'orange',
		alignItems:'center',
		fontFamily: 'Times New Roman',
		marginBottom: '2%',
	},
	submitButton: {
		backgroundColor: 'yellow',
		width: 150,
		margin: 15,
		height: 45,
		marginTop: 10,
		borderRadius: 50,
		alignItems: 'center'
	},
	signin: {
		fontSize:15,
		color: 'white',
		marginTop:'10%',
	},
	submitButtonText: {
		color: 'black',
		fontSize: 18,
		fontWeight: 'bold',
		alignItems:'center',
		marginTop: 10
	},
	errorstyle: {
		fontSize: 13,
		color: "red",
		marginBottom: '5%',
		marginTop:'1%'
	},
	
})