import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
        console.log(listData);
        try {
            if (id) {
                await listsAPI.updateList(id, listData); // Assuming you have an updateList API utility
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='public'>Public List:</label>
                <input
                    type='checkbox'
                    id='public'
                    name='public'
                    checked={form.public}
                    onChange={handleChange}
                />
            </div>
            <button type='submit' disabled={!form.name}>
                {id ? 'Update List' : 'Add List'}
            </button>
        </form>
    );
}
