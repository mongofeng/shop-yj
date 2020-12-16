import { getQuery, query2Obj } from '@root/common/utils/url'

function main () {
  const obj = query2Obj(getQuery())

  const code = obj.code

  console.log(obj)
}

main()
