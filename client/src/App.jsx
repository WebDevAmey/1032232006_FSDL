import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FestivalProvider } from './context/FestivalContext';
import CursorGlow from './components/ui/CursorGlow';
import PageTransition from './components/ui/PageTransition';
import MakersLiveBoard from './components/ui/MakersLiveBoard';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ScrollRestoration from './components/ui/ScrollRestoration';
import ProtectedRoute from './components/ui/ProtectedRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import ArtisanProfile from './pages/ArtisanProfile';
import ArtisansDirectory from './pages/ArtisansDirectory';
import Haats from './pages/Haats';
import HaatDetail from './pages/HaatDetail';
import CreateHaat from './pages/CreateHaat';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import CraftDNAPage from './pages/CraftDNAPage';
import ArtisanOnboarding from './pages/ArtisanOnboarding';
import ArtisanDashboard from './pages/ArtisanDashboard';

export default function App() {
  return (
    <FestivalProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <CursorGlow />
            <MakersLiveBoard />
            <ErrorBoundary>
              <ScrollRestoration />
              <Routes>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
                <Route path="/product/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
                <Route path="/makers" element={<PageTransition><ArtisansDirectory /></PageTransition>} />
                <Route path="/makers/:slug" element={<PageTransition><ArtisanProfile /></PageTransition>} />
                <Route path="/haats" element={<PageTransition><Haats /></PageTransition>} />
                <Route
                  path="/haats/create"
                  element={
                    <PageTransition>
                      <ProtectedRoute artisanOnly>
                        <CreateHaat />
                      </ProtectedRoute>
                    </PageTransition>
                  }
                />
                <Route path="/haats/:slug" element={<PageTransition><HaatDetail /></PageTransition>} />
                <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                <Route
                  path="/checkout"
                  element={
                    <PageTransition>
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    </PageTransition>
                  }
                />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
                <Route
                  path="/artisan/onboarding"
                  element={
                    <PageTransition>
                      <ProtectedRoute artisanOnly>
                        <ArtisanOnboarding />
                      </ProtectedRoute>
                    </PageTransition>
                  }
                />
                <Route
                  path="/artisan/dashboard"
                  element={
                    <PageTransition>
                      <ProtectedRoute artisanOnly>
                        <ArtisanDashboard />
                      </ProtectedRoute>
                    </PageTransition>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <PageTransition>
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    </PageTransition>
                  }
                />
                <Route path="/craftdna" element={<PageTransition><CraftDNAPage /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </FestivalProvider>
  );
}
