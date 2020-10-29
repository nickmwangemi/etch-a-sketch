const container = document.getElementById('container')
let randomColor
let eraseColor

// Clear Button
const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', function () {
	eraseColor = true
})
// Black Color Picker
const blackButton = document.getElementById('black')
blackButton.addEventListener('click', function () {
	randomColor = false
	eraseColor = false
})
// Random Color Picker
const randomButton = document.getElementById('random')
randomButton.addEventListener('click', function () {
	randomColor = true
	eraseColor = false
})

function makeRows(rows, cols) {
	container.style.setProperty('--grid-rows', rows)
	container.style.setProperty('--grid-cols', cols)
	for (let index = 0; index < rows * cols; index++) {
		let gridCell = document.createElement('div')
		gridCell.style.backgroundColor = 'white'
		container.appendChild(gridCell).className = 'item'
	}

	const gridItems = document.querySelectorAll('.item')
	gridItems.forEach((item) =>
		item.addEventListener('mouseover', () => {
			if (eraseColor) {
				item.style.backgroundColor = 'white'
			}

			if (item.style.backgroundColor == 'white') {
				if (randomColor) {
					item.style.backgroundColor = getRandomColor()
				} else {
					item.style.backgroundColor = 'black'
				}
			}
		})
	)
}

makeRows(16, 16)

function makeNewGrid() {
	let userInput = prompt(
		'\nHow many rows x columns would you like? \nPlease DO NOT exceed 100. '
	)
	userInput = Number(userInput)
	if (userInput > 100 || userInput < 1 || isNaN(userInput)) {
		alert(
			'\n Please enter a number between 1 and 100. \n The default selection is 50.'
		)
		userInput = 16
	}

	while (container.firstChild) {
		container.removeChild(container.firstChild)
	}
	makeRows(userInput, userInput)
}

function clearGrid() {
	const gridItems = document.querySelectorAll('.item')
	gridItems.forEach((element) => {
		element.style.backgroundColor = 'white'
	})
	eraseColor = false
	randomColor = false
}

function getRandomColor() {
	let randomHexValue = Math.floor(Math.random() * 0xffffff)
	return '#' + ('000000' + randomHexValue.toString(16)).substr(-6)
}
