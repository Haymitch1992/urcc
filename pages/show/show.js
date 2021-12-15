// pages/my/my.js
const app = getApp()  // 引入全局变量 app
Page({

  data: {
    menu_button_top:0
  },

  onLoad: function (options) {
    var that = this;
    let menu_button_height = wx.getMenuButtonBoundingClientRect()
    that.setData({
      menu_button_top:menu_button_height.top
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000
    })
  }
})