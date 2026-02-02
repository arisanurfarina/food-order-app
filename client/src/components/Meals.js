import { useState, useContext, useEffect, use } from "react";
import { ItemsContext } from "../store/ItemsContext";
import { Grid, Typography, Modal, Box } from "@mui/material";
import MealsItem from "./MealsItem"

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

const Meals = () => {
  const { mealsData, retrieveMeals } = useContext(ItemsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    retrieveMeals();
  }, []);

  const mealsList = mealsData.map(item => {
    return <MealsItem key={item.id} item={item} setIsOpen={setIsOpen} setContent={setContent} />;
  });

  return (
    <Grid container direction="column" spacing={4} className="meals-container" >
      <Typography variant="h6">AVAILABLE FOODS</Typography>

      <Grid container spacing={2}>
        { mealsData && mealsData.length > 0 ? mealsList : <Typography variant="body1">No meals available.</Typography> }
      </Grid>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} tabIndex={-1}>
        <Box sx={style}>
          {content}
        </Box>
      </Modal>
      
    </Grid>
  )
}

export default Meals;