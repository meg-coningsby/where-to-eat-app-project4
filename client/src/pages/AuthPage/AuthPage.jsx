import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Box, Typography } from '@mui/material';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

export default function AuthPage({ setUser }) {
    const [toggleLogin, setToggleLogin] = useState(true);

    usePageTitle('Auth Page');

    return (
        <>
            {toggleLogin ? (
                <>
                    <LoginForm setUser={setUser} />
                    <Box mt={2} textAlign='center'>
                        <Typography variant='body2'>
                            Don't have an account?{' '}
                            <Link
                                to=''
                                onClick={() => setToggleLogin(!toggleLogin)}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <SignUpForm setUser={setUser} />
                    <Box mt={2} textAlign='center'>
                        <Typography variant='body2'>
                            Have an account?{' '}
                            <Link
                                to=''
                                onClick={() => setToggleLogin(!toggleLogin)}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </>
            )}
        </>
    );
}
