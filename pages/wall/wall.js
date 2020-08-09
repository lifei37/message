// pages/wall/wall.js
import request from '../../utils/request'
import {formatTime} from '../../utils/util'
const app = getApp();
Page({
  
  data: {
    list:[],
  },
  
  onReady: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight,
          userId: app.globalData.userInfo.userId
        })
      }
    })
  },
  onShow: function (){
    this.getEssayInfo()
  },

  getEssayInfo(){
    let optinos = {
      url: "wechat/essay",
      data: "",
      method: 'GET'
    }
      request(optinos).then(res=>{
        this.setData({list: res.data.obj})
      }).catch((err)=>{
        console.log(err)
      })
    },

  submitForm(data){
    let info = {
      user: {"avatarUrl": app.globalData.userInfo.avatarUrl,
             'nickName': app.globalData.userInfo.nickName},
      "replyUserName": '',
      "content": data.detail.value.comment, 
      "createTime": formatTime(new Date()),
      "userId": this.data.userId, 
    }
    this.data.list.push(info)
    this.setData({list: this.data.list})
    let options = {
      url: "wechat/create_essay",
      method: 'POST',
      data: info
    }
    request(options).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(22222)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(11111)
  },

})