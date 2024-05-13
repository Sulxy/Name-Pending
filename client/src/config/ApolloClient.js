import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: '/graphql', // replace with your GraphQL server URI
});

// Use setContext function to set authentication headers for every request made by Apollo Client
// It fetches authentication token from localStorage, and if present, adds it to the Authorization header
const authLink = setContext((_, { headers }) => {
	// Replace 'auth_token' with your real local storage token key
	const token = localStorage.getItem('auth_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

// Instantiate ApolloClient with the authentication link and the created httpLink and an instance of InMemoryCache
// The link is actually a middleware that Apollo Client uses to modify requests before they are sent to the server
const client = new ApolloClient({
	                                link:  authLink.concat(httpLink),
	                                // Apollo Client uses this cache for caching responses and local state management
	                                cache: new InMemoryCache()
                                });

// Export the client
export default client;
