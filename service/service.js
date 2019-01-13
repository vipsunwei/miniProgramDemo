const getSysApp = function ({url, mobile}) {
  return new Promise(resolve => {
    wx.request({
      method: 'POST',
      url,
      data: { mobile },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log('success', res)
        resolve(res)
      },
      fail(err) {
        console.error('err', err)
      },
      complete(res) {
        console.log('complete', res)
      }
    })
  })
}

const getAppList = function ({url, mobile}) {
  return new Promise(resolve => {
    wx.request({
      method: 'POST',
      url,
      data: { mobile },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log('success', res)
        resolve(res)
      },
      fail(err) {
        console.error('err', err)
      },
      complete(res) {
        console.log('complete', res)
      }
    })
  })
}

const service = {
  getSysApp,
  getAppList
}

module.exports = service