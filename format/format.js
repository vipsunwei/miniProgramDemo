const config = require('../config.js')
const format = {
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
}

module.exports = format