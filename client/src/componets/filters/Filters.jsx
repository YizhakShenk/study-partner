import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Autocomplete, Grid, Checkbox,FormControlLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const urlServer = process.env.REACT_APP_URL_SERVER

export default function Filters({ setPosts }) {
  const [categoriesOptions, setCategoriesOptions] = useState(null);
  const [subjectName, setSubjectName] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [subjectInput, setSubjectInput] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${urlServer}/category/get-all`);
        const newArr = [];
        result.data.forEach((cat) => {
          cat.subjects.forEach((subCat) => {
            newArr.push({
              id: subCat.id,
              name: subCat.name,
              category: cat.name,
            });
          });
        });
        setCategoriesOptions(newArr);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const filter = async () => {
    try {
      const stempDay = date?.$d.getTime() || null;
      const stempTime = time?.$H * 100 + time?.$m || null;
      let tempSubName = subjectName;
      if (!subjectName || subjectName.length < 1) {
        tempSubName = null;
      }
      const postsList = await axios.post(`${urlServer}/post/filter`, {
        subject: tempSubName,
        date: stempDay,
        time: stempTime,
      });
      if (!postsList) {
        throw new Error("posts not dound");
      } else {
        if (postsList.data !== [] && postsList.data !== null) {
          setPosts(postsList.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearFilter = () => {
    setSubjectName([]);
    setDate(null);
    setTime(null);
    setSubjectInput("");
  };

  const handleViewOnlyAvailable = ()=>{
    
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        maxWidth={{ xs: "100%", sm: "80%", md: "80%", lg: '60%' }}
        container
        columns={{ xs: 4, sm: 12, md: 12 }}
        spacing={1}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            size="small"
            sx={{ display: "inline-block", maxWidth: "262px", width: "100%" }}
            multiple
            options={categoriesOptions
              ? categoriesOptions.sort((a, b) =>
                a.category.localeCompare(b.category)
              )
              : []}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            groupBy={(option) => option.category}
            inputValue={subjectInput}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxIcon />}
                  checkedIcon={<CheckBoxOutlineBlankIcon />}
                  checked={!selected}
                />
                {option.name}
              </li>
            )}
            onChange={(event, newValue) => {
              if (newValue.length < 4) {
                const tempSub = newValue.map(item => item.name)
                newValue && setSubjectName(tempSub);
              }
            }}
            onInputChange={(event, newInputValue) => {
              console.log(newInputValue);
              setSubjectInput(newInputValue ? newInputValue : "");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Category" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DatePicker
            label="Date"
            disablePast
            value={date}
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => <TextField size="small" {...params} />}
            onChange={(newValue) => {
              setDate(newValue);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TimePicker
            label="Time"
            value={time}
            onChange={(newValue) => {
              setTime(newValue);
            }}
            ampm={false}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button sx={{ mr: 1, mb: 5 }} variant="outlined" onClick={filter}>
            Filter
          </Button>
          <Button sx={{ mb: 5 }} variant="outlined" onClick={clearFilter}>
            Clear
          </Button>
          
          <FormControlLabel control={<Checkbox  />} label="Available Posts only" />
          {/* <Button size="small" endIcon={<Checkbox  size="small"/>}>available Posts only</Button> */}
          
          {/* <Button></Button> */}
          {/* <FormControlLabel 
                sx={{display:'inline'}}
              label="unavailable posts"
              control={<Checkbox checked={checked} onChange={handleChange} />}
            /> */}
          {/* <Button sx={{mb:5}}><Checkbox checked={checked} onChange={handleChange}/></Button> */}
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
