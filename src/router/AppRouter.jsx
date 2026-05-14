// src/router/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* Aquí podrás añadir más rutas en el futuro */}
      </Route>
    </Routes>
  );
};

export default AppRouter;