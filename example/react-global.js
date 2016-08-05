// Kinda rubbish way to get around import hoisting
// Need to set globals before all other scripts are imported
// because they rely on a global React
import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;
