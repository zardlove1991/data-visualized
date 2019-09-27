const dateFormat = (inputTime) => {
  inputTime = parseInt(inputTime) * 1000
  let date = new Date(inputTime)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  let time = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  return time.slice(5, 16)
}

export default {
  dateFormat
}
