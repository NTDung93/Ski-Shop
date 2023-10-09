import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, Avatar } from '@mui/material';
import { Product } from '../../app/models/product';
import { NavLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/utils/utils';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync } from '../basket/basketSlice';

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            ></CardHeader>
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.imageUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={status.includes('pendingAddItem' + product.id)}
                    onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
                    size="small">
                    Add to cart
                </LoadingButton>
                <Button component={NavLink} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}