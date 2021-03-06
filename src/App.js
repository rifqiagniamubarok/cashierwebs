import { Routes, Route } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import DashboardPage from './pages/DashboardPage';
import ItemPage from './pages/ItemPage';
import SignupPage from './pages/SignupPage';
import StockPage from './pages/StockPage';
import NotFoundPage from './pages/NotFoundPage';
import CheckoutPage from './pages/CheckoutPage';
import SettingAccountPage from './pages/SettingAccountPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/dashboards" element={<DashboardPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/stocks" element={<StockPage />} />
        <Route path="/checkout/" element={<CheckoutPage />} />
        <Route path="/settings" element={<SettingAccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
