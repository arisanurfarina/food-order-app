import { useState, useContext } from "react";
import { CartContext } from "../store/CartContext";
import { ItemsContext } from "../store/ItemsContext";
import { Modal, Box, Typography, Grid, Button, Stack, Divider } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,

  display: "flex",
  flexDirection: "column",
  gap: 3,

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
};

const CartItem = ({ item }) => {
  const { addCartItem, removeCartItem } = useContext(CartContext);
  const { name, price, quantity } = item;

  return (
    <Grid container spacing={1} marginBottom={1} >
      <Grid size={8}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">RM{price}</Typography>
      </Grid>
      <Grid size={4} display="flex" justifyContent="center" alignItems="center">
        <Stack direction="row" spacing={1} sx={{justifyContent:"center", alignItems:"center"}}>
          <Button variant="outlined" size="small" sx={{minWidth:"20px"}} onClick={() => removeCartItem(item.id)}>-</Button>
          <Typography variant="body1">{quantity}</Typography>
          <Button variant="outlined" size="small" sx={{minWidth:"20px"}} onClick={() => addCartItem(item)}>+</Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

const Cart = ({ isOpen, setIsOpen }) => {
  const { cartItems, totalAmount } = useContext(CartContext);
  const { addOrder } = useContext(ItemsContext);

  const [loading, setLoading] = useState(false);

  const cartItemsList = cartItems.map(item => {
    return <CartItem key={item.id} item={item} />
  });

  async function addOrderHandler() {
    setLoading(true);

    const item = {
      cartItems,
      totalAmount 
    }

    await addOrder(item);

    setIsOpen(false);
    setLoading(false);
  }

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={style}>
        <Typography variant="h4">Your Cart</Typography>

        <div style={{maxHeight: 250, overflowY: "auto"}}>
          { cartItems && cartItems.length > 0 ? cartItemsList : <Typography variant="body1">Your cart is empty.</Typography> }
        </div>
        
        <Grid container spacing={2}>
          <Grid size={8}>Total Amount</Grid>
          <Grid size={4} sx={{textAlign:"right"}}>RM{totalAmount}</Grid>
        </Grid>

        {loading && <Typography variant="body2" color="green">Loading...</Typography>}

        <Grid container spacing={2}>
          <Grid size={6}>
            <Button variant="outlined" sx={{width:"100%"}} onClick={() => setIsOpen(false)}>Close</Button>
          </Grid>
          <Grid size={6}>
            <Button variant="outlined" sx={{width:"100%"}} onClick={() => addOrderHandler()} disabled={loading || cartItems.length === 0}>Order</Button>
          </Grid>
        </Grid>
        
      </Box>
    </Modal>
  )
}

export default Cart;