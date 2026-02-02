import { useState, useContext, useEffect } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Stack } from "@mui/material";
import AdminForm from "../components-admin/AdminForm";
import Meals from "../components/Meals";

const OrdersItem = ({ item }) => {

  const { id, cartItems, totalAmount } = item;

  const cartItemsList = cartItems.map(item => {
    return <Typography variant="body2">{item.name} x{item.quantity}</Typography>
  });

  return (
    <Grid size={6} >
      <Card>
        <CardContent>
          <Typography variant="body2">ID: {id}</Typography>
          <br/>
          {cartItemsList}
          <br/>
          <Typography variant="body2">Total = RM{totalAmount}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

const Orders = () => {
  const {ordersData, retrieveOrders} = useContext(ItemsContext);
  
  useEffect(() => {
    retrieveOrders();
  }, []);

  const ordersList = ordersData.map(item => {
    return <OrdersItem key={item.id} item={item} />
  });

  return (
    <Grid container direction="column" spacing={4} className="meals-container" >
      <Typography variant="h6">LIST OF ORDERS</Typography>
      <Grid container spacing={2}>
        { ordersData && ordersData.length > 0 ? ordersList : <Typography variant="body1">No orders have been made.</Typography> }
      </Grid>
    </Grid>
  )
}

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrder, setIsOrder] = useState(false);

  const togglePage = () => {
    setIsOrder(prev => !prev);
  }

  return (
    <div>

      <AppBar position="sticky" sx={{backgroundColor:"black"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow:1}}>Makteh Corner</Typography>
          <Button variant="outlined" sx={{backgroundColor:"white"}} onClick={() => togglePage()}>
            {isOrder ? "View Meals" : "View Orders"}
          </Button>
        </Toolbar>
      </AppBar>
      
      {isOrder ? <Orders /> : <Meals />}

      <AdminForm isOpen={isOpen} setIsOpen={setIsOpen} />
      
    </div>
  )
}

export default Admin;