import logo from './logo.svg';
import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';

function App() {
  return (
    <div className="app-container">
      <Header></Header>
      <TableUser></TableUser>
    </div>
  );
}

export default App;
