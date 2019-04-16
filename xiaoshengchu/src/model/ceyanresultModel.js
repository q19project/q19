const loadResult = function () {
  const db = wx.cloud.database();
  const coll = db.collection('ceyanresult');
  return coll;
}

const fetchResult = async function () {
  let coll = loadResult()
  let ret = await coll.get()
  console.log(ret)
  return ret
}

exports.fetchResult = fetchResult
