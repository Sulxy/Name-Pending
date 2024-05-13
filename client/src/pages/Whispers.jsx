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
	const [activeStyle, setActiveStyle] = useState(Object.keys(settings.messages.list)[0]);
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
			<MessageList activeStyle={activeStyle} loading={postsLoading} error={postsError} posts={postsData?.posts || []} />
			<ChatInput onSendMessage={handleSendMessage} inputText={inputText} setInputText={setInputText} />
			<ChatStyle activeStyle={activeStyle} setActiveStyle={setActiveStyle}/>
			<UserList users={users} />
		</main>
	);
};

function MessageList({ messages, activeStyle, loading, error, posts }) {
	// reference to the message list for auto scroll
	const messageListRef = useRef(null);

	// Auto scroll when posts updated
	useEffect(() => {
		if (messageListRef.current) {
			messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
		}
	}, [posts]);

	// handle loading state
	if (loading) return <p>Loading posts...</p>;

	// handle error state
	if (error) return <p>Error fetching posts: {error.message}</p>;

	const messageListClasses = `whispers__message-list message-list ${activeStyle}`;

	return (
		<ul ref={messageListRef} className={messageListClasses}>
			{messages.map(message => <Message
				key={message.id}
				{...message}
				timestamp={format(new Date(message.timestamp), settings.timeFormat)}
			/>)}
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

function ChatStyle({ activeStyle, setActiveStyle }) {
	const handleStyleChange = (styleKey) => {
		if (activeStyle !== styleKey) setActiveStyle(styleKey);
		// TODO: Save settings for logged in user.
	};

	const styleClasses = React.useMemo(() => {
		return Object.keys(settings.messages.list).map((key) => {
			return {
				key,
				classNames: [
					            'chat-styles__icon',
					            `chat-styles__icon--${key}`,
					            activeStyle === key ? 'active' : '',
				            ].join(' '),
				label: key,
			};
		});
	}, [activeStyle]);

	return (
		<ul className="whispers__chat-styles chat-styles">
			{Object.keys(settings.messages.list).map((styleKey) => (
				<li
					key={styleKey}
					onClick={() => handleStyleChange(styleKey)}
					className={`chat-styles__icon ${styleKey} ${activeStyle === styleKey ? 'active' : ''}`}>
					{settings.messages.list[styleKey]}
				</li>
			))}
		</ul>
	);}

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
