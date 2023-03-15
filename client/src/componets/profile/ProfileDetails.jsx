import React, { useState, useContext } from 'react'
import UrlContext from "../../context/UrlContext.js";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    TextField,
    Button,
} from "@mui/material";
import axios from 'axios';
import UserConnected from "../../context/UserConnected";

export default function ProfileDetails() {

    const { userConnected} = useContext(UserConnected);
    const {urlServer} = useContext(UrlContext);
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
            console.log(email);
            console.log(name);
            console.log(country);
            console.log(age);
            console.log(phone_number);
            console.log(languages);
            
            
            console.log('start');
            // const t=  axios.post('http://localhost:3005/user/update');
            // console.log(t);
             await axios.put(`${urlServer}/user/update`,
            //  await axios.post('http://localhost:3005/user/update',
                { email, name, country, languages, age, phone_number },
                { withCredentials: true }
            );
            console.log('do');
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
                <TextField sx={{ m: 1 }} disabled={edit} label="Name" type='text' onChange={(event) => { setName(event.target.value) }} value={name || undefined} required />
                <TextField sx={{ m: 1 }} disabled label="Email" type='email' onChange={(event) => { setEmail(event.target.value) }} value={email || undefined} required />
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
