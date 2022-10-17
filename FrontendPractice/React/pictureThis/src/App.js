import './App.css';
import PictureContextCom from './components/PictureContext';
import SearchBar from './components/SearchBar';
import DefaultCategories from './components/DefaultCategories';
import Container from 'react-bootstrap/Container';
import ImageArea from './components/ImageArea';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class App extends React.Component {
  handleSubmit = (e, history, query) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${query}`;
    history.push(url);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <PictureContextCom>
              <h1>Picture This</h1>
              <SearchBar />
              <DefaultCategories />
              <ImageArea />
            </PictureContextCom>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
