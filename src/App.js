
import styled, { ThemeProvider } from 'styled-components';
import Leftnav from './components/Leftnav';
import Nav from './components/Nav';
import { darkTheme, lightTheme } from './utils/theme';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Video from './screens/Video';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Search from './screens/Search';
import "./App.css";
import Sub from './screens/Sub';
import Premium from './screens/Premium';
import YourVideo from './screens/YourVideo';
import Chanel from './screens/Chanel';

//  const Cont = styled.div`
// width:100%;
// height:100dvh;
// `;
const Containers = styled.div`
display:flex;
width:100%;
// height:93dvh;
background-color: ${({theme})=>theme.bgLighter};
&::-webkit-scrollbar{
  display:none;
}
`;
 
const Main = styled.div`
width:85vmax;
// height:93dvh;
// overflow:hidden;
background-color: ${({theme})=>theme.bgLighter};

`;
  
const Box = styled.div`
padding:15px;
width:100%;
// height:100%;
// overflow:auto;
color:${({ theme }) => theme.text};
background-color: ${({ theme }) => theme.bgLighter};
&::-webkit-scrollbar{display:none;}
`; 
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menu, setmenu] = useState("big");
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className="Conts">
        <BrowserRouter>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
      <Containers>
          <Leftnav darkMode={darkMode} menu={menu} setmenu={setmenu} setDarkMode={setDarkMode} />
          <Main>
            <Box darkMode={darkMode} setDarkMode={setDarkMode}> 
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type="random" menu={menu} setmenu={setmenu}  />} />
                  <Route path='trend' element={<Home type="trend" menu={menu} setmenu={setmenu} />} />
                  <Route path='/sub' element={<Sub />} />
                  <Route path='/prem' element={<Premium />} />
                  <Route path='chanel' >
                  <Route path=':id' element={<Chanel menu={menu} setmenu={setmenu}/>} />
                  </Route>
                  <Route path='/urvideo' element={<YourVideo />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='video' >
                    <Route path=":id" element={<Video menu={menu} setmenu={setmenu} />} />
                  </Route>
                </Route>
              </Routes>
            </Box>
          </Main>
      </Containers>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
