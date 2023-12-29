import styled from 'styled-components';
import './App.css';
import AppRoutes from './AppRoutes';

const Container = styled.div`
background-color: #F6F6F6;

`
function App() {
  return (
    <div style={{backgroundColor: '#F6F6F6'}} id='app'>
      

      <AppRoutes />
    </div>
  )
}

export default App;
