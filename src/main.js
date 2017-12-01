import React from 'react';
import ReactDOM from 'react-dom';
import Sudoku from './Sudoku';

import 'bootstrap/dist/css/bootstrap.css'
import './style/index.css'

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		React.createElement(Sudoku),
		document.getElementById('mount')
	);
});