import React, {lazy, useState, Suspense} from 'react';
import {Link, Navigate, useRoutes, Outlet} from 'react-router-dom';
import GetRoutes from './routers/index';
import usePullToRefresh from './hooks/usePullToRefresh';
import './App.css';
const Navbar = lazy(()=>import('@/components/navbar/Navbar'));

function App() {
  const element = useRoutes(GetRoutes);
  usePullToRefresh();
  return (
    <div className="App">
      <Navbar />
      {/* 懒加载一定要配合 suspense使用 */}
      <Suspense fallback={<span>Loading</span>} >
        { element }
      </Suspense>
    </div>
  );
}

export default React.memo(App);
