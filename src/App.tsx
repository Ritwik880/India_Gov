import React from 'react'
import Header from './Components/Header'
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from './GlobalStyle';
import Footer from './Components/Footer';

const App = () => {
  const theme = {
    colors: {
      color: "#FFFFFF",
      grey: "#576574",
      bg: "#F4FCFF",
      btn: "#1dd1a1",
      background: "#2e86de",
      footer: "#2d3436",
      btnGradient: "linear-gradient(89.6deg, #5077FF 0.31%, #9981FB 42.01%, #F797FF 99.64%)",
      cardBox: "linear-gradient(89.6deg, #5077FF 0.31%, #9981FB 42.01%, #999DFB 99.64%)",
      gradient:
        "linear-gradient(89.6deg, #2CBDFB 0.31%, #9175FF 47.7%, #4764FF 99.64%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" },
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
        <Footer />
      </ThemeProvider>

    </>
  )
}

export default App