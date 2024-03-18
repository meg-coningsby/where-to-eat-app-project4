import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

export default function ListList({ lists }) {
    return (
        <Box sx={{ width: '80%', margin: '0 auto', paddingTop: 4 }}>
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
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
