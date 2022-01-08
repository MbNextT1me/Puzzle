const columns = 9;
const rows = 6;
let mixedPieces = [];
let activeMixedPiece;

function createField() {

	const insideExistDiv = document.getElementsByClassName('result__field')[0];

	for (let i = 0; i < rows; i++) {
		const row = document.createElement('div');
		row.className = 'field__row';
		insideExistDiv.appendChild(row);

		const insideExistRow = document.getElementsByClassName('field__row')[i];
		for (let j = 0; j < columns; j++) {
			const piece = document.createElement('div');
			piece.className = 'field__block';
			insideExistRow.appendChild(piece);

			piece.addEventListener('dragover', (e) => {
				e.preventDefault();
			});

			piece.addEventListener('dragenter', (e) => {
				e.preventDefault();
				piece.classList.add('hovered');
			});

			piece.addEventListener('dragleave', (e) => {
				piece.classList.remove('hovered');
			});

			piece.addEventListener('drop', (e) => {
				if (piece.childNodes.length === 0) {
					activeMixedPiece.style.position = "";
					activeMixedPiece.style.zIndex = 0;

					let coordX = activeMixedPiece.offsetX;
					let coordY = activeMixedPiece.offsetY;

					piece.append(activeMixedPiece);
					piece.classList.remove('hovered');
					endOfGame();
				}
			});
		}
	}
}

function createMixedPieces() {
	const insideExistDiv = document.getElementsByClassName('container__mixed-pieces')[0];

	let coordY;
	let coordX;
	let counter = 0;

	for (let i = 0, top = 0; i < rows; i++, top -= 50) {
		for (let j = 0, left = 0; j < columns; j++, left -= 50) {
			counter++;

			var leftPosition = Math.floor(Math.random() * 550) + 75 + "px";
			var topPosition = Math.floor(Math.random() * 550) + 75 + "px";
			const piece = document.createElement('div');
			piece.style.backgroundPosition = `${left}px ${top}px`;
			piece.style.position = "absolute";
			piece.style.top = topPosition;
			piece.style.left = leftPosition;
			piece.className = 'field__mixed-block';
			piece.setAttribute('data', counter);

			insideExistDiv.appendChild(piece);

			piece.draggable = true;

			piece.addEventListener('dragstart', (e) => {
				e.dataTransfer.setData('text/html', 'dragstart');

				activeMixedPiece = piece;
				piece.style.zIndex = "1";
				coordX = e.offsetX;
				coordY = e.offsetY;
			});

			piece.addEventListener('dragend', (e) => {
				piece.style.top = (e.pageY - coordY) + "px";
				piece.style.left = (e.pageX - coordX) + "px";
			});
		}
	}

}

const restart__btn = document.getElementsByClassName('restart__btn')[0];
restart__btn.onclick = function () {
	const container4mixed = document.getElementsByClassName("container__mixed-pieces")[0];
	const img = document.getElementsByClassName('result__img')[0];
	container4mixed.innerHTML = '';

	for (let i = 0; i < rows * columns; i++) {
		const block = document.getElementsByClassName("field__block")[i];
		block.innerHTML = "";
	}

	if (img.style.display === "block") {
		img.style.display = "none";
	}

	const winText = document.getElementsByClassName('win')[0];
	winText.style.display = "none";

	createMixedPieces();
}

const showImg__btn = document.getElementsByClassName('showImg__btn')[0];
showImg__btn.onclick = function () {
	const img = document.getElementsByClassName('result__img')[0];
	const field = document.getElementsByClassName('result__field')[0];
	if (img.style.display === "none") {
		img.style.display = "block";
		img.draggable = false;
		field.style.display = "none";
	}
	else {
		img.style.display = "none";
		field.style.display = "block";
	}
}

function endOfGame() {
	let end = true;

	for (let i = 0; i < rows; i++) {
		const row = document.getElementsByClassName('field__row')[i].childNodes;
		row.forEach(element => {
			if (element.childNodes.length > 0) {
				end = true;
			}
			else {
				end = false;
			}
		});
	}

	if (end === true) {
		let counter = 1;
		const mixedPieces = document.getElementsByClassName('container__mixed-pieces')[0].childNodes;
		for (let i = 0; i < rows; i++) {
			const row = document.getElementsByClassName('field__row')[i].childNodes;
			if (end === false) break;
			row.forEach(element => {
				console.log(counter)
				if (element.childNodes[0].getAttribute('data') == counter) {
					end = true;
					counter++;
				}
				else {
					end = false;
				}
			});
		}
	}

	if (end === true) {
		const winText = document.getElementsByClassName('win')[0];
		winText.style.display = "block";
	}
}

createMixedPieces();
createField();