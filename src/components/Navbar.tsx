import { Stack, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Stack padding={2} sx={{ flexGrow: 1, backgroundColor: "#202020" }} gap={2}>
      <Typography
        variant="h4"
        component="div"
        sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}
      >
        Currency Converter
      </Typography>
    </Stack>
  );
};

export default Navbar;
