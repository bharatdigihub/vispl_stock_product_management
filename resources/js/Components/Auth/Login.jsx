import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../Contexts/ThemeContext';

const Login = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            if (response.status === 200) {
                window.location.href = '/dashboard';
            } else {
                setError('Invalid email or password.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className={`tw-flex tw-items-center tw-justify-center tw-min-h-screen ${theme.background}`}>
            <div className={`tw-bg-white tw-shadow-lg tw-rounded-2xl tw-p-8 tw-w-full tw-max-w-lg ${theme.header}`}>
                <h2 className={`tw-text-3xl tw-font-bold tw-mb-6 tw-text-center ${theme.text}`}>Welcome Back</h2>
                {error && (
                    <p className="tw-text-red-500 tw-mb-4 tw-text-center tw-bg-red-100 tw-p-2 tw-rounded">
                        {error}
                    </p>
                )}
                <form onSubmit={handleLogin} className="tw-space-y-6">
                    <div>
                        <label className={`tw-block tw-font-semibold tw-mb-2 ${theme.text}`}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="tw-w-full tw-border tw-border-gray-300 tw-px-4 tw-py-2 tw-rounded-lg tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className={`tw-block tw-font-semibold tw-mb-2 ${theme.text}`}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="tw-w-full tw-border tw-border-gray-300 tw-px-4 tw-py-2 tw-rounded-lg tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`tw-w-full tw-bg-indigo-500 tw-text-white tw-py-3 tw-rounded-lg tw-transition tw-duration-300 hover:tw-bg-indigo-600`}
                    >
                        Login
                    </button>
                </form>
                <div className="tw-mt-6 tw-text-center">
                    <p className={`tw-text-sm ${theme.text}`}>
                        Don't have an account?{' '}
                        <a href="/register" className="tw-text-indigo-500 hover:tw-underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
