import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserConnected from '../../context/UserConnected';
import UrlContext from "../../context/UrlContext.js";
import { Box, Button, InputLabel, MenuItem, FormControl, Typography, Select, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddSubject({ setAddSubject }) {
    const { userConnected } = useContext(UserConnected);
    const { urlServer } = useContext(UrlContext);
    const [cat, setCat] = useState('');
    const [catID, setCatID] = useState("");
    const [subCat, setSubCat] = useState('');
    const [subjectId, setSubjectId] = useState("");

    const [alertMessage, setAlertMessage] = useState('')
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMode, setAlertMode] = useState('')


    useEffect(() => {
        (async () => {
            try {
                const categoryOBJ = await (await axios.get(`${urlServer}/category/get-all`)).data;
                if (!categoryOBJ) {
                    throw new Error("category could not be reched");
                }
                else {
                    setCat(categoryOBJ)
                }
            }
            catch (err) {
                console.log(err);
            }
        })()
    }, [urlServer])

    const handleOpenAlert = (mode, message) => {
        setAlertMode(mode);
        setAlertMessage(message)
        setAlertOpen(true);
        setTimeout(() => {
            setAlertOpen(false);
            setAddSubject(false);
        }, 3500)

    }
    const handleChangeCat = (event) => {
        const { target: { value } } = event
        setCatID(value);
        const sub = cat.filter((item) => item.id === value);
        setSubCat(sub[0].subjects)
    };

    const handleChangeSub = (event) => {
        setSubjectId(event.target.value);
    }

    const handleSave = async () => {
        try {
            await axios.post(`${urlServer}/user-subject/add`, { userId: userConnected.id, subjectId });
            handleOpenAlert('success', "Subject added successfull");
        }
        catch (err) {
            console.log(err);
            handleOpenAlert('error', "Error to add subject please try again later");
        }
    }

    return (
        <Box>
            {alertOpen && <Alert severity={alertMode} >{alertMessage}</Alert>}
            {cat ? <Box sx={{ m: 2 }}>
                <Typography sx={{ m: 1 }} variant='h6' color="primary">Please select Subject to add</Typography>
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        label="Category"
                        onChange={handleChangeCat}
                        value={catID}
                    >
                        {cat && cat.map((item, index) => {
                            return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 180 }} >
                    <InputLabel>Sub Category</InputLabel>
                    <Select
                        disabled={!subCat ? true : false}
                        label="Sub Category"
                        onChange={handleChangeSub}
                        value={subjectId}
                    >
                        {subCat && subCat.map((item, index) => {
                            return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <Button sx={{ m: 1, height: "55px" }} size="large" variant='contained' startIcon={<AddIcon fontSize='small' />} onClick={handleSave}>Add</Button>
                <Button sx={{ m: 1, height: "55px" }} size="large" variant='outlined' onClick={() => { setAddSubject(addSubject => !addSubject) }}>Cancel</Button>
            </Box>
                : <Box></Box>}
        </Box>
    );
}
