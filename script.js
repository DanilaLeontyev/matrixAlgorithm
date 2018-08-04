let areaNumber = 2;
const createMatrix = document.querySelector('#createMatrix')
const calcDomain = document.querySelector('#calcDomain')

createMatrix.addEventListener('click', function () {
  const x = document.querySelector('#x').value
  const y = document.querySelector('#y').value
  let matrixContainer = document.querySelector('.matrix-container')
  matrixContainer.appendChild(generateMatrix(x, y));
})

calcDomain.addEventListener('click', function () {
  let matrixDomain = clusterDomain(readMatrix())
  console.log(matrixDomain)
})

function readMatrix() {
  let matrixRow = document.querySelectorAll('.matrix-row')
  let matrix = [];
  matrixRow.forEach(function (row) {
    let matrixRow = []
    row.childNodes.forEach(function (elem) {
      matrixRow.push(+elem.textContent)
    })
    matrix.push(matrixRow)
  })
  return matrix;
}

Array.from({ length: 10 }, () => (Math.random() > 0.50 ? 0 : 1));

function generateMatrix(x, y) {
  let row, elem;
  let rowCount = x;
  let colCount = y;
  let matrix = document.createElement('table')
  matrix.classList.add('matrix')

  for (rowCount; rowCount > 0; rowCount--) {
    row = document.createElement('tr')
    row.classList.add('matrix-row')
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
  areaNumber = 2;
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
