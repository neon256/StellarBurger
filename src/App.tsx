import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import { getData } from '../src/utils/data';
import AppMain from './components/app-main/app-main';
import PropTypes from 'prop-types';
function App() {
  return (
    <>
      <AppHeader/>
      <AppMain data={getData()}/>
      
    </>
  );
}



export default App;
