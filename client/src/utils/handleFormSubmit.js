import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from './mutations';
import { useNavigate } from 'react-router-dom';

const useHandleFormSubmit = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [registerUser, { loading, error: mutationError }] = useMutation(CREATE_USER);

    const handleFormSubmit = async (userData) => {
        try {
            const { data } = await registerUser({
                variables: { ...userData },
            });

            const authToken = data.createUser.token;
            localStorage.setItem('authToken', authToken);

            // Redirect to home upon successful registration
            navigate('/'); // Use navigate to redirect to home
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
