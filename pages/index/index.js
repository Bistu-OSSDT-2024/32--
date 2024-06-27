Page({
  data: {
    inputMessage: '',
    chatHistory: [],
  },
// 处理用户输入变化
inputChange: function(e) {
  this.setData({
    inputMessage: e.detail.value
  });
},

// 发送消息
sendMessage: function() {
  const self = this;

  // 非空检查
  if (!self.data.inputMessage.trim()) {
    return;
  }
  const requestStartTime = new Date().getTime();
  wx.request({
    url: 'https://api.coze.cn/open_api/v2/chat',
    method: 'POST',
    header: {
      'Authorization': 'Bearer pat_q1dyqu6Bf0XZgXOrFHqsSHXfrHwh4KOrjhguwbdNuNsByCFPSa07kd34AJjBXVQR',
      'Content-Type': 'application/json'
    },
    data: {
      bot_id: '7384329348398546981',
      user: '7384324017332961292',
      query: self.data.inputMessage,
      stream: true,
    },
    success: function(res) {
      const requestEndTime = new Date().getTime();
      if (requestEndTime - requestStartTime <= 10000) {
        if (res.data) {  // 直接判断是否有数据
          self.addToChatHistory(res.data); // 直接添加返回的数据
          self.setData({  // 在这里添加刷新界面的代码
            chatHistory: self.data.chatHistory  // 重新设置 chatHistory 以触发界面更新
          });
        }
      }
    },
    fail: function(err) {
      console.error('发送消息失败：', err);
    }
  });
},
  
  // 添加到聊天历史
  addToChatHistory: function(message) {
    const updatedChatHistory = this.data.chatHistory.concat({content: message});
    this.setData({
      chatHistory: updatedChatHistory,
      inputMessage: ''
    });
  },

});
