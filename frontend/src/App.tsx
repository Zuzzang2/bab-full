import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import MyList from './pages/Restaurants/MyRestaurants';
import Search from './pages/Restaurants/Search';
import SearchResults from './pages/Restaurants/SearchResult';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import Detail from './pages/Restaurants/Detail';
import MyRestaurants from './pages/Restaurants/MyRestaurants';
import CreateList from './pages/MyLists/CreateList';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/my-restaurnats" element={<MyRestaurants />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/results" element={<SearchResults />} />
                    <Route path="/mylist/:id" element={<Detail />} />
                    <Route path="/create-list" element={<CreateList />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
