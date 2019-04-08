const loadCeyan = function () {
  const db = wx.cloud.database();
  const coll = db.collection('ceyan');
  return coll;
}

const flatTimu = function (ceyanData) {
  // console.log(ceyanData)
  // {
  //   "timu",
  //     "number",
  //     "score",
  //     "total",
  //     "name"
  // }
  let timu = ceyanData.timu
  let timuList = []
  timu.forEach(element => {
    // console.log(ceyanData.number[element])
    for (let i = 0; i < ceyanData.number[element]; i++) {
      timuList.push(element)
    }
  });
  // console.log(timuList)
  return timuList

  // 根据number进行拆解，如果所有number为空，原样返回

  // {
  //   "_id",
  //   "content",
  //   "rule",
  //   "type",
  //   "options"
  // }
}

const fetchDetail = async (ceyanId) => {
  let coll = loadCeyan()
  let res = await coll
    .where({
      _id: ceyanId
    })
    .get()
  console.log(res)
  let ceyanData = res.data[0]
  console.log(ceyanData)
  return ceyanData
}
exports.fetchDetail = fetchDetail
exports.flatTimu = flatTimu

