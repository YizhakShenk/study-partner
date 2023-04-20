import './App.css';
import { useEffect, useState } from 'react';
import UserConnected from './context/UserConnected';
import UrlContext from './context/UrlContext';
import Home from './componets/home/Home';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
// import theme from './style/theme';

function App() {
  const [userConnected, setUserConnected] = useState(null);
  const [urlServer] = useState('http://localhost:3005');
  
  useEffect(() => {
    (async () => {
      try {
        // const auth = await (await axios.get('http://localhost:3005/auth/', { withCredentials: true })).data
        const auth = await (await axios.get( `${urlServer}/auth/`, { withCredentials: true })).data

        if (!auth) {
          setUserConnected(null);
          sessionStorage.clear()
        }
        else {
          // setUserConnected(auth);
          const jsonUser = sessionStorage.getItem('user')
          const user =JSON.parse(jsonUser );
          setUserConnected(user);
        }
      }
      catch (err) {
        console.log(err.message);
      }
    })()
  }, [urlServer]);

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
          <UrlContext.Provider value={{ urlServer: urlServer }}>
            <UserConnected.Provider value={{ userConnected, setUserConnected }}>
              <Home />
            </UserConnected.Provider>
          </UrlContext.Provider>
          {/* </ThemeProvider> */}
        </CssBaseline>
      </CssVarsProvider>
    </div>
  );
}

export default App;

