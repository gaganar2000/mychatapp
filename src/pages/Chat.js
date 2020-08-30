import React, {Component } from 'react'
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Background from './images/chatbg.jpeg'
import { connect } from 'react-redux';
import { chatInsert, chatList } from "../actions/chatAction";
import SocketIOClient from 'socket.io-client';
import { SERVERURL } from '../../config';
import ActionBarImage from './ActionBarImage';
import headerbg from './images/headerchat3.jpeg';

type Props = {
	name?: string,
};

class Chat extends Component {  

    static navigationOptions = ({ navigation }) => ({
    	title: (navigation.state.params || {}).name || 'Chat!!',
    	headerBackground: () =>
    		<Image style={{height:60, width:'100%'}} source={headerbg}/>,
    	headerRight: ()=> <ActionBarImage />,
		headerStyle: {
			backgroundColor: "black",
		},
		headerTintColor: "black",
		headerTitleStyle: {
			marginLeft: 15,
			fontSize: 20,
			alignItems: 'center',
			color:'black'
		},
    });

	state = { userid:this.props.navigation.state.params.userid, 
			           name:this.props.navigation.state.params.name,
			           messages: []
	    };
	   
	componentDidMount() {
		this.socket = SocketIOClient('http://192.168.43.221:8082');
		const data = {
			receiver_id: this.state.userid,
			sender_id: this.props.userReducer.userAuth._id
		};
		this.socket.emit('getMessage', data);
		this.socket.on('receiveMessage', (chatlist) => {
			if(chatlist) {
				this.setState({messages: chatlist });
			}

		});
	}

	/*componentDidUpdate(nextProps) {

		if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess===true) {
			this.setState({
				messages: this.props.chatReducer.chatList
			})
		}
	}*/

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages ),
		}))
	}

    submitChatMessage(messages = []) {
    	const date = new Date();
    	this.onSend(messages)
    	let details = {
    		user: {
    			_id: this.props.userReducer.userAuth._id
    		},
    		receiver_id: this.state.userid,
    		sender_id: this.props.userReducer.userAuth._id,
    		chatdate: date,
    		text: messages && messages[0] && messages[0].text
    	}
    	this.socket.emit('chatMessage', details);
    }

    renderBubble = (props) => {
    	return (<Bubble {...props}
    		textStyle={{
    			right: {
    				color: '#000000',
    			},
    			left: {
    				color:'#000000',
    			},
    		}}
    		timeTextStyle={{
    			right: {
    				color: '#000000',
    			},
    			left: {
    				color:'#000000',
    			},
    		}}
    		wrapperStyle={{
    			left: {
    				backgroundColor: '#FFFFFF',
    			},
    			right: {
    				backgroundColor:'#FFD700',
    			}
    		}} />
    		);
    }
    render() {
		return ( 
			<ImageBackground source={Background} style = {{ flex:1}}>
            <GiftedChat
            messages={this.state.messages}
            onSend={ messages => this.submitChatMessage(messages)}
            scrollToBottom
            renderBubble={this.renderBubble}

            user={{
            	_id: this.props.userReducer.userAuth._id,
            }}
            />
            
            </ImageBackground>
			)
	}
}

function mapStateToProps(state)
{
	return {
		chatReducer: state.chatReducer,
		userReducer: state.userReducer
	};
}

function mapDispatchToProps(dispatch)
{
	return {
		onChatMessage: (chatMessage) => dispatch(chatInsert(chatMessage)),
		onGetMessage: (data) => dispatch(chatList(data)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chat);

const styles = StyleSheet.create(
{
	background:{
		flex:1,
		width:415,
		height:739,
	}
})