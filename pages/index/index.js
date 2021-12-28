const app = getApp()

Page({
  data: {
    src: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    open_id: '',
    res: {},
    index_background_img:'',
    index_login_img:''
  },


onLoad(query) {
  wx.showToast({
    title: '正在进入',
    icon: 'loading',
    duration: 300
  })
  // 页面打开时，获取code，并根据code，获取open_id值
  var _this = this;
  var get_user_openid_url = app.globalData.URL + 'GetUserOpenid/'

  const q = decodeURIComponent(query.q) // 获取二维码原始链接内容
  _this.alert_user_in_mode(q)

  _this.setData({
    index_background_img: app.globalData.URL + 'img/wx_image/wgjz_login.png',
    index_login_img: app.globalData.URL + 'img/wx_image/biaoti@3x.png',
  })
  wx.getSystemInfo({
    success: function (res) {
      let clientHeight = res.windowHeight;
      let clientWidth = res.windowWidth;
      _this.setData({
        wx_height: clientHeight,
        wx_Width: clientWidth
      });
  }})
  wx.login({
    success (res) {
      if (res.code) {
        wx.request({
          url: get_user_openid_url,
          data: {
            code: res.code
          },
          success: (res) => {

            _this.setData({
              open_id: res.data.open_id
            })
            console.log('用户open_id为：', res.data.open_id)
            app.globalData.open_id = res.data.open_id
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })

  if (wx.getUserProfile) {
    this.setData({
      canIUseGetUserProfile: true
    })
  }
  
},

// 修改用户进入小程序方式状态
alert_user_in_mode(q){
  if (q == 'undefined'){
    console.log('该用户为搜索进入')
  }else{
    app.globalData.in_mode = true
    console.log('该用户为扫码进入')
  }
},

getUserProfile(e) {
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，
  // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  var that = this;
  wx.getUserProfile({
    desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
      // 获得用户微信头像

      app.globalData.head_photo_url = res.userInfo.avatarUrl
      app.globalData.nickName = res.userInfo.nickName
      this.Countdown()
    }
  })
},

Countdown() {
  let that = this;
  setTimeout(function () {
    that.submitUserInfo()
  }, 1000);
},

submitUserInfo(){
  // 获取到个人信息和个人唯一标识后将信息发送到后端进行保存,
  var save_user_info_url = app.globalData.URL + 'SaveUserInfo/'
  if (app.globalData.open_id != ''){
    wx.request({
      url: save_user_info_url,
      method: "POST",
      dataType:'json',
      data: {
        userInfo: this.data.userInfo,
        open_id: app.globalData.open_id,
        in_mode: app.globalData.in_mode
      },
      // 根据返回结果进行判断 为false关闭当前页面，跳转到拍照页面
      // 为true时，修改全局变量
      success: (res) => {
        if(res.data.if_img==false){
          console.log('该用户未录入脸部信息')
          wx.navigateTo({
            url: "../if_user_photo/if_user_photo"
          })
        }else{
          // 判断用户是否完成了长期消息订阅
          if(res.data.long_message==true){
            app.globalData.long_message = true
          }
          app.globalData.if_img = true
          wx.switchTab({
            url: "../show/show"
          })
        }
      },
      fail:(res) =>{
        console.log('请求失败')
      }
    })
  }else{
    wx.showToast({
      title: '登录中...',
      icon: 'loading',
      duration: 3000
    })
    console.log('没有获取到open_id')
    this.Countdown()
  }
},

tourist(){
  // 用户点击了游客身份，跳转到首页
  wx.showModal({
    title: '游客身份',
    content: '游客身份只能查看首页，其他页面需要登录后查看',
    success(res) {
     if (res.confirm) {
      console.log('用户点击确定')
      wx.switchTab({
       url: "../show/show"
     })
     app.globalData.open_id = ''
     } else if (res.cancel) {
      console.log('用户点击取消')
     }
    }
   })
}
})
