// pages/meeting/meeting.js
const app = getApp()
Page({
  data: {
    user_info: {},
    menu_button_top:0,
    imgList: []
  },

  onLoad: function (options) {
  var that = this;
  wx.showToast({
    title: '加载中...',
    icon: 'loading',
    duration: 1000
  })
  let menu_button_height = wx.getMenuButtonBoundingClientRect()
  that.setData({
    menu_button_top:menu_button_height.top
  })
  this.if_login()
  this.get_user_info()
  },

  onShow: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000
    })
    var that = this;
    that.if_login()
  },

  get_user_info(){
    // 获取用户个人记录信息，若无个人记录信息，则展示默认值
    var that = this;
    var user_info_url = app.globalData.URL + 'AddUserInfo/?open_id=' + app.globalData.open_id
    wx.request({
      url: user_info_url,
      method: "GET",
      success: (res) => {
        app.globalData.visitor_location = res['data']['userInfo']['visitor_location']
        that.setData({
          user_info: res['data']['userInfo'],
          imgList: [app.globalData.URL + 'img/' + res['data']['userInfo']['user_visit_image_path'] + '/']
        })
        that.Countdown()
      },
      fail:(res) =>{
        console.log('请求失败')
      }
    })
  },


  if_login(){
    //判断用户是否登录，如果没有登录，不能访问 该网页
    let that = this;
    if(app.globalData.open_id=='' || app.globalData.if_img==false){
      wx.showModal({
        title: '登录提醒',
        content: '查看此页面，请登录并完成人脸信息采集',
        success(res) {
         if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url:"../my/my"
            })
         } else if (res.cancel) {
          console.log('用户点击取消')
          wx.switchTab({
            url:"../my/my"
            })
         }
        }
       })
    }
  },

  preview(event) {
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.imgList,  // 需要预览的图片http链接列表
      fail(res) {
        console.log('error -----------------',res)
      }
    })
  },

  Countdown() {
    let that = this;
    setTimeout(function () {
      that.get_user_info()
    }, 3000);
  }
})
