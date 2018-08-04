const createMatrix = document.querySelector('#createMatrix')
const calcDomain = document.querySelector('#calcDomain')
const autoMatrix = document.querySelector('#autoMatrix')
const matrixContainer = document.querySelector('.matrix-container')
const domainCountOutput = document.querySelector('.domainCount')

createMatrix.addEventListener('click', function () {
  const x = document.querySelector('#x').value
  const y = document.querySelector('#y').value
  matrixContainer.appendChild(generateMatrix(x, y));
})

calcDomain.addEventListener('click', function () {
  clusterDomain(readMatrix())
  getDomainCount()
})

autoMatrix.addEventListener('click', function () {
  const x = document.querySelector('#x').value
  const y = document.querySelector('#y').value
  const probability = document.querySelector('#probability').value
  matrixContainer.appendChild(generateMatrix(x, y, probability));
})

function readMatrix() {
  let matrixRow = document.querySelectorAll('.matrix-row')
  let matrix = [];
  matrixRow.forEach(function (row) {
    let matrixRow = []
    row.childNodes.forEach(function (elem) {
      matrixRow.push(elem)
    })
    matrix.push(matrixRow)
  })
  return matrix;
}

function generateMatrix(x, y, probability) {
  let row, elem;
  let rowCount = x;
  let colCount = y;
  let matrix = document.createElement('table')
  matrix.classList.add('matrix')

  if (matrixContainer.hasChildNodes()) {
    matrixContainer.removeChild(matrixContainer.childNodes[0])
  }

  for (rowCount; rowCount > 0; rowCount--) {
    row = document.createElement('tr')
    row.classList.add('matrix-row')
    for (colCount; colCount > 0; colCount--) {
      elem = document.createElement('td')
      if (probability) {
        elem.textContent = Math.random() > probability ? 0 : 1
        elem.dataset.domain = elem.textContent
      } else {
        elem.textContent = '0'
        elem.dataset.domain = '0'
      }
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
    this.dataset.domain = 1
  }
  else {
    this.textContent = 0
    this.dataset.domain = 0
  }
}

function getDomainCount() {
  let matrix = readMatrix()
  let domainCount = 0;
  matrix.forEach(function (row) {
    row.forEach(function (elem) {
      if (elem.dataset.domain > domainCount) {
        domainCount = +elem.dataset.domain
      }
    })
  })
  domainCountOutput.innerHTML = `Всего доменов: ${domainCount}`
}

function clusterDomain(matrix) {
  let areaNumber = 2;
  domainCount = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].dataset.domain === '1') {
        let color = getRandomColor();
        matrix[i][j].dataset.domain = areaNumber;
        matrix[i][j].style.backgroundColor = color;
        checkNeighbors(i, j, matrix, color, areaNumber);
        areaNumber++;
      }
    }
  }
  areaNumber = 2;
  return matrix;
}

function checkNeighbors(i, j, matrix, color, areaNumber) {
  if (
    j + 1 < matrix[i].length &&
    matrix[i][j + 1].dataset.domain === '1' &&
    matrix[i][j + 1].dataset.domain !== areaNumber
  ) {
    matrix[i][j + 1].dataset.domain = areaNumber;
    matrix[i][j + 1].style.backgroundColor = color;
    checkNeighbors(i, j + 1, matrix, color, areaNumber);
  }

  if (j - 1 >= 0 && matrix[i][j - 1].dataset.domain === '1' && matrix[i][j - 1].dataset.domain !== areaNumber) {
    matrix[i][j - 1].dataset.domain = areaNumber;
    matrix[i][j - 1].style.backgroundColor = color;
    checkNeighbors(i, j - 1, matrix, color, areaNumber);
  }

  if (
    i + 1 < matrix.length &&
    matrix[i + 1][j].dataset.domain === '1' &&
    matrix[i + 1][j].dataset.domain !== areaNumber
  ) {
    matrix[i + 1][j].dataset.domain = areaNumber;
    matrix[i + 1][j].style.backgroundColor = color;
    checkNeighbors(i + 1, j, matrix, color, areaNumber);
  }

  if (i - 1 >= 0 && matrix[i - 1][j].dataset.domain === '1' && matrix[i - 1][j].dataset.domain !== areaNumber) {
    matrix[i - 1][j].dataset.domain = areaNumber;
    matrix[i - 1][j].style.backgroundColor = color;
    checkNeighbors(i - 1, j, matrix, color, areaNumber);
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}