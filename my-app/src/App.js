import React, { Component } from 'react'; // 리액트를 구현할 수 있는 플러그인을 연결
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HanList from './pages/HanList';
import HanInfo from './pages/HanInfo';
import HanTest from './pages/HanTest';
import HanCheck from './pages/HanCheck';
import 'bootstrap/dist/css/bootstrap.min.css';

// JS 파일에 외부 파일을 불러오는 것이기 때문에 "import" 키워드를 사용한다.
// 같은 JS 파일은 확장자를 사용하지 않는다
import './App.css';

const App = () => {
  return (
    <div>
      {/* <button onClick={toListPage}>LIST</button>
      <button>TEST</button> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/list' element={<HanList/>}/>
          <Route path='/detail/:hid' element={<HanInfo/>}/>
          <Route path='/test/:hid' element={<HanTest/>}/>
          <Route path='/check/:hid' element={<HanCheck/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
