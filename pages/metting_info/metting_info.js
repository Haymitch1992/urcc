// pages/metting_info/metting_info.js
Page({
  data: {
    meeting_data:{},
    meeting_info:'',
    menu_button_top:0
  },

  onLoad: function (options) {
    var that = this;
    var meeting_data = JSON.parse(options.meeting)
    let reg = RegExp('\\\\n', 'g')
    var meeting_info = meeting_data.meeting_info.replace(reg, '\n')
    let menu_button_height = wx.getMenuButtonBoundingClientRect()
    that.setData({
      meeting_data:meeting_data,
      meeting_info:meeting_info,
      menu_button_top:menu_button_height.top
    })
  },
})