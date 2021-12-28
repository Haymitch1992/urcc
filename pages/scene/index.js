const { downloadSceneAsset, clearSceneCache } = requirePlugin("kivicube");

Page({
  data:{
    condition:false,
    speed:18,
  },
  goArlist(){
    wx.switchTab({ url: '/pages/ar/ar_list'});
  
  },
  changeSpeed(){
    // 模拟网络速度
    let speedList= [20,24,22,44,28,34,32,25,22,18]
    let num = Math.floor((Math.random() * 10) );
    Math.random()
    this.setData({
      speed: speedList[num]
    })
  },
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  onLoad() {
    this.videoContext = wx.createVideoContext('myVideo')
    downloadSceneAsset("wgj3kHwFMhbOFT9rTA3mNSNYqOgXYTs0", (progress) => {
      console.log("progress", progress);
     setInterval(()=>{
       this.changeSpeed()
     },2000)
    }).then(() => {
      // 使kivicube-scene组件attached进入页面节点树。比如wx:if为真
    });
  },
  ready({ detail: { sceneInfo } }) {
    console.log("当前场景基础信息", sceneInfo);
    wx.showToast({ title: "场景加载中...", icon: "none" });
  },
  downloadStart() {},
  downloadProgress() {},
  downloadEnd() {},
  loadStart() {},
  loadEnd() {},
  sceneStart() {
     this.setData({
      condition: true
    })
  },
  tracked(){
    console.log('识别')
  },
  openUrl({ detail: url }) {
    wx.navigateTo({ url: `path/to/webview?url=${encodeURIComponent(url)}` });
  },
  photo({ detail: photoPath }) {
    wx.saveImageToPhotosAlbum({
      filePath: photoPath,
      success() {
        console.log("保存照片成功");
      },
      fail(e) {
        console.error("保存照片失败", e);
      }
    });
  },
  error(e) {
    const { detail } = e;
    if (detail && detail.isCameraAuthDenied) {
      // 如果是权限问题，则向用户申请权限。
      const page = this;
      wx.showModal({
        title: "提示",
        content: "请给予“摄像头”权限",
        success() {
          wx.openSetting({
            success({ authSetting: { "scope.camera": isGrantedCamera } }) {
              if (isGrantedCamera) {
                clearSceneCache();
                wx.redirectTo({ url: '/' + page.__route__ });
              } else {
                wx.showToast({ title: "获取“摄像头”权限失败！", icon: "none" });
              }
            }
          });
        }
      });
    }
    console.error(e);
  }
});