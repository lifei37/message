
const baseUrl = 'http://127.0.0.1:8000/'
export default function request(options){
  return new Promise(function(resolve, rejects){
    wx.request({
      url: baseUrl + options.url,
      data: options.data,
      fail: (res) => {
        rejects(res)
      },
      method: options.method,
      success: (result) => {
        resolve(result)
      },
    })
  })
}