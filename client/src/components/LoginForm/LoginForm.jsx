import { useState } from 'react';
import { login } from '../../utilities/users-service';

export function LoginForm({ setUser }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await login(form);
            setUser(user);
        } catch (e) {
            console.error(e);
            setError(`Incorrect username or password.`);
        }
    };

    const disable = !form.email || !form.password;

    return (
        <div>
            <div className={`form-container`}>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type='submit' disabled={disable}>
                        Login
                    </button>
                </form>
            </div>
            <p className='error-message'>{error}</p>
        </div>
    );
}
