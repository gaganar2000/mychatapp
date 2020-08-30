import React, {Component } from 'react'
import { Text, View, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from './images/chatlogo.png';
import Bg from './images/bg2.jpeg';
import { userAuth} from '../actions/userAction';
import { connect } from 'react-redux'; 

class Welcome extends Component {  
     
     constructor(props) {
		super(props);
		this.state = {
			userAuth: []
		};
	}
     componentDidMount() {
     	this.props.userAuth();

     	setTimeout( () => 
     	{ 
     		this.limit();}, 3000);
    }

    /*setTimeout(() => {
             this.props.navigation.navigate('Login');
		}, 3000);*/

	limit() {
		if(this.state.userAuth && this.state.userAuth.displayname) {
			console.log(this.state.userAuth)
			this.props.navigation.navigate('Home');
		}
		else
		{
		    console.log(this.props.userAuth)
			this.props.navigation.navigate('Login');	
		}

	}
    
    componentDidUpdate(nextProps) {
		if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!== nextProps.userReducer.userAuth && this.props.userReducer.userAuthSuccess===true) {
			//this.props.navigation.navigate('Home');
			this.setState( { userAuth: this.props.userReducer.userAuth});
			//this.state.userAuth = this.props.userReducer.userAuth;
		}
	}


    render() {
	
		return (
			      <View style={styles.container}>
			      <ImageBackground source={Bg} style={styles.background}>
		          <View style={styles.container}>
		              <Image source={Logo} style={styles.image}/>
		              <Text style={styles.display}>Welcome to</Text>
		              <Text style={styles.display}>MyCHAT</Text>
		              <Text style={styles.display}>Application</Text>
		              <TouchableOpacity style = {styles.submitButton}
			                       onPress = {
			                       	() => this.props.navigation.navigate('Login')}>
			       <Text style= {styles.submitButtonText}> Let's Get Started</Text>
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
		userAuth: () => dispatch(userAuth())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Welcome);

const styles = StyleSheet.create(
{
	container:{
		flex:1,
		alignItems:'center'
	},
	background:{
		flex:1,
		width:'100%',
		height:'100%',
		alignItems: 'center',
		opacity: 2,
	},
	image: {
		marginTop: '40%',
		width:170,
		height:170,
		marginBottom: '5%',
		borderRadius: 40,
		alignItems: 'center'
		
	},
	display:{
		fontSize: 30,
		fontWeight: 'bold',
		color:'black',
		alignItems:'center',
		fontFamily: 'Times New Roman'
	},
	submitButton: {
		backgroundColor: 'black',
		width: 170,
		margin: 15,
		height: 45,
		marginTop: 20,
		borderRadius: 15,
		alignItems: 'center'
	},
	submitButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		alignItems:'center',
		marginTop: 10
	},
});