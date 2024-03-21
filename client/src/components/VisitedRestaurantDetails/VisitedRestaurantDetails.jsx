import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    Box,
    Rating,
} from '@mui/material';

export default function VisitedRestaurantDetails({
    visited,
    onDeleteVisit,
    onViewDetails,
}) {
    return (
        <Card>
            <CardContent>
                <Typography variant='h6'>
                    <Link
                        to={`/restaurants/${visited.restaurant.googlePlaceId}`}
                        style={{
                            color: 'inherit',
                        }}>
                        {visited.restaurant.name}
                    </Link>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                    mt={1}>
                    <Typography variant='body2' color='text.secondary'>
                        {new Date(visited.visitDate).toLocaleDateString()}
                    </Typography>
                    {visited.rating && (
                        <Rating
                            name='read-only'
                            size='small'
                            value={visited.rating}
                            readOnly
                        />
                    )}
                </Box>
            </CardContent>
            <CardActions>
                {visited.comments && (
                    <Button
                        size='small'
                        color='secondary'
                        onClick={() => onViewDetails(visited.comments)}>
                        View Comments
                    </Button>
                )}
                <Button
                    size='small'
                    color='error'
                    onClick={() => onDeleteVisit(visited._id)}>
                    Delete Visit
                </Button>
            </CardActions>
        </Card>
    );
}
