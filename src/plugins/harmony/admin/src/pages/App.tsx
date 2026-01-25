import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import Layout from '../components/Layout';

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Page.Error />} />
      </Route>
    </Routes>
  );
};

export { App };
