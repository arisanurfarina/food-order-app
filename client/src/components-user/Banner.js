import { Grid, Typography, Button } from "@mui/material";

const Banner = () => {
  return (
    <Grid container direction="column" spacing={4} className="flex-center banner" sx={{color:"white"}}>
      <Typography variant="h1"><b>MAKTEH CORNER</b></Typography>
      <Typography variant="h5">IS WHERE LIFE HAPPENS</Typography>
      <Button variant="contained" href="#menu">DISCOVER</Button>
    </Grid>
  )
}

export default Banner;