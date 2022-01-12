// pages/ar/ar_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    coding:function(){
      wx.showToast({
        title: '代码开发中...',
        icon: 'loading',
        duration: 2000
      })
    },
    linkAr:function(){
      wx.navigateTo({
        url:'../scene/index'
      })
    },
    linkAr2:function(){
      wx.navigateTo({
        url:'../scene2/index'
      })
    },
  }
})
