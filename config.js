/**
 * 配置文件
 */

// 此处接口地址配置
const protocol = 'https://'
const domain = 'gz.feixin.10086.cn'
const apiUrl = '/gzapp'

const config = {
  testMobile: '15811265129',
  host: `${protocol}${domain}`,
  // 免流和热门应用接口
  sysAppUrl: `${protocol}${domain}${apiUrl}/getsysapp`
}

module.exports = config
