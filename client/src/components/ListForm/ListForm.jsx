import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as listsAPI from '../../utilities/lists-api';

export default function ListForm({ user }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        public: false,
    });
    const [error, setError] = useState(null);

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
            await listsAPI.addAList(listData);
            setForm({
                name: '',
                public: false,
            });
            setError(null);
            navigate('/lists');
        } catch (error) {
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
                Add List
            </button>
        </form>
    );
}
