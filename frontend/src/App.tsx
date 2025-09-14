import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import MyList from './pages/Restaurants/MyList';
import Search from './pages/Restaurants/Search';
import SearchResults from './pages/Restaurants/SearchResult';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import Detail from './pages/Restaurants/Detail';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        // 로그인 상태 관리를 위해 AuthProvider로 감싸기
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/mylist" element={<MyList />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/results" element={<SearchResults />} />
                        <Route path="/mylist/:id" element={<Detail />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
