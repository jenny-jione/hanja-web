import React, { Component } from 'react'; // 리액트를 구현할 수 있는 플러그인을 연결
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HanList from './pages/HanList';
import HanInfo from './pages/HanInfo';

// JS 파일에 외부 파일을 불러오는 것이기 때문에 "import" 키워드를 사용한다.
// 같은 JS 파일은 확장자를 사용하지 않는다
import './App.css';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HanList/>}/>
          <Route path='/:hid' element={<HanInfo/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
