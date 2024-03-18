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
    Autocomplete,
    Checkbox,
} from '@mui/material';

import * as eventsAPI from '../../utilities/events-api';
import * as restaurantsAPI from '../../utilities/restaurants-api';
import * as usersAPI from '../../utilities/users-api';

export default function EventForm({ user }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        invitedUsers: [],
    });
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

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

    useEffect(() => {
        const fetchUserRestaurants = async () => {
            try {
                const userRestaurants = await restaurantsAPI.fetchRestaurants();
                setLocations(userRestaurants);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch restaurants.');
            }
        };
        fetchUserRestaurants();
    }, []);

    useEffect(() => {
        const fetchPossibleInvitedUsers = async () => {
            try {
                const allButCurrentUsers = await usersAPI.allButCurrentUser();
                setAllUsers(allButCurrentUsers);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch users.');
            }
        };
        fetchPossibleInvitedUsers();
        console.log('all users:', allUsers);
    }, [user]);

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
            <Autocomplete
                id='location-autocomplete'
                options={locations}
                getOptionLabel={(option) => option.name}
                value={
                    locations.find(
                        (location) => location._id === form.location
                    ) || null
                }
                onChange={(event, newValue) => {
                    setForm((prevForm) => ({
                        ...prevForm,
                        location: newValue ? newValue._id : '',
                    }));
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Location'
                        variant='outlined'
                        required
                    />
                )}
            />
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
                            <Checkbox
                                checked={form.invitedUsers.includes(user._id)}
                            />
                            {user.name}
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
