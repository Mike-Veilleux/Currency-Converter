import { Container, Stack } from "@mui/material";
import CurrencySelector from "./components/CurrencySelector";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import { useStoreRates } from "./store/useStore";

function App() {
  const ratesStore = useStoreRates();
  return (
    <Stack>
      <Navbar />
      <Container maxWidth={"xs"}>
        <CurrencySelector />
        {ratesStore !== undefined && <Favorites />}
      </Container>
    </Stack>
  );
}

export default App;
