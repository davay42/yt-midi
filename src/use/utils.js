// https://stackoverflow.com/a/8260383
export function youtubeParser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length == 11 ? match[7] : false
}

// https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
export function getJsonFromUrl(url) {
  if (!url) url = location.href
  var question = url.indexOf('?')
  var hash = url.indexOf('#')
  if (hash == -1 && question == -1) return {}
  if (hash == -1) hash = url.length
  var query =
    question == -1 || hash == question + 1
      ? url.substring(hash + 1)
      : url.substring(question + 1, hash)
  var result = {}
  query.split('&').forEach(function (part) {
    if (!part) return
    part = part.split('+').join(' ') // replace every + with space, regexp-free version
    var eq = part.indexOf('=')
    var key = eq > -1 ? part.substr(0, eq) : part
    var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : ''
    var from = key.indexOf('[')
    if (from == -1) result[decodeURIComponent(key)] = val
    else {
      var to = key.indexOf(']', from)
      var index = decodeURIComponent(key.substring(from + 1, to))
      key = decodeURIComponent(key.substring(0, from))
      if (!result[key]) result[key] = []
      if (!index) result[key].push(val)
      else result[key][index] = val
    }
  })
  return result
}
