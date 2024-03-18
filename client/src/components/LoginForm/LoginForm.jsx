import { useState } from 'react';
import { login } from '../../utilities/users-service';

import {
    Container,
    Grid,
    TextField,
    Button,
    Box,
    Typography,
} from '@mui/material';

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
        <Container maxWidth='sm'>
            <Box sx={{ mt: 4, padding: 2, borderRadius: 2 }}>
                <Typography
                    variant='h4'
                    component='h1'
                    gutterBottom
                    align='center'>
                    Login
                </Typography>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                            <Button
                                fullWidth
                                type='submit'
                                variant='contained'
                                disabled={disable}>
                                Login
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
