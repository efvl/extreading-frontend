import React from 'react';
import Langs from './pages/Langs';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AddEditLang from './pages/AddEditLang';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/lang" element={ <Langs/> }/>
          <Route path="/lang/add" element={ <AddEditLang/> }/>
          <Route path="/lang/edit/:id" element={ <AddEditLang/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
