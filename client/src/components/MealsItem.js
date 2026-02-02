import { useState, useContext } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { CartContext } from "../store/CartContext";
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Grid, TextField, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const MealsItem = ({ item, setIsOpen, setContent }) => {
  const { user, updateMeal, removeMeal } = useContext(ItemsContext);
  const { id, name, description, price, image } = item;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const UserButton = () => {
    const { addCartItem } = useContext(CartContext);

    async function handleAddToCart() {
      addCartItem(item);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }

    return (
    <>
      <Button variant="text" size="small" onClick={() => handleAddToCart()}>Add to Cart</Button>
    </>
    )
  }  

  const AdminButtons = () => {
   return (
    <>
      <Button variant="text" size="small" onClick={() => {setIsOpen(true); setContent(<UpdateForm />)}}>Update</Button>
      <Button variant="text" size="small" onClick={() => {setIsOpen(true); setContent(<DeleteForm />)}}>Delete</Button>
    </>
   ) 
  }

  async function handleUpdate(newName, newDescription, newPrice) {
    setLoading(true);

    if (!newName || !newDescription || !newPrice) {
      setError("All fields are required!");
      return;
    }

    if (newPrice < 0) {
      setError("Price cannot be negative!");
      return;
    }

    const updatedItem = {
      name: newName,
      description: newDescription,
      price: newPrice,
      image
    }

    await updateMeal(id, updatedItem);

    setIsOpen(false);
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    await removeMeal(id);
    setIsOpen(false);
    setLoading(false);
  }

  const UpdateForm = () => {
    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);
    const [newPrice, setNewPrice] = useState(price);

    return (
      <>
        <Typography variant="h4">Update Food Item</Typography>
        <TextField id="outlined-basic" type="text" label="Name" variant="outlined" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <TextField id="outlined-basic" type="text" label="Description" variant="outlined" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <TextField id="outlined-basic" type="number" label="Price" variant="outlined" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} /> 

        {error && <Typography variant="body2" color="red">{error}</Typography>}
        {loading && <Typography variant="body2" color="green">Loading...</Typography>}

        <Grid container spacing={2}>
          <Grid size={6}>
            <Button variant="outlined" sx={{width:"100%"}} onClick={() => handleUpdate(newName, newDescription, newPrice)} disabled={loading}>Update</Button>
          </Grid>
          <Grid size={6}>
            <Button variant="outlined" sx={{width:"100%"}} onClick={() => setIsOpen(false)} disabled={loading}>Cancel</Button>
          </Grid>
        </Grid>
      </>
    )
  }

  const DeleteForm = () => {
    return (
      <>
        <Typography variant="h4">Are you sure you want to delete item?</Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Button variant="outlined" sx={{width:"100%"}} onClick={() => handleDelete()} disabled={loading}>Delete</Button>
          </Grid>
          <Grid size={6}>
            <Button variant="outlined" sx={{width:"100%"}} onClick={() => setIsOpen(false)} disabled={loading}>Cancel</Button>
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <Card variant="outlined" sx={{width:"300px",maxWidth:"400px"}}>

      <CardMedia component="img" height="194" image={image} />
      <CardContent>

        <Grid container>
          <Grid size={9}>
            <Typography variant="h6" >{name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{description}</Typography>
          </Grid>
          <Grid size={3}>
            <Typography variant="h6" >RM{price}</Typography>
          </Grid>
        </Grid>

      </CardContent>

      <CardActions>
        {user ? <UserButton /> : <AdminButtons />}
      </CardActions>

      {showAlert && (
        <Alert severity="success" icon={<CheckIcon />} >
          Item added! +1
        </Alert>
      )}

    </Card>
  )
}

export default MealsItem;