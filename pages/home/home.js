const app = getApp()

Page({
  data: {
    top:65,
    home_back_url:'',
    meeting_info: [],
    meeting_id_list: [],
    image_1: '',
    image_2: '',
    current: 0,  //当前所在页面的 index
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用衔接滑动
    imgUrls: [],
    title_list:[],
    content_image_list:[],
    title:'',
    swiper_id:0
  },
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1500
    })
    that.setData({
      home_back_url: app.globalData.URL + 'img/wx_image/home_back.png/',
      image_2: app.globalData.URL + 'img/no.7.jpg/',
    })
    that.get_metting_info()
    that.get_trade_news()
   },

  // 轮播图的切换事件
   swiperChange: function(e) {
    var that = this;
    var title = that.data.title_list[e.detail.current]
    this.setData({
      title: title,
      swiper_id: e.detail.current
    })
  },

  // 用户点击了轮播图，进行页面的跳转
  swipclick_1: function() {
    var that = this;
    var swiper_id = that.data.swiper_id
    var trade_news_content_image_url = that.data.content_image_list[swiper_id]
    wx.navigateTo({
      url:'../trade_news_content/trade_news_icontent?trade_news_content_image_url=' + trade_news_content_image_url
    })
    // wx.switchTab({
    //   url: this.data.links[this.data.swiperCurrent]
    // })
  },

  //用户点击白色视图，修改该视图的高
  alter_top_value: function(){
    var that = this;
    that.setData({
      top:35
    })
  },
  alter_top_value_two: function(){
    var that = this;
    that.setData({
      top:65
    })
  },

  metting_info: function(event){
    // 点击会议跳转到会议详情页面
    var that = this;
    var meeting = event.currentTarget.dataset.meeting
    wx.navigateTo({
      url:'../metting_info/metting_info?meeting=' + JSON.stringify(meeting)
    })
  },

  get_metting_info:function(){
    // 用户打开首页，获取会议内容列表，并展示
    var that = this;
    var get_metting_info_url = app.globalData.URL + 'GetMeetingInfo/?open_id=' + app.globalData.open_id
    wx.request({
      url: get_metting_info_url,
      method: "GET",
      dataType: 'json',

      success: (res) =>{
        that.setData({
          meeting_info:res.data.meeting_data,
          meeting_id_list:res.data.meeting_id_list
        })
        console.log('用户会议预约返回列表：', res.data.meetign_id_list)
      }
    })
  },

  get_trade_news:function(){
    // 用户打开首页，获取行业资讯模块内容
    var that = this;
    var get_trade_news_url = app.globalData.URL + 'AllTradeNews/'
    wx.request({
      url: get_trade_news_url,
      method: "GET",
      dataType: 'json',
      success: (res) =>{
        that.setData({
          title_list:res.data.title_list,
          content_image_list:res.data.content_image_list,
          imgUrls:res.data.image_list,
          title:res.data.title_list[0]
        })
      }
    })
  },

  subscribe_meeting:function(event){
    // 用户点击立即预约会议
    var meeting_id = event.currentTarget.dataset.meetingid
    var open_id = app.globalData.open_id
    if(app.globalData.open_id==''){
      console.log('当前用户未登录')
      wx.showToast({
        title: '请先登录',
        icon: 'loading',
        duration: 1000
      })
    }else{
        // 将订阅结果进行，返回，并刷新当前页面
      var subscribe_meeting_url = app.globalData.URL + 'SubscribeMeeting/?open_id=' + open_id + '&meeting_id=' +  meeting_id
      this.request_wx_subscribe_API(subscribe_meeting_url)
    }
  },

  request_wx_subscribe_API:function(subscribe_meeting_url){
    // 用户登录后，点击订阅，
    let that=this;
    wx.requestSubscribeMessage({
      tmplIds: ['R4zfrBJb541OmuaNtP_3NR8ial1UQXyj1WiLueuJ4nk'],
      success (res) {
        console.log('订阅信息：', res)
        if (res.R4zfrBJb541OmuaNtP_3NR8ial1UQXyj1WiLueuJ4nk == 'accept'){
          wx.request({
            url: subscribe_meeting_url,
            method: "GET",
            dataType: 'json',
            success: (res) =>{
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 1000
              })
              that.onLoad()
            }
          })
        }else{
          console.log('用户点击了取消')
        }
       },
       fail(res){
        console.log('订阅信息错错误信息是：', res)
       }
    })
  }
})

