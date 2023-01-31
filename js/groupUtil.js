/**
 *
 * @param array
 * @param f
 * @param valueMapper
 * @returns {{}}, {key, list}
 */
function toMap(array, f, valueMapper = (it) => it) {
  if (array == null) return null
  const groups = {}
  array.forEach((o, index) => {
    const key = f(o, index)
    const value = valueMapper(o, index)
    const keyType = typeof key
    const group = keyType === 'string' || keyType === 'number' || keyType === 'boolean' ? key : JSON.stringify(key)
    groups[group] = groups[group] || []
    groups[group].push(value)
  })
  return groups
}

function toForest(array, config = {}) {
  if (array == null) return null

  const c = {
    parentKey: 'parentCode',
    idKey: 'code',
    childrenKey: 'children',
    valueMapper: it => it,
    ...config
  }
  const newArray = array.map(it => ({ ...it }))
  const aMap = groupFunc.toMap(newArray, it => it[c.parentKey], it => it)
  const idMap = groupFunc.associate(newArray, it => it[c.idKey])
  newArray.forEach(it => {
    it[c.childrenKey] = aMap[it[c.idKey]]
  })
  const forest = newArray.filter(it => idMap[idMap[it[c.idKey]][c.parentKey]] == null)
  return treeMap(forest, { childrenKey: c.childrenKey, newChildrenKey: c.childrenKey, valueMapper: c.valueMapper })
}

function treeMap(item, { childrenKey = 'children', newChildrenKey = 'children', valueMapper = it => it }) {
  if (item == null) return

  const config = { childrenKey, newChildrenKey, valueMapper }
  if (item instanceof Array) {
    const resArr = []
    for (const element of item) {
      resArr.push(_treeMap(element, config))
    }
    return resArr
  } else {
    return _treeMap(item, config)
  }
}

function treeEach(item, callbackFn, config = {}) {
  if (item == null) return
  const c = {
    childrenKey: 'children',
    ...config
  }
  if (item instanceof Array) {
    for (const element of item) {
      _treeEach(element, callbackFn, c)
    }
  } else {
    _treeEach(item, callbackFn, c)
  }
}

function _treeEach(item, callbackFn, config) {
  callbackFn(item)
  const children = item[config.childrenKey]
  if (children == null || children.length === 0) return
  for (const child of children) {
    _treeEach(child, callbackFn, config)
  }
}
function _treeMap(item, { childrenKey, newChildrenKey, valueMapper }) {
  const resItem = valueMapper(item)
  const children = item[childrenKey]
  if (children == null) return resItem
  resItem[newChildrenKey] = []
  if (children.length === 0) return resItem

  for (const child of children) {
    const newItem = _treeMap(child, { childrenKey, newChildrenKey, valueMapper })
    resItem[newChildrenKey].push(newItem)
  }
  return resItem
}
const groupFunc = {

  /**
   *
   * @param array
   * @param f
   * @param valueMapper
   * @returns {*[]}, [values]
   */
  toList(array, f, valueMapper = (it) => it) {
    if (array == null) return null
    return Object.values(toMap(array, f, valueMapper))
  },
  toMap: toMap,
  /**
   *
   * @param array
   * @param f
   * @param valueMapper
   * @returns {{}}, {key, value}
   */
  associate(array, f, valueMapper = (it) => it) {
    if (array == null) return null
    const groups = {}
    array.forEach((o, index) => {
      const key = f(o, index)
      const keyType = typeof key
      const group = keyType === 'string' || keyType === 'number' || keyType === 'boolean' ? key : JSON.stringify(key)
      groups[group] = valueMapper(o)
    })
    return groups
  },
  toForest: toForest,
  toTree(array, config) {
    if (array == null) return null
    return toMap(array, config)[0] || {}
  },
  treeMap: treeMap,
  treeEach: treeEach
}

export { groupFunc }
