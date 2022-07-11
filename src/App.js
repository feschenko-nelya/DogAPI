import './App.css';
import './.css/base.css';
import Home from './home/Home';
import Presentation from './presentation/Presentation';
import Voting from './voting/Voting';
import Breeds from './breeds/Breeds';
import BreedSelected from './breeds/Selected';
import Gallery from './gallery/gallery';
import SearchLikes from './search/likes';
import SearchDislikes from './search/dislikes';
import SearchFavourites from './search/favourites';
import SearchResult from './search/Result';

import {Routes, Route} from 'react-router-dom';
import React from 'react';

function App() {

  return (
    <div className="App">
      <Home/>
      <Routes>
        <Route path="/" element={<Presentation/>}/>
        <Route path="voting" element={<Voting/>}/>
        <Route path="breeds" element={<Breeds/>}/>
        <Route path="breeds/:breedId" element={<BreedSelected/>}/>
        <Route path="gallery" element={<Gallery/>}/>
        <Route path="likes" element={<SearchLikes/>}/>
        <Route path="dislikes" element={<SearchDislikes/>}/>
        <Route path="favourites" element={<SearchFavourites/>}/>
        <Route path="search/:text" element={<SearchResult/>}/>
      </Routes>
    </div>
  );

}

export default App;
