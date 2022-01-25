import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game } from './components/Game';
import './index.scss';
import { Posts } from './routes/posts';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
