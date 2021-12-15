// app.js
App({
  // onLaunch() {
  //   // 展示本地存储能力
  //   const logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  // },
  globalData: {
    URL: 'https://www.wgjz.vip:30401/',
    HEADER: {
      'content-type': 'multipart/form-data'
    },
    if_img: false,
    long_message: false,
    open_id: '',
    head_photo_url: '',
    nickName: '',
    visitor_location: '00',
    in_mode: false
  }
})



