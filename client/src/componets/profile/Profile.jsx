import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserConnected from '../../context/UserConnected';
import ProfileSummary from './ProfileSummary';
import ProfileDetails from './ProfileDetails';
import ProfileSubjects from './ProfileSubjects';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfilePosts from './ProfilePosts';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";

export default function Profie() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState("1");
  const { userConnected } = useContext(UserConnected);

  useEffect(() => {
    if (!userConnected) {
      console.log('navig');
      // navigate('/');
    }

  }, [userConnected, navigate]);

  
  const handleChange = (panel) => {
    if (expanded === panel) {
      setExpanded(" ");
      return;
    }
    setExpanded(panel);
  }

  return (
    <Box>
      {userConnected && <Box>
        <Accordion expanded={expanded === '1'} onChange={() => { handleChange('1') }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >Profile Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileDetails setExpanded={setExpanded} />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === '2'} onChange={() => { handleChange('2') }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>About Me</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileSummary />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === '3'} onChange={() => { handleChange('3') }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>My Subjects</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileSubjects />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === '4'} onChange={() => { handleChange('4') }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>My Posts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfilePosts posts={userConnected.posts} />
          </AccordionDetails>
        </Accordion>
      </Box>
      }
    </Box>

  )
}