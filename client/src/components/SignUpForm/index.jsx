import { useState } from 'react';
import { signUp } from '../../utilities/users-service';

import {
    Container,
    Grid,
    TextField,
    Button,
    Box,
    Typography,
} from '@mui/material';

export function SignUpForm({ setUser }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        const userData = {
            name: form.name,
            email: form.email,
            password: form.password,
        };
        try {
            const user = await signUp(userData);
            setUser(user);
        } catch (e) {
            console.error(e);
            setError(`An error occurred with the sign up.`);
        }
    };

    const disable =
        !form.name ||
        !form.email ||
        !form.password ||
        form.password !== form.confirmPassword;

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 4, padding: 2, borderRadius: 2 }}>
                <Typography
                    variant='h4'
                    component='h1'
                    gutterBottom
                    align='center'>
                    Sign Up
                </Typography>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type='text'
                                name='name'
                                label='Name'
                                variant='outlined'
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type='email'
                                name='email'
                                label='Email'
                                variant='outlined'
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type='password'
                                name='password'
                                label='Password'
                                variant='outlined'
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type='password'
                                name='confirmPassword'
                                label='Confirm Password'
                                variant='outlined'
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                type='submit'
                                variant='contained'
                                disabled={disable}>
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {error && (
                    <Typography color='error' align='center' mt={2}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
