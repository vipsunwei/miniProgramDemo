//index.js
//获取应用实例
const app = getApp()
const config = app.globalData.config

Page({
  onShareAppMessage() {
    return {
      title: '小程序demo',
      path: 'pages/index/index'
    }
  },

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    selectIndex: 0,
    selectList: [],

    imgUrls: [
      '../../image/banner_test.jpg',
      '../../image/banner_test1.jpg',
      '../../image/banner_test2.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 1000,

    officeList: [],
    freeFlowArea: [],
    popularApp: [],
    myAppsList: [],
  
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    this.getAppList()
    this.getSysApp()
  },

  getAppList: function () {
    let __this = this
    let mobile = config.testMobile
    let url = config.appListUrl

    wx.request({
      method: 'POST',
      url,
      data: {mobile},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log('success', res)
        __this.formatAppList(res.data.resultmsg)
      },
      fail (err) {
        console.error('err', err)
      },
      complete (res) {
        console.log('complete', res)
      }
    })
  },
  formatAppList: function (res) {
    app.globalData.rawAppList = res
    let selectList = this.formatSelectList(res)
    this.setData({
      selectList
    })

    let selectIndex = this.data.selectIndex
    let currentKey = selectList[selectIndex].key
    let officeList = this.formatOfficeList(res, currentKey)
    this.setData({
      officeList
    })
  },
  formatSelectList: function (rawAppList) {
    let selectList = []
    if (rawAppList && typeof rawAppList === 'object') {
      for (const key in rawAppList) {
        if (rawAppList.hasOwnProperty(key)) {
          selectList.push({
            key,
            name: rawAppList[key][0].publicNickname
          })
        }
      }
    }
    return selectList
  },
  formatOfficeList: function (rawAppList, currentKey) {
    let __this = this
    let officeList = []
    if (rawAppList && typeof rawAppList === 'object') {
      let rawOfficeList = rawAppList[currentKey]
      rawOfficeList.length && rawOfficeList.map(item => {
        item.logoUrl = __this.formatLogoUrl(item.logourl)
        officeList.push(item)
      })
    }
    return officeList
  },
  getSysApp: function () {
    let __this = this
    let mobile = config.testMobile
    let url = config.sysAppUrl

    wx.request({
      method: 'POST',
      url,
      data: {mobile},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log('success', res)
        __this.formatSysApp(res.data.resultmsg)
      },
      fail (err) {
        console.error('err', err)
      },
      complete (res) {
        console.log('complete', res)
      }
    })
  },

  formatSysApp: function (res) {
    app.globalData.rawSysApp = res
    let rawFreeFlowArea = res['免流专区']
    let rawPopularApp = res['热门应用']
  
    let freeFlowArea = this.formatFreeFlowArea(rawFreeFlowArea)
    this.setData({
      freeFlowArea
    })

    let popularApp = this.formatPopularApp(rawPopularApp)
    this.setData({
      popularApp
    })
  },

  formatFreeFlowArea: function (rawFreeFlowArea) {
    let __this = this
    let freeFlowArea = []
    rawFreeFlowArea.length && rawFreeFlowArea.map(item => {
      item.logoUrl = __this.formatLogoUrl(item.logourl)
      freeFlowArea.push(item)
    })
    return freeFlowArea
  },

  formatPopularApp: function (rawPopularApp) {
    let __this = this
    let popularApp = []
    rawPopularApp.length && rawPopularApp.map(item => {
      item.logoUrl = __this.formatLogoUrl(item.logourl)
      popularApp.push(item)
    })
    return popularApp
  },

  formatLogoUrl: function (rawLogoUrl) {
    let logoUrl = ''
    if (rawLogoUrl.indexOf('http') !== -1) {
      logoUrl = rawLogoUrl
    } else {
      logoUrl = config.host + rawLogoUrl
    }
    return logoUrl
  },

  goToMyApps: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../myApps/myApps',
    })
  },

  bindPickerChange(e) {
    let selectIndex = e.detail.value
    this.setData({
      selectIndex
    })

    let selectList = this.data.selectList
    let currentKey = selectList[selectIndex].key
    let rawAppList = app.globalData.rawAppList
    let officeList = this.formatOfficeList(rawAppList, currentKey)
    this.setData({
      officeList
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
