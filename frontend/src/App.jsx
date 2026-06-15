import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetail from './pages/RecipeDetail';
import PostDetail from './pages/PostDetail';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './index.css';
import './App.css';
import './recipes.css';

function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<PostDetail />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/contacts" element={<ContactPage />} />
         <Route path="/privacy" element={<PrivacyPolicy />} />
        
      </Routes>
      
      <Footer /> 
  
    </Router>
  );
}

export default App;

