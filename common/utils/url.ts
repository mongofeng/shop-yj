export function query2Obj(query: string) {
  return query.split('&').reduce(function (intV: {
    [key in string] : string
  }, i) {
    var arr = i.split('=')
    if (arr[0] && arr[1]) {
      intV[arr[0]] = arr[1]
    }
    return intV;
  }, {})
}


export function getQuery() {
  var href = location.href
  return href.slice(href.indexOf('?') + 1)
}
