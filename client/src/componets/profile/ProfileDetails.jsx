    import React, { useState, useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    TextField,
    Button,
} from "@mui/material";
import axios from 'axios';
import UserConnected from "../../context/UserConnected";
const urlServer= process.env.REACT_APP_URL_SERVER

export default function ProfileDetails() {
    const { userConnected} = useContext(UserConnected);
    const [name, setName] = useState(userConnected.name);
    const [email, setEmail] = useState(userConnected.email);
    const [country, setCountry] = useState(userConnected.country);
    const [languages, setLanguages] = useState(userConnected.languages);
    const [age, setAge] = useState(userConnected.age);
    const [phone_number, setPhone_number] = useState(userConnected.phone_number);
    const [edit, setEdit] = useState(true);
    const handleEdit = async () => {
        setEdit(edit => !edit)
    }

    const handleSave = async () => {
        try {
             await axios.put(`${urlServer}/user/update`,
                { email, name, country, languages, age, phone_number },
                { withCredentials: true }
            );
            setEdit(edit => !edit);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleCancel = () => {
        setName(userConnected.name || undefined);
        setEmail(userConnected.email || undefined);
        setCountry(userConnected.country || undefined);
        setLanguages(userConnected.languages || undefined);
        setAge(userConnected.age || undefined);
        setPhone_number(userConnected.phone_number || undefined);
        setEdit(edit => !edit);
    }

    return (
        <Box>
            <Box >
                <TextField sx={{ m: 1 }} disabled={edit} label="Name" type='text' onChange={(event) => { setName(event.target.value) }} value={name || undefined} />
                <TextField sx={{ m: 1 }} disabled label="Email" type='email' onChange={(event) => { setEmail(event.target.value) }} value={email || undefined}  />
                <TextField sx={{ m: 1 }} disabled={edit} label="Age" type='number' onChange={(event) => { setAge(event.target.value) }} value={age || undefined} />
                <TextField sx={{ m: 1 }} disabled={edit} label="Country" type='text' onChange={(event) => { setCountry(event.target.value) }} value={country || undefined} />
                <TextField sx={{ m: 1 }} disabled={edit} label="Languages" type='text' onChange={(event) => { setLanguages(event.target.value) }} value={languages || undefined} />
                <TextField sx={{ m: 1 }} disabled={edit} label="Phone Number" type="tel" onChange={(event) => { setPhone_number(event.target.value) }} value={phone_number || undefined} />
            </Box>
            <Box>
                {edit ? <Button sx={{ m: 1 }} onClick={handleEdit} size="large" startIcon={<EditIcon fontSize='small' />}>Edit</Button> :
                    <Button sx={{ m: 1 }} variant={"contained"} onClick={handleSave} size="large" startIcon={<SaveIcon fontSize='small' />}>Save</Button>
                }
                {!edit && <Button sx={{ m: 1 }} variant="outlined" onClick={handleCancel} size="large">
                    Cencel
                </Button>}
            </Box>
        </Box>
    )
}
