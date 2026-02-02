import { useState } from "react";
import { CartContextProvider } from "../store/CartContext";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from "../components-user/Cart";
import Banner from "../components-user/Banner";
import AboutUs from "../components-user/AboutUs";
import Meals from "../components/Meals";

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <CartContextProvider>
  
      <AppBar position="sticky" sx={{backgroundColor:"black"}}>
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow:1}}>Makteh Corner</Typography>
          <IconButton size="large" onClick={() => setIsOpen(true)} >
            <ShoppingCartIcon sx={{color:"white"}} />
          </IconButton>
        </Toolbar>
      </AppBar>
        
      <Cart isOpen={isOpen} setIsOpen={setIsOpen} />

      <Banner />
      <AboutUs />
      <Meals />
      
    </CartContextProvider>
  )
}

export default Users;