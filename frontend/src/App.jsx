import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import MyList from './pages/Restaurants/MyList';
import Search from './pages/Restaurants/Serach';
import SearchResults from './pages/Restaurants/SearchResult';

function App() {
    const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/mylist" element={<MyList />} />
                <Route path="/search" element={<Search />} />
                <Route path="/results" element={<SearchResults />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
