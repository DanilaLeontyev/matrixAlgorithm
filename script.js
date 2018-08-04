const primaryMatrix = [
  [0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [1, 1, 0, 1, 1, 0]
];

let str;
let areaNumber = 1;
let newMat = [];
let zero = [];
const createMatrix = document.querySelector('#createMatrix')

createMatrix.addEventListener('click', function () {
  const x = document.querySelector('#x').value
  const y = document.querySelector('#y').value
  let matrix = document.querySelector('.matrix')
  matrix.appendChild(generateMatrix(x, y));
})



primaryMatrix.forEach(item => newMat.push([...item])); // Копируем в новый массив

Array.from({ length: 10 }, () => (Math.random() > 0.50 ? 0 : 1));


function generateMatrix(x, y) {
  let matrix;
  let row, elem;
  let rowCount = x;
  let colCount = y;
  matrix = document.createElement('table')
  for (rowCount; rowCount > 0; rowCount--) {
    row = document.createElement('tr')
    for (colCount; colCount > 0; colCount--) {
      elem = document.createElement('td')
      elem.textContent = '0'
      elem.addEventListener('click', changeValue)
      row.appendChild(elem)
    }
    colCount = y;
    matrix.appendChild(row)
  }
  return matrix;
}


function changeValue() {
  if (this.textContent === '0') {
    this.textContent = 1
  }
  else this.textContent = 0
}

function clusterDomain(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        matrix[i][j] = areaNumber;
        checkNeighbors(i, j, matrix);
        areaNumber++;
      }
    }
  }
  return matrix;
}

function checkNeighbors(i, j, matrix) {
  if (
    j + 1 < matrix[i].length &&
    matrix[i][j + 1] > 0 &&
    matrix[i][j + 1] !== areaNumber
  ) {
    matrix[i][j + 1] = areaNumber;
    checkNeighbors(i, j + 1, matrix);
  }

  if (j - 1 >= 0 && matrix[i][j - 1] > 0 && matrix[i][j - 1] !== areaNumber) {
    matrix[i][j - 1] = areaNumber;
    checkNeighbors(i, j - 1, matrix);
  }

  if (
    i + 1 < matrix.length &&
    matrix[i + 1][j] > 0 &&
    matrix[i + 1][j] !== areaNumber
  ) {
    matrix[i + 1][j] = areaNumber;
    checkNeighbors(i + 1, j, matrix);
  }

  if (i - 1 >= 0 && matrix[i - 1][j] > 0 && matrix[i - 1][j] !== areaNumber) {
    matrix[i - 1][j] = areaNumber;
    checkNeighbors(i - 1, j, matrix);
  }
}
