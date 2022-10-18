import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PictureContextCom from './components/PictureContext';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
//import ImageArea from './components/ImageArea';
import Result from './components/Result';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class App extends React.Component {
  /*handleSubmit = (e, history, query) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${query}`;
    history.push(url);
  }*/
  handleSubmit = (e, query) => {
    e.preventDefault();
    e.currentTarget.reset();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PictureContextCom>
            <Router>
              <Container>
                <Header handleSubmit={this.handleSubmit} />
                <Routes>
                  <Route 
                    exact
                    path="/"
                    element={<Navigate to="/mountain" />} 
                  />
                  <Route path="/mountain" element={<Result query={"mountain"} />} />
                  <Route path="/beach" element={<Result query={"beach"} />} />
                  <Route path="/bird" element={<Result query={"bird"} />} />
                  <Route path="/food" element={<Result query={"food"} />} />
                  <Route
                    path="/search/:query"
                    render={props => {
                      <Result query={props.match.params.query} />
                    }}
                  />
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
