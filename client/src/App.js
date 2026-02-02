import React, { useContext } from "react";
import './index.css';
import { ItemsContext } from "./store/ItemsContext";
import { Box, Button } from "@mui/material";
import Users from "./pages/Users";
import Admin from "./pages/Admin";

function App() {
  const {user} = useContext(ItemsContext);

  return (
    <div className="app-container">
      {user ? <Users/> : <Admin/> }
      <Footer />
    </div>
  );
}

const Footer = () => {
  const {togglePage, user} = useContext(ItemsContext);

  return (
    <Box component="section" className="flex-center footer-container">
      <img src="/assets/logo.jpg" height={200} />
      <Button variant="contained" onClick={togglePage} sx={{backgroundColor:"white", color:"black"}} >
        {user ? "Admin" : "User" }
      </Button>
    </Box>
  )
}

export default App;
