// pages/my/my.js
const app = getApp()  // 引入全局变量 app
Page({

  data: {
    head_photo_url:'',
    nickName:'',
    user_img_value:'人脸未采集',
    menu_button_top:0,
    long_message_value:'立即订阅'
  },

  onLoad: function (options) {
    var that = this;
    var head_photo_url = app.globalData.head_photo_url;
    var nickName = app.globalData.nickName;
    this.if_user_img()
    let menu_button_height = wx.getMenuButtonBoundingClientRect()
    that.setData({
      head_photo_url: head_photo_url,
      nickName: nickName,
      menu_button_top:menu_button_height.top
    })
  },

  
  onShow: function () {
    this.if_user_img()
  },
  if_user_img(){
    var that = this;
    var if_img = app.globalData.if_img;
    var long_message = app.globalData.long_message;
    if (if_img==true){
      that.setData({
        user_img_value: '已完成人脸采集',
      })
    }
    if (long_message==true){
      that.setData({
        long_message_value: '订阅成功',
      })
    }
  },
  login(){
    wx.reLaunch({
      url: "../index/index"
    })
  },

  //用户点击立即订阅
  news_subscription(){
    // 判断用户 完成了登录和人脸注册
    let that = this;
    if(app.globalData.open_id=='' || app.globalData.if_img==false){
      console.log('当前用户，不满足订阅消息的条件')
    }else{
      console.log('用户满足订阅消息的条件')
      wx.requestSubscribeMessage({
        tmplIds: ['6wsTSm-jf9sKQCZsODTdDFtlYn8MzOCYhG_J2qGljwA'],
        success (res) {
          // 判断用户消息订阅成功时，发送请求，改变该用户消息订阅，长期状态
          if (res.errMsg=="requestSubscribeMessage:ok"){
            that.alter_long_message_type()
          }
         },
         fail(res){
          console.log('订阅信息错错误信息是：', res)
         }
      })
    }
  },

  // 修改消息订阅状态
  alter_long_message_type(){
    let that = this;
    var alter_long_message_url = app.globalData.URL + 'AlterLongMessage/?open_id=' + app.globalData.open_id
    wx.request({
      url: alter_long_message_url,
      method: "GET",
      success: (res) =>{
        that.setData({
        long_message_value: '订阅成功',
      })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
         })
      }
    })
  }
})