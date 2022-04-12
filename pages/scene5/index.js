const { downloadSceneAsset, clearSceneCache } = requirePlugin("kivicube");

Page({
  data:{
    condition:false,
    showmap:true,
    group:true,
    trainTopNum:900,
    trainTopNum2:0,
    trainTopNum3:144
  },
  goArlist(){
    wx.switchTab({ url: '/pages/ar/ar_list'});
  },
  // 动效 先开始是分开总 然后是合并一块走 
  step1(){
    let num = this.data.trainTopNum
    let timer = setInterval(()=>{
      if(num<=480){
        // 停止定时器
        clearInterval(timer)
        this.setData({
          group:false,
          trainTopNum:900,
        })
        setTimeout(()=>{
          this.step2()
        },2000)
    
      }else{
        num -=5
        this.setData({
          trainTopNum:num,
        })
      }
    },100)
  },

  step2(){
    let num = this.data.trainTopNum2
    let num3 = this.data.trainTopNum3
    let timer2 = setInterval(()=>{
      if(num<=-530){
        // 停止定时器
        clearInterval(timer2)
        setTimeout(()=>{
          this.setData({
            group:true,
            trainTopNum2:0,
            trainTopNum3:144,
          })
          this.step1()
        },2000)
      }else{
        num -=5
        num3 -=3.5
        this.setData({
          trainTopNum2:num,
          trainTopNum3:num3,
        })
      }
    },100)
  },
  changeTab1(){
    this.setData({
      showmap: false
    })
  },
  changeTab2(){
       this.setData({
        showmap: true
    })
  },
  onLoad() {
    this.videoContext = wx.createVideoContext('myVideo')
    downloadSceneAsset("tkCglYV42XFulykDEUaN3EqzvrK1huZx", (progress) => {
      console.log("progress", progress);
     
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
    this.step1()
  },
  tracked(){
    this.setData({
      condition: true
    })
    this.step1()
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