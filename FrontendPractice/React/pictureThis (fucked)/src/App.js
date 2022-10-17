import './App.css';
import SearchBar from './components/SearchBar';
import DefaultCategories from './components/DefaultCategories';
import Container from 'react-bootstrap/Container';
import ImageArea from './components/ImageArea';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h1>Picture This</h1>
          <SearchBar />
          <DefaultCategories />
          <ImageArea />
        </Container>
      </header>
    </div>
  );
}

export default App;
