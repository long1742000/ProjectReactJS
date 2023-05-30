import { useState } from 'react';
import './App.scss';
import AddNewModal from './components/AddNewModal';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';


function App() {

  const [showModalAddNeww, setShowModalAddNew] = useState(false);

  const handleClose = () => {
    setShowModalAddNew(false);
  }

  return (
    <div className="app-container">
      <Header></Header>
      <Container>
        <h3>List user:</h3>
        <div className='action'>
          <input className='form-control m-2 search' placeholder='Search...'></input>
          <button className='btn btn-primary m-2'>Search</button>
          <button className='btn btn-primary btn-action m-2' onClick={() => { setShowModalAddNew(true) }}>Add new</button>
        </div>
        <TableUser></TableUser>
      </Container>

      <AddNewModal
        show={showModalAddNeww}
        handleClose={handleClose}
      />

    </div>
  );
}

export default App;
