import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    TextField,
    Box,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Chip,
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
                    const eventDetails = await eventsAPI.fetchEvent(id);

                    // Assume locations state is already populated correctly
                    const eventDate = new Date(eventDetails.date);
                    const formattedDate = eventDate.toISOString().split('T')[0];
                    setForm({
                        ...eventDetails,
                        date: formattedDate,
                        invitedUsers: Array.isArray(eventDetails.invitedUsers)
                            ? eventDetails.invitedUsers
                                  .map((user) => user._id) // Extract _id values
                                  .filter((id) => Boolean(id)) // Filter out falsy values like undefined, null, or ''
                            : [],
                        location: eventDetails.location
                            ? eventDetails.location._id
                            : '',
                    });
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
                    label='Invited Users'
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={
                                        allUsers.find(
                                            (user) => user._id === value
                                        )?.name
                                    }
                                    sx={{ m: 0.5 }}
                                />
                            ))}
                        </Box>
                    )}>
                    {allUsers.map((user) => (
                        <MenuItem key={user._id} value={user._id}>
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
