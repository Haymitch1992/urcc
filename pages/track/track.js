const app = getApp()  // 引入全局变量 app

Page({
  data: {
    height: 800,
    weinWidth: 0,
    windowH: 0,
    x: 0,
    y: 0,
    map_imgae_url:'',
    track_map_url:'',
    open_id: app.globalData.open_id,
    imgList:[],
    visitor_location_value:'空',
    down_map_png:'',
    down_location_png:''

  },
onLoad: function (options) {
  var that = this;
  that.setData({
    track_map_url:app.globalData.URL + 'img/map/map1.jpg' + '/',
    imgList:[app.globalData.URL + 'img/map/map2.png' + '/']
  });
  that.if_login()
  that.sys()
  },

// onShow: function () {
//   var that = this;
//   that.if_login()
// },


// 获取当前屏幕的高和宽
sys: function () {
    var that = this;
    wx.getSystemInfo({
     success: function (res) {
      that.setData({
        weinWidth: res.windowWidth,
        windowH: res.windowHeight
      })
     },
    })
   },

// 调用canvas，进行绘制渲染
draw_canvas(){
  var that = this;
  var map_img_url = app.globalData.URL + 'img/map/map1.png/'
  var location_img_url = app.globalData.URL + 'img/map/location.png/'
  var location_x_y_list= that.get_visitor_location_x_y()
  var x = location_x_y_list[0]
  var y = location_x_y_list[1]
  const ctx = wx.createCanvasContext('canvas')
  // 判断地图照片，和标记照片是否下载
  // 若无下载，先进行下图片，后渲染
  if (that.data.down_map_png=='' || that.data.down_location_png==''){
    wx.downloadFile({
      url: map_img_url,
      success: (res) => {
        that.setData({
          down_map_png:res.tempFilePath
        })
        ctx.drawImage(res.tempFilePath, 0,50,that.data.weinWidth,that.data.weinWidth)
        wx.downloadFile({
          url: location_img_url,
          success: (res) => {
            that.setData({
              down_location_png:res.tempFilePath
            })
            console.log(res.tempFilePath)
            ctx.closePath()
            ctx.drawImage(res.tempFilePath,x,y,40,40)
            ctx.fill()
            ctx.draw()
          }
      })
      }
    })
  // 渲染用户最新位置
  }else{
    ctx.drawImage(that.data.down_map_png, 0,50,that.data.weinWidth,that.data.weinWidth)
    ctx.closePath()
    ctx.drawImage(that.data.down_location_png,x,y,40,40)
    ctx.fill()
    ctx.draw()
  }
},


// 通过当前位置，计算轨迹图中红点的位置区域，x、y坐标点
get_visitor_location_x_y(){
  let that = this;
  var visitor_location_value = that.data.visitor_location_value
  var weinWidth = that.data.weinWidth
  console.log(visitor_location_value)
  if(visitor_location_value=='前厅'){
    var x = weinWidth / 13
    var y = weinWidth / 1.4

  }if(visitor_location_value=='进站口'){
    var x = weinWidth / 8
    var y = weinWidth / 1.8

  }if(visitor_location_value=='站台'){
    var x = weinWidth / 6
    var y = weinWidth / 2

  }if(visitor_location_value=='车厢'){
    var x = weinWidth / 7
    var y = weinWidth / 2.7

  }if(visitor_location_value=='无人机房'){
    var x = weinWidth / 2
    var y = weinWidth / 3.2

  }if(visitor_location_value=='扩展区域'){
    var x = weinWidth / 1.3
    var y = weinWidth / 3.2

  }if(visitor_location_value=='短线出口'){
    var x = weinWidth / 3.3
    var y = weinWidth / 2

  }if(visitor_location_value=='长线出口'){
    var x = weinWidth / 3.8
    var y = weinWidth / 1.5

  }if(visitor_location_value=='空'){
    var x = weinWidth / 13
    var y = weinWidth / 1.4
  }
  return [x,y]
},


// 用户打开轨迹页面，查看是否登陆，否，返回登录页面
// 用户完成了，登录，判断用户是否完成了注册，否，前往人脸注册页面
if_login(){
  let that = this;
  if(app.globalData.open_id=='' || app.globalData.if_img==false){
    wx.showModal({
      title: '登录提醒',
      content: '查看此页面，请登录并完成人脸信息采集',
      success(res) {
       if (res.confirm) {
        wx.switchTab({
          url:"../my/my"
          })
       } else if (res.cancel) {
        wx.switchTab({
          url:"../my/my"
          })
       }
      }
     })
  }else{
    wx.showToast({
      title: '正在获取位置',
      icon: 'loading',
      duration: 3000
    })
    that.get_user_info()
  }
},

// 点击图片并放大
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


// 获取当前用户实时位置的id
get_user_info(){
  // 获取用户个人记录信息，若无个人记录信息，则展示默认值
  var that = this;
  var user_info_url = app.globalData.URL + 'AddUserInfo/?open_id=' + app.globalData.open_id
  wx.request({
    url: user_info_url,
    method: "GET",
    success: (res) => {
      var visitor_location=  res['data']['userInfo']['visitor_location']  // 获取当前位置id
      var visitor_location_value = that.get_visitor_location_value(visitor_location)  // 获取当前对应位置
      that.setData({
        visitor_location_value: visitor_location_value
      })
      that.draw_canvas()
      that.Countdown()
    },
    fail:(res) =>{
      console.log('请求失败')
    }
  })
},


// 函数挂起3秒 
Countdown() {
  let that = this;
  setTimeout(function () {
    that.get_user_info()
  }, 3000);
},

// 根据位置id，展示用户对应的位置
get_visitor_location_value(visitor_location){
  var visitor_location = visitor_location
  if (visitor_location=='00'){
    var visitor_location_value = '空'
    return visitor_location_value
  }
  if (visitor_location=='01'){
    var visitor_location_value = '前厅'
    return visitor_location_value
  }
  if (visitor_location=='02'){
    var visitor_location_value = '进站口'
    return visitor_location_value
  }
  if (visitor_location=='03'){
    var visitor_location_value = '站台'
    return visitor_location_value
  }
  if (visitor_location=='04'){
    var visitor_location_value = '车厢'
    return visitor_location_value
  }
  if (visitor_location=='05'){
    var visitor_location_value = '无人机房'
    return visitor_location_value
  }
  if (visitor_location=='06'){
    var visitor_location_value = '扩展区域'
    return visitor_location_value
  }
  if (visitor_location=='07'){
    var visitor_location_value = '短线出口'
    return visitor_location_value
  }
  if (visitor_location=='08'){
    var visitor_location_value = '长线出口'
    return visitor_location_value
  }
  else {
    var visitor_location_value = '空'
    return visitor_location_value
  }
}
})
