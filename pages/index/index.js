//index.js
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '小程序demo',
      path: 'pages/index/index'
    }
  },

  data: {
    motto: 'Hello World',
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

    officeList: [
      {
        iconPath: '../../image/icon/icon_taobao.png',
        name: '淘宝'
      },
      {
        iconPath: '../../image/icon/jd.png',
        name: '京东'
      },
      {
        iconPath: '../../image/icon/suning.png',
        name: '苏宁'
      },
      {
        iconPath: '../../image/icon/tmall.png',
        name: '天猫'
      },
      {
        iconPath: '../../image/icon/didi_01.png',
        name: '滴滴'
      },
      {
        iconPath: '../../image/icon/hfx.png',
        name: '和飞信'
      },
      {
        iconPath: '../../image/icon/zhifubao.png',
        name: '支付宝'
      },
      {
        iconPath: '../../image/icon/douyin@2x.png',
        name: '抖音'
      },
      {
        iconPath: '../../image/icon/wechat.png',
        name: '微信'
      },
      {
        iconPath: '../../image/icon/qq.png',
        name: 'QQ'
      },
      {
        iconPath: '../../image/icon/txsp.png',
        name: '腾讯视频'
      },
      {
        iconPath: '../../image/icon/aiqiyi.png',
        name: '爱奇艺'
      },
      {
        iconPath: '../../image/icon/qqyy.png',
        name: 'QQ音乐'
      },
      {
        iconPath: '../../image/icon/xiaohongshu.png',
        name: '小红书'
      },
      {
        iconPath: '../../image/icon/kugoo.png',
        name: '酷狗'
      },
      {
        iconPath: '../../image/icon/kuwo.png',
        name: '酷我'
      }
    ],

    myAppsList: [
      {
        iconPath: '../../image/icon/kuwo.png',
        name: '酷我'
      },
      {
        iconPath: '../../image/icon/kugoo.png',
        name: '酷狗'
      },
      {
        iconPath: '../../image/icon/xiaohongshu.png',
        name: '小红书'
      },
      {
        iconPath: '../../image/icon/wechat.png',
        name: '微信'
      },
      {
        iconPath: '../../image/icon/douyin@2x.png',
        name: '抖音'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goToMyApps: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../myApps/myApps?id=1',
    })
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectIndex: e.detail.value
    })
  },
})
