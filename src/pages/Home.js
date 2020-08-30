import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Alert, ImageBackground, ScrollView, SafeAreaView, Image, StyleSheet } from 'react-native';
import { userList, userAuthLog } from '../actions/userAction';
import { connect } from 'react-redux';
import logout from './images/logout.jpg';
import headerbg from './images/headerbg.jpg';
import Logo from './images/chatlogo.png';
import AsyncStorage from '@react-native-community/async-storage';
import ActionBarImage from './ActionBarImage';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		this.props.onUserList();
	}

	goToChat = (userid,name) =>{
		this.props.navigation.navigate('Chat', { userid: userid, name:name});
	}

	componentDidUpdate(nextProps) {
		if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!== nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true) {
			this.setState({users:this.props.userReducer.userList});
		}

		if(this.props.userReducer && this.props.userReducer.userLogoutSuccess===true) {
			Alert.alert("Hey Buddy!!!","You Have Been Logged Out Successfully..");
			this.props.navigation.navigate('Login');
		}
	}

	async signout() {
		this.props.userAuthLog()
	}
/**/
	render() {
		const { users } = this.state;
		return ( 
            <HeaderImageScrollView
            maxHeight={150}
            minHeight={90}
            headerImage={require("./images/headerbg.jpg")}
            renderFixedForeground={() => (
            	<View style={styles.headerb}>
            	      <Image source={Logo} style={styles.image}/>
            	     <Text style={styles.TextStyle}>{ (this.props.userReducer && this.props.userReducer.userAuth? this.props.userReducer.userAuth.displayname: '')}'s Friend List</Text>
			    </View>
            )}
            renderForeground = { () => (
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                       <Text style={{color:'white', fontSize:18, marginTop:100, marginLeft: 10}}> Enjoy Chatting With Your Friends</Text>
                       <TouchableOpacity onPress= {()=> this.signout()}>
			             <Image source={logout} style={styles.ImageStyle} />
			         </TouchableOpacity>
                </View>
            	)}
            >
           
			<View style={styles.container}>
			{ users && users.length>0 ?

				<View>
				<SafeAreaView>
				<ScrollView style={styles.scrollview}>
				{
					users.map((item,index) => {
						if(this.props.userReducer && this.props.userReducer.userAuth && item._id != this.props.userReducer.userAuth._id) {
						return(<TouchableOpacity style={styles.opacity} key={index} onPress={()=> this.goToChat(item._id,item.displayname)}>
							<Text style={styles.item}> 
							{ item.displayname }</Text>
							<View style={{ borderBottomColor: 'black', borderBottomWidth:2, }}/>
							</TouchableOpacity>
                            
							)}})}
				</ScrollView>	
				</SafeAreaView>			
				</View>:null}
				
			</View>
			</HeaderImageScrollView>
			
	    
	)}
}

function mapStateToProps(state) {
	return {
		userReducer: state.userReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onUserList: () => dispatch(userList()),
		userAuthLog: () => dispatch(userAuthLog())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Home);

const styles = StyleSheet.create({
	container: {
		flex:1,
		paddingTop: 3,
		backgroundColor:'#00022f',
		marginBottom: 40
	},
	headerb: {
		height: 55,
		width: '100%',
		flexDirection:'row', 
		justifyContent: 'space-between',
		marginTop:25
	},
	TextStyle: {
		fontSize: 23,
		color: 'white',
		marginTop: 10,
		marginBottom: 10,
		marginRight: 80
	},
	scrollview: {
		backgroundColor: 'grey',
	},
	ImageStyle: {
		padding: 10,
		marginTop: 100,
		marginBottom: 5,
		marginRight:10,
		height: 34,
		width: 34,
		resizeMode: 'stretch',
		borderRadius: 40
	},
	item: {
		padding: 15,
		fontSize: 20,
		height: 65,
		marginLeft: 15,
	},
	opacity: {
		backgroundColor: '#e8e8e8'
	},
	image: {
		height:50,
		width:50,
		marginLeft: 8,
		marginTop: 4,
		marginRight: 8
	},
});