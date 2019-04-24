const loadModel = function () {
  const db = wx.cloud.database();
  const coll = db.collection('user');
  return coll;
}

const fetchUserInfo = function() {
  let coll = loadModel()
  let userInfo = coll.get();
  return userInfo;
}

const createUser = function() {
  let coll = loadModel()
  return coll.add({
    data: {
      status: 'new',
      regtime: (new Date).getTime()
    }
  })
}

exports.fetchUserInfo = fetchUserInfo
exports.createUser = createUser
