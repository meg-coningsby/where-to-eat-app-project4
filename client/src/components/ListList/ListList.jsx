import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    CardActions,
    Button,
} from '@mui/material';

export default function ListList({ lists }) {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', margin: '0 auto', paddingTop: 4 }}>
            <Grid container spacing={2}>
                {lists.map((list) => (
                    <Grid item key={list._id} xs={12} sm={6} md={4}>
                        <Link
                            to={`/lists/${list._id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}>
                            <Card
                                sx={{
                                    width: '100%',
                                    '&:hover': { boxShadow: 6 },
                                }}>
                                <CardContent>
                                    <Typography variant='h5' component='div'>
                                        {list.name}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size='small'
                                        color='secondary'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/lists/${list._id}`);
                                        }}>
                                        View List Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
