import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            posts {
                _id
                message
            }
        }
    }
`;

export const QUERY_POSTS = gql`
    query posts {
        posts {
            _id
            message
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost($user: ID!, $message: String!) {
        createPost(input: { user: $user, message: $message }) {
            _id
            user {
                _id
                username
            }
            message
        }
    }
`;