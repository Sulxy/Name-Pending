// User.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

// Load CSS
import '../assets/styles/whispers.scss';

// Load sample data
import { users, messages } from '../data/whisperSampleData.js';

export default () => {
	const handleSendMessage = message => {}

	return (
		<main className="whispers">
			<Helmet>
				<title>Whispers</title>
				<meta name="description" content="This is a place to have a discussion."/>
			</Helmet>
			<MessageList messages={messages}/>
			<ChatInput onSendMessage={handleSendMessage}/>
			<UserList users={users}/>
		</main>
	);
}

function MessageList() {
	return (
		<ul className="whispers__message-list message-list">
			{messages.map(message => <Message key={message.id} {...message} />)}
		</ul>
	);
}

function Message({ userId, text }) {
	return (
		<li className="message-list__message message">
			<div className="message__username">{userId}</div>
			<div className="message__text">{text}</div>
		</li>
	);
}

function ChatInput({ onSendMessage }) {
	const [inputText, setInputText] = useState('');

	const handleSubmit = (event) => {};

	return (
		<form className="whispers__chat-input chat-input" onSubmit={handleSubmit}>
			<input className="chat-input__field" value={inputText} onChange={e => setInputText(e.target.value)}/>
			<button className="chat-input__send-button" type="submit">Send</button>
		</form>
	);
}

function UserList({ users }) {
	return (
		<ul className="whispers__user-list user-list">
			{users.map(user => <User key={user.id} {...user} />)}
		</ul>
	);
}

function User({ username }) {
	return (
		<li className="user-list__user user">{username}</li>
	);
}
