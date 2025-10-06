import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Search from './pages/Restaurants/Search';
import SearchResults from './pages/Restaurants/SearchResult';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import MyRestaurants from './pages/Restaurants/MyRestaurants';
import CreateList from './pages/Restaurants/CreateList';
import { AuthProvider } from './contexts/AuthContext';
import RestaurantDetail from './pages/Restaurants/RestaurantDetail';
import SocialSignup from './pages/Auth/SocialSignup';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/social" element={<SocialSignup />} />

            <Route path="/login" element={<Login />} />
            <Route path="/my-restaurants" element={<MyRestaurants />} />
            <Route path="/restaurants/search" element={<Search />} />
            <Route path="/restaurants/results" element={<SearchResults />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route
              path="/my-restaurants/create-list"
              element={<CreateList />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
