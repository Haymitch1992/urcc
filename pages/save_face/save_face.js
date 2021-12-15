// pages/save_face/save_face.js
const app = getApp()

Page({
  data: {
    tempImagePath: ''
  },
  onLoad: function (options) {
    wx.showToast({
      title: '正在加载摄像头',
      icon: 'loading',
      duration: 1000
    })
    this.photo_js
    
   },
  takePhoto(){
    // 点击拍照时，获取照片临时路径，并将照片发送到后端进行保存
    wx.showToast({
      title: '正在检测..',
      icon: 'loading',
      duration: 1000
    })
   const ctx = wx.createCameraContext()
   var add_user_img_url = app.globalData.URL + 'AddUserImg/'
   ctx.takePhoto({
     success: (res) => {
      var that = this; 
     if (res.tempImagePath){
         // 将照片发送到后端
         this.setData({
          tempImagePath: res.tempImagePath
        })
         wx.uploadFile({
           url: add_user_img_url,
           filePath: res.tempImagePath,
           name: 'file',
           formData: {
             'open_id': app.globalData.open_id
           },
           header: {
             'content-type': 'multipart/form-data'
           },
           
           success: function(res){
             if (res.statusCode==200){
              wx.redirectTo({
                url: "../photo_ok/photo?photo_path=" + that.data.tempImagePath + '&face_response=' + res.data,
              })
               console.log('请求成功！')
             }else(
              wx.showToast({
                title: '录入失败，请重试！',
                icon: 'success',
                duration: 1000
               }),
               console.log('请求失败'))
           },
           fail: function(res){
              console.log('点击了拍照：', res)
           }
         })  
       }
     }
     })
  },
})