import React from 'react';

import {initialSudokuState} from './initialSudokuState';

class Sudoku extends React.Component {

	constructor(props) {
		super(props);
		this.state = 
		{ 
			sudokuState: initialSudokuState,
		}
	}

	editValue = (event, row, col) => {

		const value = event.target.value;

		let newArray = this.state.sudokuState.slice();
		newArray[row][col] = value;

		this.setState( { sudokuState: newArray });
	}

	// Set fields to readonly after mount (we don't want that the user can change default numbers)
	componentDidMount() {
		for(let row = 0; row < this.state.sudokuState.length; row++) {
			for(let col = 0; col < this.state.sudokuState[row].length; col++) {
				if(this.state.sudokuState[row][col] != '') {
					let id = 'case' + row + '_' + col;
					document.getElementById(id).setAttribute('readonly', 'true');
				}
			}
		}
	}

	absentOnRow(number, row) {
		for(let col = 0; col < 9; col++) {
			if(this.state.sudokuState[row][col] == number.toString()) {
				return false;
			}
		}
		return true;
	}

	absentOnColumn(number, col) {
		for(let row = 0; row < 9; row++) {
			if(this.state.sudokuState[row][col] == number.toString()) {
				return false;
			}
		}
		return true;
	}

	absentOnBlock(number, row, col) {
		let _row = row-(row%3), _col = col-(col%3);
		for(row=_row; row < _row+3; row++) {
			for(col=_col; col < _col+3; col++) {
				if(this.state.sudokuState[row][col] == number.toString()) {
					return false;
				}
			}
		}
		return true;
	}

	isValid(position) {
		// Si on est à la case 82, on sort du tableau
		if(position == 9*9) {
			return true;
		}

		// On récupère les coordonnées de la case
		let row = parseInt(position / 9), col = position % 9;

		// Si la case n'est pas vide, on passe à la suivante (appel récursif)
		if(this.state.sudokuState[row][col] != '') {
			return this.isValid(position + 1);
		}
		
		for(let number = 1; number <= 9; number++) {
			if(this.absentOnRow(number, row) && this.absentOnColumn(number, col) && this.absentOnBlock(number, row, col)) {
				let newArray = this.state.sudokuState.slice();
				newArray[row][col] = number.toString();
				this.setState( { sudokuState: newArray });

				if(this.isValid(position + 1)) {
					return true;
				}
			}
		}

		let newArray = this.state.sudokuState.slice();
		newArray[row][col] = '';
		this.setState( { sudokuState: newArray });

		return false;
	}

