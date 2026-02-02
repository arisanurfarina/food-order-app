import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import api from '../api/meals';

const ItemsContext = createContext();

function ItemsContextProvider({children}) {

  const [user, setUser] = useState(true);
  const [mealsData, setMealsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  const togglePage = () => {
    setUser(prev => !prev);
  }

  // Retrieve Meal List
  const retrieveMeals = async () => {
    const response = await api.get("/meals");
    if (response.data) setMealsData(response.data);
  }

  // Add New Meal
  const addMeal = async (item) => {
    const request = {
      id: uuidv4(),
      ...item
    }
    const response = await api.post("/meals", request);
    setMealsData([...mealsData, response.data]);
  }

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "food-items-react");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dbnlkhxmj/image/upload`,
      formData
    );

    return response.data.secure_url;
  }

  // Update Meal
  const updateMeal = async (id, updatedItem) => {
    const response = await api.put(`/meals/${id}`, updatedItem);
    
    setMealsData(mealsData.map(item => {
      return item.id === id ? {...response.data} : item
    }));
  }

  // Delete Meal
  const removeMeal = async (id) => {
    await api.delete(`/meals/${id}`);
    const updatedItems = mealsData.filter(item => item.id !== id);
    setMealsData(updatedItems);
  }

  /*-------------------------------------------------------------------------------*/

  // Retrieve Order List
  const retrieveOrders = async () => {
    const response = await api.get("/orders");
    if (response.data) setOrdersData(response.data);
  }

  // Add New Order
  const addOrder = async (item) => {
    const request = {
      id: uuidv4(),
      ...item
    }
    const response = await api.post("/orders", request);
    setOrdersData([...ordersData, response.data]);
  }

  /*-------------------------------------------------------------------------------*/

  const value = {
    user,
    togglePage,

    mealsData,
    setMealsData,

    retrieveMeals,
    addMeal,
    uploadImage,
    updateMeal,
    removeMeal,

    ordersData,
    retrieveOrders,
    addOrder
  }

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  )
}

export {ItemsContext, ItemsContextProvider} ;