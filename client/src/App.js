import './App.css';
import { useEffect, useState } from 'react';
import UserConnected from './context/UserConnected';
import Home from './componets/home/Home';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
// import theme from './style/theme';
const urlServer= process.env.REACT_APP_URL_SERVER

function App() {
   
  const [userConnected, setUserConnected] = useState(null);
  
  useEffect(() => {
    (async () => {
      try {
        const id = sessionStorage.getItem("user_id");
        const auth = await (await axios.post( `${urlServer}/auth/`,{id}, { withCredentials: true })).data
        if (!auth) {
          setUserConnected(null);
          sessionStorage.clear()
        }
        else {
          // setUserConnected(auth);
          // const jsonUser = sessionStorage.getItem('user')
          // const user =JSON.parse(jsonUser );
          setUserConnected(auth);
        }
      }
      catch (err) {
        console.log(err.message);
      }
    })()
  }, []);

  // useEffect(() => {
  //   if (userConnected) {
  //     sessionStorage.setItem('user', JSON.stringify(userConnected))
  //   }
  // }, [userConnected])

  return (
    <div className="App">
      <CssVarsProvider>
        <CssBaseline>
          {/* <ThemeProvider theme={theme}> */}
            <UserConnected.Provider value={{ userConnected, setUserConnected }}>
              <Home />
            </UserConnected.Provider>
          {/* </ThemeProvider> */}
        </CssBaseline>
      </CssVarsProvider>
    </div>
  );
}

export default App;

