const app = getApp()

Page({
  data: {
    photo_file_path: '',
    face_response: NaN,
    face_num: 0,
    completeness_value: '未通过',
    if_img: false,
    face_message: '',
    widheight:0,
    menu_button_top:0
  },
  onLoad: function (query) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000
    })
  this.get_win_width()
  let menu_button_height = wx.getMenuButtonBoundingClientRect()
  var face_response = JSON.parse(query.face_response)
  // 获得拍照结果
  this.setData({
      photo_file_path: query.photo_path,
      face_response: face_response,
      menu_button_top:menu_button_height.top
  })

  // 将拍照结果进行，展示
  this.if_face_resopnse()
  },

  // 重新注册人脸进行拍照
  anew: function(){
    wx.redirectTo({
      url: "../save_face/save_face"
    })
  },

  // 确认保存
  confirm: function(){
    this.photo_ok()
  },
  photo_ok(){
    var that = this;
    var if_face_image = that.data.face_response['if_img']
    var in_mode = app.globalData.in_mode
    var aletr_face_type_url = app.globalData.URL + 'AddUserImg/?open_id=' + app.globalData.open_id + '&in_mode=' + in_mode
    if (if_face_image == true){
      // 用户点击保存后，发送请求，修改照片的状态，即用户人脸注册成功
      wx.request({
        url: aletr_face_type_url,
        method: "GET",
        dataType:'json',
        success: (res) => {
          console.log(res)
          if(res.data.code==200){
            console.log('修改当前人脸状态为：',app.globalData.if_img)
            app.globalData.if_img = true
          }
        },
        fail:(res) =>{
          console.log('请求失败')
          console.log(res)
          wx.switchTab({
            url: "../show/show"
          })
        }
      })
      wx.showModal({
        title: '保存成功',
        content: '点击-确定-前往首页',
        success(res) {
         if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
           url: "../show/show"
         })
         } else if (res.cancel) {
          console.log('用户点击取消')
         }
        }
       })
    }else{
      wx.showModal({
        title: '保存失败',
        content: '检测通过后，才可以保存',
        success(res) {
         if (res.confirm) {
          console.log('用户点击确定')
         } else if (res.cancel) {
          console.log('用户点击取消')
         }
        }
       })
    }
   },

  // 判断返回结果
  if_face_resopnse(){
    var that = this;
    if (that.data.face_response['if_img'] == true){  // 获得返回结果
      var face_num = that.data.face_response['face_num']
      var completeness_value = that.data.face_response['completeness_value']
      // var face_image_name = that.data.face_response['face_image_name']
      var face_message = that.data.face_response['message']
      this.setData({
        face_num: face_num,
        face_message: face_message,
        completeness_value: '通过',
    })

    }
    else{ 
      var face_message = that.data.face_response['message']
      this.setData({
        face_num: face_num,
        face_message: face_message,
        completeness_value: '不通过',
    })
    console.log(face_message)
    }
  },

  get_win_width(){
    let that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log('当前屏幕的高为：', res.screenHeight)
        that.setData({
          widheight: res.screenHeight,
        });
      }
    })
  }
})
