import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Definition } from "../interfaces/interfaces";
import {
  useStoreActions,
  useStoreDefinitions,
  useStoreFavoriteRates,
  useStoreRates,
} from "../store/useStore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Favorites = () => {
  const definitionsStore = useStoreDefinitions();
  const ratesStore = useStoreRates();
  const storeActions = useStoreActions();
  const favoritesStore = useStoreFavoriteRates();
  const [selctedFav, setSelctedFav] = useState<[string, string] | undefined>();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectFav = (val: Definition) => {
    storeActions.setAddToFavorites(val[0]);
  };

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("FavCurrencies")!);
    if (favs != null) {
      favs.forEach((f: string) => {
        storeActions.setAddToFavorites(f);
      });
    }
  }, []);

  const renderFavs = favoritesStore?.map((item, index) => {
    const match = ratesStore!.find((r) => r.code === item);
    return (
      <Box
        key={index}
        borderRadius={4}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "strecth",
          //background: "#323232",
          boxShadow: "3px 5px 5px #042f52",
          border: "1px solid #90caf9",
        }}
      >
        <Stack display={"flex"} direction={"row"} alignItems={"stretch"}>
          <Box width={40} />
          <Typography
            variant="h6"
            //color={"primary"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexGrow={1}
          >{`${match!.fullName}`}</Typography>
          <IconButton
            sx={{ color: "#b02e2e" }}
            onClick={() => storeActions.setRemoveFromFavorites(index)}
          >
            <HighlightOffIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Typography
          variant="h4"
          //color={"primary"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexGrow={1}
          paddingY={1}
        >{`${match!.value.toFixed(2)}`}</Typography>
      </Box>
    );
  });

  return (
    <Stack
      display={"flex"}
      direction={"column"}
      width={"100%"}
      alignItems={"center"}
      gap={3}
      paddingTop={3}
    >
      <Button
        variant="outlined"
        size={"large"}
        fullWidth={true}
        onClick={handleClickOpen}
      >
        Add Currency
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Currency</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a currency to your favorites. It will be saved in your browser
            local storage for your next session.
          </DialogContentText>
          <Autocomplete
            sx={{ width: "100%", marginTop: 2 }}
            value={selctedFav!}
            onChange={(e, val) => onSelectFav(val!)}
            options={definitionsStore!}
            getOptionLabel={(options) => {
              return `${options[0]} - ${options[1]}`;
            }}
            renderInput={(params) => (
              <TextField {...params} label="Add Currency" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
      <>{renderFavs}</>
    </Stack>
  );
};

export default Favorites;
