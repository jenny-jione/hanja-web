import React, { Component } from 'react'; // 리액트를 구현할 수 있는 플러그인을 연결
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import HanList from './pages/HanList';
import HanInfo from './pages/HanInfo';
import HanTest from './pages/HanTest';
import HanCheck from './pages/HanCheck';
import HanSimilar from './pages/HanSimilar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCookie } from './js/cookie';


// JS 파일에 외부 파일을 불러오는 것이기 때문에 "import" 키워드를 사용한다.
// 같은 JS 파일은 확장자를 사용하지 않는다
import './App.css';

const App = () => {
  const isLoggedIn = getCookie('myToken');

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={isLoggedIn ? <Home/> : <Navigate to='/'/>}/>
          <Route path='/list' element={isLoggedIn ? <HanList/> : <Login/>}/>
          <Route path='/detail/:hid' element={isLoggedIn ? <HanInfo/> : <Login/>}/>
          <Route path='/test/:hid' element={isLoggedIn ? <HanTest/> : <Login/>}/>
          <Route path='/check/:hid' element={isLoggedIn ? <HanCheck reviewProp={false}/> : <Login/>}/>
          <Route path='/review/:hid' element={isLoggedIn ? <HanCheck reviewProp={true}/> : <Login/>}/>
          <Route path='/similar' element={isLoggedIn ? <HanSimilar/> : <Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
