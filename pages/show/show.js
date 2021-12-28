// pages/my/my.js
const app = getApp()  // 引入全局变量 app
Page({

  data: {
    menu_button_top:0,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  get_trade_news:function(){
    // 用户打开首页，获取行业资讯模块内容
    var that = this;
    var get_trade_news_url = app.globalData.URL + 'AllTradeNews/'
    wx.request({
      url: get_trade_news_url,
      method: "GET",
      dataType: 'json',
      success: (res) =>{
        that.setData({
          title_list:res.data.title_list,
          content_image_list:res.data.content_image_list,
          imgUrls:res.data.image_list,
          title:res.data.title_list[0]
        })
      }
    })
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

    this.get_trade_news()
  }
})