	render() {
		return (
			<div className="container pageWidth">
				<button onClick={() => this.isValid(0)}>Voir la solution</button>
				<div className="row externalBorderTop">
					<div className="col-sm padding-0 externalBorderLeft internalBorderBottom internalBorderRight">
						<input id="case0_0"  className="set-sudokuField" value={this.state.sudokuState[0][0]} onChange={ (e) => this.editValue(e, 0, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case0_1" className="set-sudokuField" value={this.state.sudokuState[0][1]} onChange={ (e) => this.editValue(e, 0, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case0_2" className="set-sudokuField" value={this.state.sudokuState[0][2]} onChange={ (e) => this.editValue(e, 0, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case0_3" className="set-sudokuField" value={this.state.sudokuState[0][3]} onChange={ (e) => this.editValue(e, 0, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case0_4" className="set-sudokuField" value={this.state.sudokuState[0][4]} onChange={ (e) => this.editValue(e, 0, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case0_5" className="set-sudokuField" value={this.state.sudokuState[0][5]} onChange={ (e) => this.editValue(e, 0, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case0_6" className="set-sudokuField" value={this.state.sudokuState[0][6]} onChange={ (e) => this.editValue(e, 0, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case0_7" className="set-sudokuField" value={this.state.sudokuState[0][7]} onChange={ (e) => this.editValue(e, 0, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight internalBorderBottom">
						<input id="case0_8" className="set-sudokuField" value={this.state.sudokuState[0][8]} onChange={ (e) => this.editValue(e, 0, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>

				<div className="row">
					<div className="col-sm padding-0 externalBorderLeft internalBorderBottom internalBorderRight">
						<input id="case1_0" className="set-sudokuField" value={this.state.sudokuState[1][0]} onChange={ (e) => this.editValue(e, 1, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case1_1" className="set-sudokuField" value={this.state.sudokuState[1][1]} onChange={ (e) => this.editValue(e, 1, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case1_2" className="set-sudokuField" value={this.state.sudokuState[1][2]} onChange={ (e) => this.editValue(e, 1, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case1_3" className="set-sudokuField" value={this.state.sudokuState[1][3]} onChange={ (e) => this.editValue(e, 1, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case1_4" className="set-sudokuField" value={this.state.sudokuState[1][4]} onChange={ (e) => this.editValue(e, 1, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case1_5" className="set-sudokuField" value={this.state.sudokuState[1][5]} onChange={ (e) => this.editValue(e, 1, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case1_6" className="set-sudokuField" value={this.state.sudokuState[1][6]} onChange={ (e) => this.editValue(e, 1, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case1_7" className="set-sudokuField" value={this.state.sudokuState[1][7]} onChange={ (e) => this.editValue(e, 1, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight internalBorderBottom">
						<input id="case1_8" className="set-sudokuField" value={this.state.sudokuState[1][8]} onChange={ (e) => this.editValue(e, 1, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>

				<div className="row">
					<div className="col-sm padding-0 externalBorderLeft externalBorderBottom internalBorderRight">
						<input id="case2_0" className="set-sudokuField" value={this.state.sudokuState[2][0]} onChange={ (e) => this.editValue(e, 2, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case2_1" className="set-sudokuField" value={this.state.sudokuState[2][1]} onChange={ (e) => this.editValue(e, 2, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom externalBorderRight">
						<input id="case2_2" className="set-sudokuField" value={this.state.sudokuState[2][2]} onChange={ (e) => this.editValue(e, 2, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case2_3" className="set-sudokuField" value={this.state.sudokuState[2][3]} onChange={ (e) => this.editValue(e, 2, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case2_4" className="set-sudokuField" value={this.state.sudokuState[2][4]} onChange={ (e) => this.editValue(e, 2, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom externalBorderRight">
						<input id="case2_5" className="set-sudokuField" value={this.state.sudokuState[2][5]} onChange={ (e) => this.editValue(e, 2, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case2_6" className="set-sudokuField" value={this.state.sudokuState[2][6]} onChange={ (e) => this.editValue(e, 2, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case2_7" className="set-sudokuField" value={this.state.sudokuState[2][7]} onChange={ (e) => this.editValue(e, 2, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight externalBorderBottom">
						<input id="case2_8" className="set-sudokuField" value={this.state.sudokuState[2][8]} onChange={ (e) => this.editValue(e, 2, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>

				<div className="row">
					<div className="col-sm padding-0 externalBorderLeft internalBorderBottom internalBorderRight">
						<input id="case3_0" className="set-sudokuField" value={this.state.sudokuState[3][0]} onChange={ (e) => this.editValue(e, 3, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case3_1" className="set-sudokuField" value={this.state.sudokuState[3][1]} onChange={ (e) => this.editValue(e, 3, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case3_2" className="set-sudokuField" value={this.state.sudokuState[3][2]} onChange={ (e) => this.editValue(e, 3, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case3_3" className="set-sudokuField" value={this.state.sudokuState[3][3]} onChange={ (e) => this.editValue(e, 3, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case3_4" className="set-sudokuField" value={this.state.sudokuState[3][4]} onChange={ (e) => this.editValue(e, 3, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case3_5" className="set-sudokuField" value={this.state.sudokuState[3][5]} onChange={ (e) => this.editValue(e, 3, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case3_6" className="set-sudokuField" value={this.state.sudokuState[3][6]} onChange={ (e) => this.editValue(e, 3, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case3_7" className="set-sudokuField" value={this.state.sudokuState[3][7]} onChange={ (e) => this.editValue(e, 3, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight internalBorderBottom">
						<input id="case3_8" className="set-sudokuField" value={this.state.sudokuState[3][8]} onChange={ (e) => this.editValue(e, 3, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>

				<div className="row">
					<div className="col-sm padding-0 externalBorderLeft internalBorderBottom internalBorderRight">
						<input id="case4_0" className="set-sudokuField" value={this.state.sudokuState[4][0]} onChange={ (e) => this.editValue(e, 4, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case4_1" className="set-sudokuField" value={this.state.sudokuState[4][1]} onChange={ (e) => this.editValue(e, 4, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case4_2" className="set-sudokuField" value={this.state.sudokuState[4][2]} onChange={ (e) => this.editValue(e, 4, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case4_3" className="set-sudokuField" value={this.state.sudokuState[4][3]} onChange={ (e) => this.editValue(e, 4, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case4_4" className="set-sudokuField" value={this.state.sudokuState[4][4]} onChange={ (e) => this.editValue(e, 4, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case4_5" className="set-sudokuField" value={this.state.sudokuState[4][5]} onChange={ (e) => this.editValue(e, 4, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case4_6" className="set-sudokuField" value={this.state.sudokuState[4][6]} onChange={ (e) => this.editValue(e, 4, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case4_7" className="set-sudokuField" value={this.state.sudokuState[4][7]} onChange={ (e) => this.editValue(e, 4, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight internalBorderBottom">
						<input id="case4_8" className="set-sudokuField" value={this.state.sudokuState[4][8]} onChange={ (e) => this.editValue(e, 4, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>

				<div className="row">
					<div className="col-sm padding-0 externalBorderLeft externalBorderBottom internalBorderRight">
						<input id="case5_0" className="set-sudokuField" value={this.state.sudokuState[5][0]} onChange={ (e) => this.editValue(e, 5, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case5_1" className="set-sudokuField" value={this.state.sudokuState[5][1]} onChange={ (e) => this.editValue(e, 5, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom externalBorderRight">
						<input id="case5_2" className="set-sudokuField" value={this.state.sudokuState[5][2]} onChange={ (e) => this.editValue(e, 5, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case5_3" className="set-sudokuField" value={this.state.sudokuState[5][3]} onChange={ (e) => this.editValue(e, 5, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case5_4" className="set-sudokuField" value={this.state.sudokuState[5][4]} onChange={ (e) => this.editValue(e, 5, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom externalBorderRight">
						<input id="case5_5" className="set-sudokuField" value={this.state.sudokuState[5][5]} onChange={ (e) => this.editValue(e, 5, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case5_6" className="set-sudokuField" value={this.state.sudokuState[5][6]} onChange={ (e) => this.editValue(e, 5, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderBottom internalBorderRight">
						<input id="case5_7" className="set-sudokuField" value={this.state.sudokuState[5][7]} onChange={ (e) => this.editValue(e, 5, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight externalBorderBottom">
						<input id="case5_8" className="set-sudokuField" value={this.state.sudokuState[5][8]} onChange={ (e) => this.editValue(e, 5, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>

				<div className="row">
					<div className="col-sm padding-0 externalBorderLeft internalBorderBottom internalBorderRight">
						<input id="case6_0" className="set-sudokuField" value={this.state.sudokuState[6][0]} onChange={ (e) => this.editValue(e, 6, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case6_1" className="set-sudokuField" value={this.state.sudokuState[6][1]} onChange={ (e) => this.editValue(e, 6, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case6_2" className="set-sudokuField" value={this.state.sudokuState[6][2]} onChange={ (e) => this.editValue(e, 6, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case6_3" className="set-sudokuField" value={this.state.sudokuState[6][3]} onChange={ (e) => this.editValue(e, 6, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case6_4" className="set-sudokuField" value={this.state.sudokuState[6][4]} onChange={ (e) => this.editValue(e, 6, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case6_5" className="set-sudokuField" value={this.state.sudokuState[6][5]} onChange={ (e) => this.editValue(e, 6, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case6_6" className="set-sudokuField" value={this.state.sudokuState[6][6]} onChange={ (e) => this.editValue(e, 6, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case6_7" className="set-sudokuField" value={this.state.sudokuState[6][7]} onChange={ (e) => this.editValue(e, 6, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight internalBorderBottom">
						<input id="case6_8" className="set-sudokuField" value={this.state.sudokuState[6][8]} onChange={ (e) => this.editValue(e, 6, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>

				<div className="row">
					<div className="col-sm padding-0 externalBorderLeft internalBorderBottom internalBorderRight">
						<input id="case7_0" className="set-sudokuField" value={this.state.sudokuState[7][0]} onChange={ (e) => this.editValue(e, 7, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case7_1" className="set-sudokuField" value={this.state.sudokuState[7][1]} onChange={ (e) => this.editValue(e, 7, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case7_2" className="set-sudokuField" value={this.state.sudokuState[7][2]} onChange={ (e) => this.editValue(e, 7, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case7_3" className="set-sudokuField" value={this.state.sudokuState[7][3]} onChange={ (e) => this.editValue(e, 7, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case7_4" className="set-sudokuField" value={this.state.sudokuState[7][4]} onChange={ (e) => this.editValue(e, 7, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom externalBorderRight">
						<input id="case7_5" className="set-sudokuField" value={this.state.sudokuState[7][5]} onChange={ (e) => this.editValue(e, 7, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case7_6" className="set-sudokuField" value={this.state.sudokuState[7][6]} onChange={ (e) => this.editValue(e, 7, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderBottom internalBorderRight">
						<input id="case7_7" className="set-sudokuField" value={this.state.sudokuState[7][7]} onChange={ (e) => this.editValue(e, 7, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight internalBorderBottom">
						<input id="case7_8" className="set-sudokuField" value={this.state.sudokuState[7][8]} onChange={ (e) => this.editValue(e, 7, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>

				<div className="row externalBorderBottom">
					<div className="col-sm padding-0 externalBorderLeft internalBorderRight">
						<input id="case8_0" className="set-sudokuField" value={this.state.sudokuState[8][0]} onChange={ (e) => this.editValue(e, 8, 0) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderRight">
						<input id="case8_1" className="set-sudokuField" value={this.state.sudokuState[8][1]} onChange={ (e) => this.editValue(e, 8, 1) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight">
						<input id="case8_2" className="set-sudokuField" value={this.state.sudokuState[8][2]} onChange={ (e) => this.editValue(e, 8, 2) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderRight">
						<input id="case8_3" className="set-sudokuField" value={this.state.sudokuState[8][3]} onChange={ (e) => this.editValue(e, 8, 3) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderRight">
						<input id="case8_4" className="set-sudokuField" value={this.state.sudokuState[8][4]} onChange={ (e) => this.editValue(e, 8, 4) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight">
						<input id="case8_5" className="set-sudokuField" value={this.state.sudokuState[8][5]} onChange={ (e) => this.editValue(e, 8, 5) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderRight">
						<input id="case8_6" className="set-sudokuField" value={this.state.sudokuState[8][6]} onChange={ (e) => this.editValue(e, 8, 6) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 internalBorderRight">
						<input id="case8_7" className="set-sudokuField" value={this.state.sudokuState[8][7]} onChange={ (e) => this.editValue(e, 8, 7) } type="text" size="1" maxLength="1" />
					</div>
					<div className="col-sm padding-0 externalBorderRight">
						<input id="case8_8" className="set-sudokuField" value={this.state.sudokuState[8][8]} onChange={ (e) => this.editValue(e, 8, 8) } type="text" size="1" maxLength="1" />
					</div>
				</div>
			</div>
		);
	}
}
export default Sudoku;