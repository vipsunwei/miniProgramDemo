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
    selectList: [
      '新媒传信科技有限公司',
      '融通公司',
      '神州泰岳',
      '阿里巴巴',
      '百度',
      '腾讯'
    ],

    imgUrls: [
      '../../image/banner_test.jpg',
      '../../image/banner_test1.jpg',
      '../../image/banner_test2.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 1000,

    freeFlowArea: [],
    popularApp: [],
    officeList: [],
    myAppsList: [],
  
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    this.getSysApp()
  },

  getSysApp: function () {
    let __this = this
    let mobile = config.testMobile
    let url = config.sysAppUrl
    let popularApp = app.globalData.popularApp
    let freeFlowArea = app.globalData.freeFlowArea



    wx.request({
      method: 'POST',
      url,
      data: {mobile},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
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
    let rawFreeFlowArea = res['免流专区']
    let rawPopularApp = res['热门应用']
    
    app.globalData.freeFlowArea = rawFreeFlowArea
    app.globalData.popularApp = rawPopularApp
  
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

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goToMyApps: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../myApps/myApps',
    })
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectIndex: e.detail.value
    })
  },
})
