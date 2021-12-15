// pages/metting_info/metting_info.js
Page({
  data: {
    trade_news_png_url:'',
    menu_button_top:0
  },

  onLoad: function (options) {
    var that = this;
    var news_png_url = options.trade_news_content_image_url
    console.log('打开了一个新的页面：', news_png_url)
    let menu_button_height = wx.getMenuButtonBoundingClientRect()
    that.setData({
      trade_news_png_url:news_png_url,
      menu_button_top:menu_button_height.top
    })
  },
})