import { useState, useContext } from 'react';
import { ItemsContext } from '../store/ItemsContext';
import { Typography, Grid, Modal, Box, Button, TextField } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,

  display: "flex",
  flexDirection: "column",
  gap: 2,

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
};

const AdminForm = ({ isOpen, setIsOpen }) => {
  const { uploadImage, addMeal } = useContext(ItemsContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function addItemHandler() {
    setLoading(true);

    if (!name || !description || !price || !file) {
      setError("All fields are required!");
      return;
    }

    if (price < 0) {
      setError("Price cannot be negative!");
      return;
    }

    const responseImg = await uploadImage(file);

    const newItem = {
      name,
      description,
      price,
      image: responseImg  
    }

    await addMeal(newItem);

    setIsOpen(false);
    setLoading(false);
  }

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={style}>
        <Typography variant="h4">Add Food Item</Typography>
        <TextField id="outlined-basic" type="text" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField id="outlined-basic" type="text" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField id="outlined-basic" type="number" label="Price" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} /> 

        <input type="file" accept="image/*" id='fileInput' onChange={(e) => setFile(e.target.files[0])} />

        {error && <Typography variant="body2" color="red">{error}</Typography>}
        {loading && <Typography variant="body2" color="green">Loading...</Typography>}

        <Grid container spacing={2}>
          <Grid size={6}>
            <Button variant="outlined" sx={{width:"100%"}} onClick={() => addItemHandler()} disabled={loading}>Add</Button>
          </Grid>
          <Grid size={6}>
            <Button variant="outlined" sx={{width:"100%"}} onClick={() => setIsOpen(false)} disabled={loading}>Cancel</Button>
          </Grid>
        </Grid>

      </Box>
    </Modal>
  )
}

export default AdminForm;