import { Box, Container, Typography } from '@mui/material';

export default function RestaurantDetail({ restaurant }) {
    const apiKey = import.meta.env.VITE_apikey;
    return (
        <Container maxWidth='sm'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='flex-start'
                mt={4}>
                {restaurant ? (
                    <>
                        <Typography variant='h5' gutterBottom>
                            {restaurant.name}
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            {restaurant.formatted_address}
                        </Typography>
                        <div
                            style={{
                                width: '100%',
                                height: '0',
                                paddingBottom: '56.25%',
                                position: 'relative',
                            }}>
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(
                                    restaurant.name +
                                        ' ' +
                                        restaurant.formatted_address
                                )}`}
                                style={{
                                    border: 0,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                                loading='lazy'
                                allowFullScreen></iframe>
                        </div>
                    </>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </Box>
        </Container>
    );
}
