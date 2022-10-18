import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
          <PictureContextCom>
            <Router basename="/">
              <Container>
                <h1>Picture This</h1>
                <SearchBar />
                <DefaultCategories />
                <ImageArea />
                <Routes>
                  <Route 
                    exact
                    path="/"
                    render={() => <Navigate to="/mountain" />} 
                  />
                  <Route path="/mountain" render={() => <ImageArea query={"mountain"} />} />
                  <Route path="/beach" render={() => <ImageArea query={"beach"} />} />
                  <Route path="/bird" render={() => <ImageArea query={"bird"} />} />
                  <Route path="/food" render={() => <ImageArea query={"food"} />} />
                </Routes>
              </Container>
            </Router>
          </PictureContextCom>
        </header>
      </div>
    );
  }
}

export default App;
