const app = getApp()
const config = app.globalData.config
const service = require('../../service/service.js')
const format = require('../../format/format.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile: {},
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.formatProfile(options)
    let res = wx.getLaunchOptionsSync()
    console.log('launch', res)
  },

  formatSysApp: function (options) {
    let rawSysApp = app.globalData.rawSysApp
    let cat = options.c === 'mlzq' ? '免流专区' : options.c === 'rmyy' ? '热门应用' : ''
    let id = options.i
    let profile = {}
    console.log('进来: ', app.globalData, options)
    let list = rawSysApp[cat]
    for (let i = 0, l = list.length; i < l; i++) {
      let item = list[i]
      if (+item.id === +id) {
        item.logoUrl = format.formatLogoUrl(item.logourl)
        profile = item
        break
      }
    }
    this.setData({
      profile
    })

    let imgList = this.formatImgList(profile.imglist)
    this.setData({
      imgList
    })
  },

  formatProfile: function (options) {
    let __this = this
    if (!app.globalData.rawSysApp) {
      let mobile = config.testMobile
      let url = config.sysAppUrl
      service.getSysApp({url, mobile}).then(function (res) {
        app.globalData.rawSysApp = res.data.resultmsg
        __this.formatSysApp(options)
      })
    } else {
      __this.formatSysApp(options)
    }
  },
  formatImgList: function (rawImgList) {
    let imgList = []
    rawImgList.length && rawImgList.map(item => {
      item.imgPath = this.formatImgPath(item.imgpath)
      imgList.push(item)
    })
    return imgList
  },
  formatImgPath: function (rawImgPath) {
    let imgPath = ''
    let host = config.host
    if (rawImgPath.indexOf('http') !== -1) {
      imgPath = rawImgPath
    } else {
      imgPath = host + rawImgPath
    }
    return imgPath
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '应用详情'
    }
  }
})