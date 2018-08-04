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
  const x = document.querySelector('#x')
  const y = document.querySelector('#y')
})



primaryMatrix.forEach(item => newMat.push([...item])); // Копируем в новый массив

Array.from({ length: 10 }, () => (Math.random() > 0.50 ? 0 : 1));

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
