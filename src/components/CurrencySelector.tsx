import { Autocomplete, TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { Definition } from "../interfaces/interfaces";
import {
  useStoreDefinitions,
  useStoreSelectedCurrency,
  useStoreAmountToConvert,
  useStoreActions,
} from "../store/useStore";

const CurrencySelector = () => {
  const definitionsStore = useStoreDefinitions();
  const selectedCurrencyStore = useStoreSelectedCurrency();
  const amountToConvertStore = useStoreAmountToConvert();
  const storeActions = useStoreActions();

  const calculateRates = () => {
    storeActions.fetchRates();
  };
  const onChangeCurrency = (val: Definition) => {
    storeActions.setSelectedCurrency(val);
    storeActions.setCurrencyCode(val[0]);
  };

  useEffect(() => {
    storeActions.fetchDefinitions();
  }, []);

  return (
    <Stack
      display={"flex"}
      direction={"column"}
      alignItems={"center"}
      gap={3}
      sx={{ paddingTop: 3 }}
    >
      <Button
        fullWidth={true}
        variant={"outlined"}
        color={"primary"}
        size={"large"}
        onClick={() => calculateRates()}
      >
        Convert
      </Button>
      {definitionsStore && (
        <Autocomplete
          sx={{ width: "100%" }}
          value={selectedCurrencyStore}
          onChange={(e, val) => onChangeCurrency(val!)}
          options={definitionsStore!}
          getOptionLabel={(options) => {
            return `${options[0]} - ${options[1]}`;
          }}
          renderInput={(params) => <TextField {...params} label="Currencies" />}
        />
      )}
      <TextField
        sx={{ width: "100%" }}
        label={"Amount"}
        type={"number"}
        value={amountToConvertStore}
        onChange={(e) =>
          storeActions.setAmountToConvert(parseInt(e.target.value!))
        }
      />
    </Stack>
  );
};

export default CurrencySelector;
