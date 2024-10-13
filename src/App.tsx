import React from 'react';
import Langs from './pages/Langs';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AddEditLang from './pages/AddEditLang';
import Home from './pages/Home';
import AddEditBook from './pages/AddEditBook';
import Books from './pages/Books';
import Dictionaries from './pages/Dictionaries';
import Words from './pages/Words';
import PageEditor from './pages/PageEditor';
import AddEditDictionary from './pages/AddEditDictionary';
import AddEditWord from './pages/AddEditWord';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/langs" element={ <Langs/> }/>
          <Route path="/lang/add" element={ <AddEditLang/> }/>
          <Route path="/lang/edit/:id" element={ <AddEditLang/> }/>
          <Route path="/editor" element={ <PageEditor/> }/>
          <Route path="/books" element={ <Books/> }/>
          <Route path="/book/add" element={ <AddEditBook/> }/>
          <Route path="/book/edit/:id" element={ <AddEditBook/> }/>
          <Route path="/dicts" element={ <Dictionaries/> }/>
          <Route path="/dict/add" element={ <AddEditDictionary/> }/>
          <Route path="/dict/edit/:id" element={ <AddEditDictionary/> }/>
          <Route path="/words" element={ <Words/> }/>
          <Route path="/word/add" element={ <AddEditWord/> }/>
          <Route path="/word/edit/:id" element={ <AddEditWord/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
