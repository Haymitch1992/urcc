const { downloadSceneAsset, clearSceneCache } = requirePlugin("kivicube");

Page({
  data:{
    condition:false,// 是否显示线路图
    lineData:[
      {label:'石厂',stationId:1,x:5,y:230,arcx:5,arcy:240,accessibility:false,currentStation:false},
      {label:'小园',stationId:2,x:50,y:260,arcx:60,arcy:240,accessibility:false,currentStation:false},
      {label:'栗园庄',stationId:3,x:110,y:205,arcx:100,arcy:200,accessibility:false,currentStation:false},
      {label:'上岸',stationId:4,x:70,y:163,arcx:100,arcy:160,accessibility:false,currentStation:false},
      {label:'桥户营',stationId:5,x:105,y:130,arcx:120,arcy:140,accessibility:false,currentStation:false},
      {label:'四道桥',stationId:6,x:135,y:163,arcx:150,arcy:140,accessibility:false,currentStation:false},
      {label:'模式口',stationId:7,x:190,y:20,arcx:180,arcy:15,accessibility:true,currentStation:false},
      {label:'金安桥',stationId:8,x:190,y:160,arcx:180,arcy:140,accessibility:true,currentStation:true},
      {label:'北辛安',stationId:9,x:190,y:225,arcx:180,arcy:220,accessibility:true,currentStation:false},
      {label:'新首钢',stationId:10,x:190,y:285,arcx:180,arcy:280,accessibility:true,currentStation:false},
      {label:'杨庄',stationId:11,x:230,y:113,arcx:250,arcy:120,accessibility:true,currentStation:false},
      {label:'西黄村',stationId:12,x:260,y:90,arcx:280,arcy:100,accessibility:true,currentStation:false},
      {label:'郭公庄',stationId:13,x:305,y:90,arcx:320,arcy:100,accessibility:true,currentStation:false},
      {label:'苹果园',stationId:14,x:200,y:123,arcx:220,arcy:140,accessibility:true,currentStation:false},
      {label:'古城',stationId:15,x:260,y:158,arcx:250,arcy:160,accessibility:true,currentStation:false},
      {label:'八角游乐园',stationId:16,x:250,y:200,arcx:280,arcy:180,accessibility:true,currentStation:false},
      {label:'八宝山',stationId:17,x:305,y:200,arcx:320,arcy:180,accessibility:true,currentStation:false},
    ],
    // 仿真数据 
    simulationData:[
      // 当前站 北辛安  可达站 金安桥 八角 八宝山 
      {
        currentStation:9,
        accessibilityList:[7,8,9,10,14,15,16,17]
      },
      {
        currentStation:10,
        accessibilityList:[7,8,9,10,11,12,13,14,15,16,17]
      },
      {
        currentStation:8,
        accessibilityList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
      },
      {
        currentStation:4,
        accessibilityList:[1,2,3,4,5,6,8,11,12,13,14,15,16,17]
      },
    ],
    lineLabel:[
      {label:'11号线',x:190,y:240,backgroundColor:'#ee9166'},
      {label:'S1号线',x:40,y:180,backgroundColor:'#a34416'},
      {label:'1号线',x:300,y:210,backgroundColor:'#c03b35'},
      {label:'6号线',x:300,y:115,backgroundColor:'#cc8300'},
    ],
    tab:1 // 拥挤度查询  2 线网可达性
  },
  goArlist(){
    wx.switchTab({ url: '/pages/ar/ar_list'});
  },

  changeTab1(){
    this.setData({
      tab: 1
    })
  },
   changeTab2(){
    this.setData({
      tab: 2
    })
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
          ctx.strokeStyle = this.data.tab===1?'#a34416':'#666';
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
          ctx.strokeStyle = this.data.tab===1?'#cc8300':'#666';
          ctx.moveTo(220,140);  
          ctx.lineTo(280,100); 
          ctx.lineTo(380,100); 
          ctx.stroke();  
          ctx.beginPath(); 
          ctx.strokeStyle =  this.data.tab===1?'#c03b35':'#666';
          ctx.moveTo(220,140);  
          ctx.lineTo(280,180); 
          ctx.lineTo(380,180); 
          ctx.stroke();  
        // S1线
       
        //  北京地铁11号线
        ctx.beginPath(); 
        ctx.strokeStyle = this.data.tab===1?'#ee9166':'#666';
        ctx.moveTo(180,15);  
        ctx.lineTo(180,280);
        ctx.stroke();  
          // 绘制站名
          let arr = this.data.lineData
        arr.forEach(item=>{
            // 绘制点
            ctx.beginPath();
            if(this.data.tab === 1){
              ctx.fillStyle = '#ddd';
            }else{
              ctx.fillStyle = item.accessibility?'#01cc38':'#ddd';
              if(item.currentStation){
                ctx.fillStyle = '#ffed19'
              }
            }
            // 可达性 不可达是灰色 可达是绿色
            ctx.arc(item.arcx, item.arcy, 5, 0, Math.PI * 2, false);
            ctx.fill();
            // 绘制站名
            ctx.beginPath();
            ctx.fillStyle = '#333'
            ctx.fillText(item.label,item.x,item.y);
            ctx.fill();
          })
          let lineLabel =  this.data.lineLabel
          lineLabel.forEach(item=>{
            ctx.beginPath();
            ctx.fillStyle =  this.data.tab===1?item.backgroundColor:'#ddd'
            ctx.fillRect(item.x,item.y,40,20)
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = '#fff'
            ctx.fillText(item.label,item.x+5,item.y+14);
            ctx.fill();
          })
        }
        // 绘制线路名称
        let cx  = 169 // 起始坐标
        let cy = 10 // 起始坐标
        let num =4 // 运动速度
        let counter = 0
        let stepNum = 1 // 运动轨迹状态 1 下行 2 上行
        const clearCanvas= ()=>{
          ctx.clearRect(0,0,canvas.width,canvas.height)
          drawMap()
        }
        const changeData = ()=>{
          // 获得一个 0 
          let maxNum = this.data.simulationData.length 
          let num = Math.floor(Math.random()*maxNum)
          console.log('当前随机数是',num)
          let target = this.data.simulationData[num]
          let arr = []
          this.data.lineData.forEach(item=>{
            // 
            let obj = item 
            obj.currentStation = false
            obj.accessibility = false
            if(item.stationId===target.currentStation){
              obj.currentStation = true
            }
           if(target.accessibilityList.indexOf(item.stationId)!==-1){
              item.accessibility = true
           }
            arr.push(obj)
          })
          console.log('查看产出',arr)
          this.setData({
            lineData: arr
          })
        }
        let timer = setInterval(()=>{
          // 每隔十秒切换
          counter++
          console.log(counter)
          if(counter>100){
            changeData()
            counter = 0
          }
          clearCanvas()
          // 切换仿真数据
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
        },200)
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