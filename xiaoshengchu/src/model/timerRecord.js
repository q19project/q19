// 记录每一题的答题时间
// {
//   timer_seperate: [15.....,15...,...]
//   timer_duration: 1023
// }

let recordData = {

}


const getAllRecord = function () {

}

const getRecord = function (key) {
  if (typeof recordData[key] === 'undefined') {
    recordData[key] = {
      timer_seperate: [],
      timer_duration: 0
    }
  }
  return recordData[key]
}

const recordStart = function (options) {
  let record = getRecord(options.name)
  let now = (new Date).getTime()
  record.timer_seperate.push(now)
  console.log('记录开始：', options, (new Date).getTime(), record)
}

const recordEnd = function (options) {
  // 如果record长度特别长就可能降低运行速度
  let record = getRecord(options.name)
  let now = (new Date).getTime()
  let theDuration = now - record.timer_seperate[record.timer_seperate.length - 1]
  record.timer_seperate.push(now)
  let curDuration = record.timer_duration
  record.timer_duration = curDuration + theDuration
  console.log('记录结束：', options, (new Date).getTime(), record)

}

const recordGetAll = function() {
  return recordData
}

exports.recordEnd = recordEnd
exports.recordStart = recordStart
exports.recordGetAll = recordGetAll
