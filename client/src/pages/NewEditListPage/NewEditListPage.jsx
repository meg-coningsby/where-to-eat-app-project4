import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

import ListForm from '../../components/ListForm/ListForm';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

export default function NewEditListPage({ user }) {
    const location = useLocation();
    const isNewList = location.pathname === '/lists/new';

    const pageTitle = isNewList ? 'Add a New List' : 'Edit List';

    usePageTitle(pageTitle);

    return (
        <Container maxWidth='md'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='flex-start'
                mt={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    {isNewList ? 'Add a New List' : 'Edit List'}
                </Typography>
                <ListForm user={user} />
            </Box>
        </Container>
    );
}
