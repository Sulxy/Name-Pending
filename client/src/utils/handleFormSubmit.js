import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useHistory from 'react-router-dom'

// Creating a new user
import { CREATE_USER } from './mutations';

const useHandleFormSubmit = () => {
    const [error, setError] = useState('');
    const history = useNavigate(); // Initialize useHistory hook
    const [registerUser, { loading, error: mutationError }] = useMutation(CREATE_USER);

    const handleFormSubmit = async (userData) => {
        try {
            const { data } = await registerUser({
                variables: { input: userData },
            });

            const authToken = data.createUser.token;
            localStorage.setItem('authToken', authToken);

            // Redirect to home upon successful registration
            history.push('/');
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                setError(error.graphQLErrors[0].message);
            } else {
                setError('Registration failed');
            }
        }
    };

    return { handleFormSubmit, error, loading, mutationError };
};

export default useHandleFormSubmit;
