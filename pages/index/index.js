//index.js
const service = require('../../service/service.js')
const format = require('../../format/format.js')
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

    service.getAppList({url, mobile}).then(function (res) {
      __this.formatAppList(res.data.resultmsg)
    })
  },
  formatAppList: function (res) {
    app.globalData.rawAppList = res
    let selectList = format.formatSelectList(res)
    this.setData({
      selectList
    })

    let selectIndex = this.data.selectIndex
    let currentKey = selectList[selectIndex].key
    let officeList = format.formatOfficeList(res, currentKey)
    this.setData({
      officeList
    })
  },
  getSysApp: function () {
    let __this = this
    let mobile = config.testMobile
    let url = config.sysAppUrl

    service.getSysApp({url, mobile}).then(function (res) {
      console.log('promise: ', res)
      __this.formatSysApp(res.data.resultmsg)
    })
  },

  formatSysApp: function (res) {
    app.globalData.rawSysApp = res
    let rawFreeFlowArea = res['免流专区']
    let rawPopularApp = res['热门应用']
  
    let freeFlowArea = format.formatFreeFlowArea(rawFreeFlowArea)
    this.setData({
      freeFlowArea
    })

    let popularApp = format.formatPopularApp(rawPopularApp)
    this.setData({
      popularApp
    })
  },

  toAppProfile: function (e) {
    let c = e.target.dataset.cat
    let i = e.target.dataset.id
    console.log(c, i)

    wx.navigateTo({
      url: `../profile/profile?c=${c}&i=${i}`
    })
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
