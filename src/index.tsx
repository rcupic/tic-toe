import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game } from './pages/Game';
import './index.scss';
import { PostView } from './pages/posts/PostView';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/posts" element={<PostView />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
