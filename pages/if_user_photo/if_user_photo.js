// pages/if_user_photo/if_user_photo.js
Page({
data: {
      dialogShow: false,
      showOneButtonDialog: false,
      buttons: [{text: '再想一想'}, {text: '狠心离开'}],
      menu_button_top:0
},
onLoad: function (options) {
  var that = this;
  let menu_button_height = wx.getMenuButtonBoundingClientRect()
  that.setData({
    menu_button_top:menu_button_height.top
  })
},
openConfirm: function () {
    this.setData({
        dialogShow: true
    })
},
tapDialogButton(e) {
    this.setData({
        dialogShow: false,
        showOneButtonDialog: false
    })
    if(e.detail.index==1){
      wx.switchTab({
        url: '../home/home'
      })
    }
},
if_photo:function(){
  // 判断用户点击行为，‘1’为确定录入信息， ‘0’为用户放弃，并跳转到相应的页面
wx.redirectTo({
  url: '../save_face/save_face'
})
}
})
