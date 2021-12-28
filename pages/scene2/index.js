const { downloadSceneAsset, clearSceneCache } = requirePlugin("kivicube");

Page({
  data:{
    condition:false,// 是否显示线路图
  },
  onLoad() {
    downloadSceneAsset("wFELEGELEDnR5miP9xDzfOta94OBPcf5", (progress) => {
      console.log("progress", progress);
     
    }).then(() => {
      // 使kivicube-scene组件attached进入页面节点树。比如wx:if为真
    });
  },
  ready({ detail: { sceneInfo } }) {
    console.log("当前场景基础信息", sceneInfo);
    wx.showToast({ title: "场景加载中...", icon: "none" });
  },

  downloadStart() {
    console.log('downloadStart')
  },
  downloadProgress() {
    console.log('downloadProgress')
  },
  downloadEnd() {
    console.log('downloadEnd')
  },
  loadStart() {
    console.log('loadStart')
  },
  loadEnd() {
    console.log('loadEnd')
  },
  tracked(){
    console.log('识别')
  },

  drawLine(){
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        const drawMap=()=>{
         // 矩形中心点
          ctx.beginPath(); 
          ctx.strokeStyle = '#333';
          ctx.lineWidth=10; 
          ctx.moveTo(5,240);           // 创建起始点
          ctx.lineTo(80,240);          // 创建水平线 
          ctx.arcTo(100,240,100,220,20); // 创建弧
          ctx.lineTo(100,160);  
        //  ctx.lineTo(100,40);
          ctx.arcTo(100,140,120,140,20);
          ctx.lineTo(220,140);  
              // 创建垂直线
          ctx.stroke();  
          ctx.beginPath(); 
          ctx.moveTo(220,140);  
          ctx.lineTo(280,100); 
          ctx.lineTo(380,100); 
          ctx.stroke();  
          ctx.beginPath(); 
          ctx.moveTo(220,140);  
          ctx.lineTo(280,180); 
          ctx.lineTo(380,180); 
          ctx.stroke();  
        // S1线
       
        //  北京地铁11号线
        ctx.beginPath(); 
        ctx.moveTo(180,15);  
        ctx.lineTo(180,280);
        ctx.stroke();  4
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(180, 15, 5, 0, Math.PI * 2, false);
        ctx.closePath();
         ctx.fillStyle = '#666';
        ctx.fill();
         // 绘制stationpoint
          ctx.beginPath();
          ctx.arc(180, 140, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(180, 220, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(180, 280, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(5, 240, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(60, 240, 5, 0, Math.PI * 2, false);
        ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(100, 200, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(100, 160, 5, 0, Math.PI * 2, false);
        ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(120, 140, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(150, 140, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(220, 140, 5, 0, Math.PI * 2, false);
        ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(250, 120, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(280, 100, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(320, 100, 5, 0, Math.PI * 2, false);
        ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(350, 100, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          
          ctx.beginPath();
          ctx.arc(250, 160, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(280, 180, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(320, 180, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(350, 180, 5, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = '#666';
          ctx.fill();

          // 绘制站名
          ctx.beginPath();
          ctx.fillStyle = '#fff'

          ctx.fillText("石厂",5,230);
          ctx.fillText("小园",50,260);
          ctx.fillText("栗园庄",110,205);
          ctx.fillText("上岸",70,163);
          ctx.fillText("桥户营",105,130);
          ctx.fillText("四道桥",135,163);

          ctx.fillText("模式口",190,20);
          ctx.fillText("金安桥",190,160);
          ctx.fillText("北辛安",190,225);
          ctx.fillText("新首钢",190,285);

          ctx.fillText("杨庄",230,113);
          ctx.fillText("西黄村",260,90);
          ctx.fillText("郭公庄",305,90);
          ctx.fillText("田村",340,120);

          ctx.fillText("苹果园",200,123);
          ctx.fillText("古城",255,158);
          ctx.fillText("八角游乐园",250,200);
          ctx.fillText("八宝山",305,200);
          ctx.fillText("玉泉路",335,170);

          ctx.stroke();
        }
        let cx  = 169 // 起始坐标
        let cy = 10 // 起始坐标
        let num =2 // 运动速度
        let stepNum = 1 // 运动轨迹状态 1 下行 2 上行
        
        const clearCanvas= ()=>{
          ctx.clearRect(0,0,canvas.width,canvas.height)
          drawMap()
        }
        clearInterval(timer)
        let timer = setInterval(()=>{
          clearCanvas()
          ctx.fillStyle = '#01cc38';
          switch(stepNum){
            case 1:// 下行
              cy = cy + 0.1 * num;
              ctx.fillRect(cx, cy, 6, 20)
              if (stepNum == 1 && cy > 270) {
                stepNum = 2;
                cx=185
              }
            break;
            case 2:// 上行
              cy -= 0.1 * num;
              ctx.fillRect(cx, cy, 6, 20)
              if (stepNum == 2 && cy < 10 ) {
                stepNum = 1;
                cx=169
              }
            break;
          }
        },100)
      })
  },
  sceneStart() {
    // 加载场景图 
    this.setData({
      condition: true
    })
    wx.showToast({ title: "扫描到了场景", icon: "none" });
    this.drawLine()
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