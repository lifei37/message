//app.js
import request from './utils/request'

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.saveUserInfo(res.userInfo)

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  saveUserInfo: function(data){
    let data_info = {
      url: "wechat/user_info",
      method: 'POST',
      data: data
    }
    request(data_info).then((res)=>{
      data.userId = res.data.obj
      this.globalData.userInfo = data
    }).catch((err)=>{
      console.log(err)
    })
  },
})