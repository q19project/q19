const static2chart = function (staticData) {
  let data = []
  let keys = []
  // 抽取所有的key
  for (let itemkey in staticData) {
    keys.push(itemkey)
  }

  keys.sort()

  for (let itemkey of keys) {
    let item = staticData[itemkey]
    data.push({
      timu: '第' + (itemkey.substr(6) * 1 + 1) + '题',
      timer: item.timer_duration
    })
  }
  return data
}

exports.static2chart = static2chart
