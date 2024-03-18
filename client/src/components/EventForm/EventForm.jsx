import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    TextField,
    FormControlLabel,
    Switch,
    Box,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';

import * as eventsAPI from '../../utilities/events-api';

export default function EventForm({ user }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        invitedUsers: null,
    });
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]); // Placeholder for user's restaurants
    const [allUsers, setAllUsers] = useState([]); // Placeholder for all users

    // Fetch the list details (if we are editing rather than a new form)
    useEffect(() => {
        const fetchEventDetails = async () => {
            if (id) {
                try {
                    const eventDetails = await eventsAPI.fetchOwnedEvent(id);
                    setForm(eventDetails);
                } catch (error) {
                    console.error(error);
                    setError('Failed to fetch event details.');
                }
            }
        };
        fetchEventDetails();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleInvitedUsersChange = (event) => {
        const { value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            invitedUsers: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const eventData = {
            owner: user.sub,
            title: form.title,
            description: form.description,
            location: form.location,
            date: form.date,
            invitedUsers: form.invitedUsers,
        };
        try {
            if (id) {
                await eventsAPI.updateEvent(id, eventData);
            } else {
                await eventsAPI.createEvent(eventData);
            }
            setForm({
                title: '',
                description: '',
                location: '',
                date: '',
                invitedUsers: [],
            });
            setError(null);
            navigate('/events');
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
                label='Title'
                variant='outlined'
                id='title'
                name='title'
                value={form.title}
                onChange={handleChange}
                required
            />
            <TextField
                label='Description'
                variant='outlined'
                id='description'
                name='description'
                value={form.description}
                onChange={handleChange}
                required
            />
            <TextField
                variant='outlined'
                id='date'
                name='date'
                type='date'
                value={form.date}
                onChange={handleChange}
                required
            />
            <FormControl variant='outlined' sx={{ m: 1, width: '25ch' }}>
                <InputLabel id='location-label'>Location</InputLabel>
                <Select
                    labelId='location-label'
                    id='location'
                    name='location'
                    value={form.location}
                    onChange={handleChange}
                    label='Location'
                    required>
                    {locations.map((location) => (
                        <MenuItem key={location._id} value={location._id}>
                            {location.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant='outlined' sx={{ m: 1, width: '25ch' }}>
                <InputLabel id='invited-users-label'>Invited Users</InputLabel>
                <Select
                    labelId='invited-users-label'
                    id='invited-users'
                    name='invitedUsers'
                    multiple
                    value={form.invitedUsers}
                    onChange={handleInvitedUsersChange}
                    label='Invited Users'>
                    {allUsers.map((user) => (
                        <MenuItem key={user._id} value={user._id}>
                            {user.username}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {error && <Alert severity='error'>{error}</Alert>}
            <Box sx={{ mt: 2 }}>
                <Button
                    type='submit'
                    variant='contained'
                    disabled={!form.title}>
                    {id ? 'Update Event' : 'Create Event'}
                </Button>
            </Box>
        </Box>
    );
}
