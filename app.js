const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ff2400', '#ff4d00', '#ff4f00', '#edff21', '#ccff00', '#42aaff', '#adff2f', '#e6a8d7', '#8b00ff', '#adff2f', '#ffa812', '#ffcc00', '#ffcf48', '#00bfff', '#87cefa', '#80daeb', '#00ffff', '#fffafa', '#bdecb6']
let time = 10
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) { //делегирование событий
    time = parseInt(event.target.dataset.time) //аналогичная запись .getAttribute('data-time'), пользовательский 'data-' атрибут
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})


// startGame()

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle(``)
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h2>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  setColor(circle)
  const size = getRandomNumber(10, 50)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
  const color = getRandomColor()
  element.style.backgroundColor = color
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}