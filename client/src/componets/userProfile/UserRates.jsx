import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Button,
    Rating,
    Box,
    Avatar,
    TextField,
} from "@mui/material";
const urlServer = process.env.REACT_APP_URL_SERVER
export default function UserRates({ user, userData }) {
    const [rate, setRate] = useState(0);
    const [rates, setRates] = useState(userData.rates || []);
    const [rateScore, setRateScore] = useState();
    const [commant, setCommant] = useState('');
    const [isRating, setIsRating] = useState(false);

    useEffect(() => {
        let count = 0, sum = 0;
        rates.forEach(item => {
            sum += item.rate_score;
            count++
        });
        setRateScore(sum / count);
    }, [rates])

    const handleRate = async () => {
        const newRate = await axios.post(`${urlServer}/rate/add`,
            { user_id: userData.id, rater_id: user.id, note: commant, rate_score: rate },
            { withCredentials: true }
        );
        setRates(rates.map((item) => item.rater_id === user.id ?
            { user_id: userData.id, rater_id: user.id, note: commant, rate_score: rate }
            : item))
        setIsRating((rating) => !rating);
    };

    const handleChangeMode = () => {
        setIsRating((rating) => !rating);
    };
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ width: 100, height: 100, marginTop: 5 }} />
            </Box>
            <Box sx={{ m: 5 }}>
                {!isRating ?
                    <Box>
                        <Rating
                            disabled
                            precision={0.5}
                            value={rateScore || null}
                        />
                        {user && <Box>
                            <Button onClick={handleChangeMode}>
                                Rate
                            </Button></Box>}
                    </Box>
                    :
                    <Box >
                        <Rating
                            value={rate || null}
                            onChange={(event, newValue) => {
                                setRate(newValue)
                            }}
                        />
                        <Box>
                            <TextField
                                fullWidth={true}
                                sx={{ mt: 2 }}
                                multiline maxRows={3}
                                variant="standard" placeholder='Leave a note'
                                value={commant}
                                onChange={
                                    (event) => {
                                        if (event.target.value.length < 63) {
                                            setCommant(event.target.value)
                                        }
                                    }}
                            />
                            <Box mt={2}>
                                <Button onClick={handleChangeMode}>Cancel</Button>
                                <Button onClick={handleRate}>Save</Button>
                            </Box>
                        </Box>
                    </Box>
                }

            </Box>

            {/* <Box sx={{ m: 5 }}>
                {!isRating ?
                    <Rating
                        precision={0.5}
                        value={rates || null}
                    /> : <Rating
                        value={rateScore || null}
                        onChange={(event, newValue) => {
                            setRates(newValue)
                        }}
                    />}
                {user && (
                    <Box>
                        {!isRating ? (
                            <Button
                                onClick={() => setIsRating((rating) => !rating)}
                            >
                                Rate
                            </Button>
                        ) : (
                            <Box>
                                <TextField
                                    multiline maxRows={3}
                                    variant="standard" placeholder='Please leave a note'
                                    value={commant}
                                    onChange={(event) => {
                                        if (event.target.value.length < 63) {
                                            setCommant(event.target.value)
                                        }
                                    }}
                                />
                                <Box>
                                    <Button onClick={handleCancelRate}>Cancel</Button>
                                    <Button onClick={handleRate}>Save</Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                )}
            </Box> */}
        </Box >
    )
}
