import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    TextField,
    FormControlLabel,
    Switch,
    Box,
    Alert,
} from '@mui/material';

import * as listsAPI from '../../utilities/lists-api';

export default function ListForm({ user }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        public: false,
    });
    const [error, setError] = useState(null);

    // Fetch the list details (if we are editing rather than a new form)
    useEffect(() => {
        const fetchListDetails = async () => {
            if (id) {
                try {
                    const listDetails = await listsAPI.fetchList(id);
                    setForm(listDetails);
                } catch (error) {
                    console.error(error);
                    setError('Failed to fetch list details.');
                }
            }
        };
        fetchListDetails();
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const listData = {
            name: form.name,
            public: form.public,
            owner: user.sub,
        };
        try {
            if (id) {
                await listsAPI.updateList(id, listData);
            } else {
                await listsAPI.addAList(listData);
            }
            setForm({ name: '', public: false });
            setError(null);
            navigate('/lists');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <Box
            component='form'
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit}>
            <TextField
                label='Name'
                variant='outlined'
                id='name'
                name='name'
                value={form.name}
                onChange={handleChange}
                required
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={form.public}
                        onChange={handleChange}
                        name='public'
                        color='secondary'
                    />
                }
                label='Public List'
            />
            {error && <Alert severity='error'>{error}</Alert>}
            <Box sx={{ mt: 2 }}>
                <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disabled={!form.name}>
                    {id ? 'Update List' : 'Add List'}
                </Button>
            </Box>
        </Box>
    );
}
