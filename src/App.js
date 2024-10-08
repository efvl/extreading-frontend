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
          <Route exact path="/" element={ <Home/> }/>
          <Route exact path="/lang" element={ <Langs/> }/>
          <Route exact path="/lang/add" element={ <AddEditLang/> }/>
          <Route exact path="/lang/edit/:id" element={ <AddEditLang/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
