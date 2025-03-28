import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Enterpriners from './pages/Enterpriners/Enterpriners';
import Posts from './pages/Enterpriners/Posts/Posts';
import { Context } from './assets/Context/Context';
import { useContext, useEffect, useState } from 'react';

function App() {
  const local = useLocation();
  const { number, setNumber, page, setPage, userData, setUserData } = useContext(Context);
  const [count, setCount] = useState(0);

  let navig = local.pathname.replace('/posts/', '');
  
  useEffect(() => {
    setNumber(navig);
    setPage(`/posts/${navig}`);
  }, [navig]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setCount(Math.max(...data.map((e) => e.id))); 
      })
      .catch((error) => console.error("Ошибка при выполнении запроса:", error));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enterpriners" element={<Enterpriners />} />
        <Route path="/posts/:userId" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
