import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export function AuthPage({ setUser }) {
    const [toggleLogin, setToggleLogin] = useState(false);
    return (
        <>
            <h1>Auth Page</h1>
            {toggleLogin ? (
                <>
                    <LoginForm setUser={setUser} />
                    <div>
                        Don't have an account?
                        <Link
                            to=''
                            onClick={() => setToggleLogin(!toggleLogin)}>
                            Sign up
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <SignUpForm setUser={setUser} />
                    Have an account?
                    <Link to='' onClick={() => setToggleLogin(!toggleLogin)}>
                        Login
                    </Link>
                </>
            )}
        </>
    );
}
