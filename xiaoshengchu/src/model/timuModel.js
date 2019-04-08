let cache = {

}
let modelCache = {

}
const loadTimu = function () {
  const db = wx.cloud.database();
  const coll = db.collection('timu');
  return coll;
}

const loadCeyan = function () {
  const db = wx.cloud.database();
  const coll = db.collection('ceyan');
  return coll;
}


const transformContent = (content, transformRules) => {
  // console.log(transformRules)
  // 暂时只支持范围 num1-num2
  function srandom(low, high) {
    return Math.round(low + Math.random() * (high - low))
  }
  for (const key in transformRules) {
    if (transformRules.hasOwnProperty(key)) {
      const element = transformRules[key];
      let range = element.split('-')
      content = content.replace(key, srandom(range[0] * 1, range[1] * 1))
    }
  }
  return content
}

const fetchRemoteDetail = async (timuId) => {
  if (!modelCache[timuId]) {
    let coll = loadTimu();
    let res = await coll.where({
      _id: timuId
    }).get()
    let timuData = res.data[0]
    modelCache[timuId] = timuData
    return timuData
  } else {
    return modelCache[timuId]
  }
}

const fetchDetail = async (timuId, index = 0) => {
  let cacheKey = timuId + '_' + index
  // console.log(cache[cacheKey])
  if (!cache[cacheKey]) {
    let timuData = await fetchRemoteDetail(timuId)
    // let _timuData = _.cloneDeep(timuData)
    let _timuData = JSON.parse(JSON.stringify(timuData))
    // console.log(timuData)
    // let _timuData = timuData
    console.log(_timuData.content)
    let realContent = transformContent(_timuData.content, _timuData.transform_rules)
    // console.log(realContent)
    _timuData.content = realContent
    cache[cacheKey] = _timuData
  }
  // 可变换题型需进行变换，变换根据content及transform_rules进行
  // cache[timuId] = timuData
  return cache[cacheKey]
}

exports.loadTimu = loadTimu;
exports.loadCeyan = loadCeyan;
exports.fetchDetail = fetchDetail;
