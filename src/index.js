const os = require('os')

/**
 * Pad a number to two digits
 *
 * @param  {number} number Number to pad
 * @return {string}        Padded number
 */
const pad2 = (number) => `${number < 10 ? 0 : ''}${number}`

/**
 * Returns the system uptime in number of seconds
 *
 * @return {number} System uptime
 */
const getUptime = () => os.uptime()

/**
 * Returns the formatted system uptime
 *
 * @param  {number} uptime Number to format
 * @return {string} Uptime
 */
const format = (uptime) => {
  const date = new Date(uptime * 1000)

  const days = pad2(parseInt(uptime / 86400, 10))
  const hours = pad2(date.getUTCHours())
  const minutes = pad2(date.getUTCMinutes())
  const seconds = pad2(date.getUTCSeconds())

  if (days === '00' && hours === '00' && minutes === '00') {
    return `${seconds}s`
  }

  if (days === '00' && hours === '00') {
    return `${minutes}m ${seconds}s`
  }

  if (days === '00') {
    return `${hours}h ${minutes}m ${seconds}s`
  }

  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

module.exports = () => () => {
  const uptime = getUptime()

  return new Promise((resolve) => resolve([{
    id: `zazu-uptime.${uptime}`,
    title: format(uptime)
  }]))
}
