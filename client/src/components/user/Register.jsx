import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations.js';
import Auth from '../../utils/auth.js';
import { AppContext } from '../../pages/Home.jsx';
import { useTranslation } from 'react-i18next';
import '../../config/i18n.js';
import '../../assets/styles/components/loginregister.scss';

const Register = () => {
    const { setIsLogin } = useContext(AppContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [createUser] = useMutation(CREATE_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createUser({
                variables: { ...formState },
            });
            Auth.login(data.createUser.token);
            navigate('/Whispers');
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    };

    return (
        <>
            <Helmet>
                <title>{t('register.page.title')}</title>
                <meta name="description" content={t('register.page.description')} />
            </Helmet>

            <form className="form register-form" onSubmit={handleFormSubmit}>
                <header className="form__header">
                    <h2 className="form__title">{t('register.formTitle')}</h2>
                    <Link className="link form__link" onClick={() => setIsLogin(true)} to="#">
                        {t('register.linkText')}
                    </Link>
                </header>

                <div className="form__row register-form__row--username">
                    <label className="form__label form__label--username" htmlFor="username">{t('register.username')}</label>
                    <input className="form__input form__input--username" type="text" name="username"
                        placeholder={t('register.username')} onChange={handleChange} value={formState.username} />
                </div>

                <div className="form__row register-form__row--email">
                    <label className="form__label form__label--email" htmlFor="email">{t('register.email')}</label>
                    <input className="form__input form__input--email" type="email" name="email" placeholder={t('register.email')} onChange={handleChange} value={formState.email} />
                </div>

                <div className="form__row register-form__row--password">
                    <label className="form__label form__label--password" htmlFor="password">{t('register.password')}</label>
                    <input className="form__input form__input--password" type="password" name="password"
                        placeholder={t('register.password')} onChange={handleChange} value={formState.password} />
                </div>

                <div className="form__row register-form__row--confirm">
                    <label className="form__label form__label--confirm-password"
                        htmlFor="confirmpassword">{t('register.passConfirm')}</label>
                    <input className="form__input form__input--confirm-password" type="password" name="confirmpassword"
                        placeholder={t('register.passConfirm')} />
                </div>

                <div className="form__row register-form__row--accept-terms">
                    <input className="form__input form__input--checkbox" type="checkbox" name="coppa" id="coppa" />
                    <label className="form__label form__label--checkbox"
                        htmlFor="coppa">{t('register.coppa')}</label>
                </div>

                <div className="form__row register-form__row--accept-terms">
                    <input className="form__input form__input--checkbox" type="checkbox" name="terms" id="terms" />
                    <label className="form__label form__label--checkbox"
                        htmlFor="terms">{t('register.terms')}</label>
                </div>

                <div className="form__row register-form__row--submit">
                    <button className="form__button form__button--submit" type="submit">{t('register.button')}</button>
                </div>

                <div className="form__message form__message--error">{error}</div>
            </form>
        </>
    );
}

export default Register;
