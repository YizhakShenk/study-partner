import React, { useState, useContext } from 'react';
import { Box,Button, InputBase} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import UserConnected from '../../context/UserConnected';
const urlServer= process.env.REACT_APP_URL_SERVER

export default function ProfileSummary() {
  const { userConnected } = useContext(UserConnected);
  const [val, setVal] = useState(userConnected.about || "");
  const [edited, setEdited] = useState(true);

  const handleEdit = () => {
    setEdited(edited => !edited);
  }

  const handleSave = async() => {
    try{
      axios.post(urlServer+'/user/update', { email: userConnected.email, about: val }, { withCredentials: true });  
    }
    catch(err){
    console.log(err);
    }
    setEdited(edited => !edited);
  }

  const handleCancel = () => {
    setVal(userConnected.about || " ");
    setEdited(!edited);
  }
  return (
    <Box
      sx={{}}
    >
      <InputBase
        inputProps={{ maxLength: 255 }}
        disabled={edited}
        sx={{ m: 1 }}
        multiline
        rows={4}
        fullWidth
        value={val || ""}
        placeholder="Write your words here..  for exapmle: 'Hi, I'm lee and I am a student of Languages and would like to practice grammar and speaking. my Calender is forward...'  (:"
        onChange={(event) => { setVal(event.target.value) }}
      />
      {edited ? <Button sx={{ m: 1 }} onClick={handleEdit} variant="text" size="large" startIcon={<EditIcon />}>Edit</Button>
        : <Button sx={{ m: 1 }} onClick={handleSave} variant="contained" size="large" startIcon={< SaveIcon />}>Save</Button>}
      {!edited &&<Button sx={{ m: 1 }} variant="outlined" onClick={handleCancel} size="large">
        Cencel
      </Button>}
    </Box>
  )
}
