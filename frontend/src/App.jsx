import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import MyList from './pages/Restaurants/MyList';
import Search from './pages/Restaurants/Search';
import SearchResults from './pages/Restaurants/SearchResult';
import Home from './pages/Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mylist" element={<MyList />} />
                <Route path="/search" element={<Search />} />
                <Route path="/results" element={<SearchResults />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
