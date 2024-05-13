import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import jwt_decode from 'jwt-decode'; 
import AuthService from '../utils/auth';
import { CREATE_POST, QUERY_POSTS } from '../utils/queries';
import { settings } from '../config/settings';
import '../assets/styles/pages/whispers.scss';
import { users } from '../data/whisperSampleData.js';

export default () => {
	const [inputText, setInputText] = useState('');
	const { loading: postsLoading, error: postsError, data: postsData } = useQuery(QUERY_POSTS);
	const [createPost] = useMutation(CREATE_POST, {
		refetchQueries: [{ query: QUERY_POSTS }],
	});

	const handleSendMessage = async (event) => {
		event.preventDefault();
		if (inputText.trim() !== '') {
			const token = AuthService.getToken();
			const decodedToken = jwt_decode(token);
			const userId = decodedToken.data._id;
			
			await createPost({
				variables: {
					user: userId,
					message: inputText,
				},
			});
			setInputText('');
		}
	};

	return (
		<main className={`whispers ${settings.themes.default}`}>
			<Helmet>
				<title>Whispers</title>
				<meta name="description" content="This is a place to have a discussion." />
			</Helmet>
			<MessageList loading={postsLoading} error={postsError} posts={postsData?.posts || []} />
			<ChatInput onSendMessage={handleSendMessage} inputText={inputText} setInputText={setInputText} />
			<UserList users={users} />
		</main>
	);
};

function MessageList({ loading, error, posts }) {
	const messageListRef = useRef(null);

	useEffect(() => {
		if (messageListRef.current) {
			messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
		}
	}, [posts]);

	if (loading) return <p>Loading posts...</p>;
	if (error) return <p>Error fetching posts: {error.message}</p>;
	
	return (
		<ul ref={messageListRef} className="whispers__message-list message-list">
			{posts.map((post) => (
				<Message key={post._id} message={post.message} user={post.user}/>
			))}
		</ul>
	);
}

function Message({ user, message }) {
    return (
        <li className="message-list__message message">
            {user && (
                <>
                    <div className="message__username">{user.username}:</div>
                    <p className="message__content">{message}</p>
                </>
            )}
        </li>
    );
}

function ChatInput({ onSendMessage, inputText, setInputText }) {
	const handleSubmit = (event) => {
		event.preventDefault();
		onSendMessage(event);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			onSendMessage(event);
		}
	};

	return (
		<form className="whispers__chat-input chat-input" onSubmit={handleSubmit}>
			<textarea
				className="chat-input__field"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button className="button icon chat-input__send-button" type="submit">
				send
			</button>
		</form>
	);
}

function UserList({ users }) {
	return (
		<ul className="whispers__user-list user-list">
			{users.map((user) => (
				<User key={user.id} {...user} />
			))}
		</ul>
	);
}

function User({ username }) {
	return <li className="user-list__user user">{username}</li>;
}
