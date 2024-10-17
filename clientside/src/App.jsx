import { Box } from "@chakra-ui/react";

import {Route, Routes} from "react-router-dom";


import CreatePage from "./pages/CreatePage";

import HomePage from "./pages/HomePage";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import RedirectToTarget from "./components/Redirect";

function App() {

  return (

    <><Navbar />
    
    <Box minH={"100vh"} px={10}>

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/create" element={<CreatePage />} />

        <Route path='/:short' element={ <RedirectToTarget /> }/>

      </Routes>

    </Box>
    
    <Footer />
    
    </>


  )
}

export default App
