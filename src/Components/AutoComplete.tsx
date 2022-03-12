import { Autocomplete, TextField } from "@mui/material";
import React, { FC, ReactElement, useState } from "react";

const AutocompleteSearch = ({attribute, valuesSet, updateValue}) =>{
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState('');
    return(
        <>
        {/* <p>inputValue: {inputValue}</p>
        <p>value: {value}</p> */}
        <Autocomplete
            freeSolo
            id={"combo-box-demo-"+attribute}
            options={valuesSet? Array.from(valuesSet) : []}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            onChange={(event, newValue:string) => {
                updateValue(newValue);
                setValue(newValue);
              }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={attribute} />}
          />
        </>
        
    )

}

export default AutocompleteSearch;