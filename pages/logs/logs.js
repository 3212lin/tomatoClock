//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    activeIndex: 0,
    sum: [
      {
        text: '今日番茄次数',
        num: 0
      },
      {
        text: '累计番茄次数',
        num: 0
      },
      {
        text: '今日专注时长',
        num: '0分钟'
      },
      {
        text: '累计专注时长',
        num: '0分钟'
      }
    ],
    cate: [
      {
        icon: 'work',
        text: '工作'
      },
      {
        icon: 'study',
        text: '学习'
      },
      {
        icon: 'think',
        text: '思考'
      },
      {
        icon: 'write',
        text: '写作'
      },
      {
        icon: 'sport',
        text: '运动'
      },
      {
        icon: 'read',
        text: '阅读'
      },
    ]
  },
  onLoad: function () {

  },
  onShow: function () {
    var logs = wx.getStorageSync('logs') || [];
    if(logs) {
      var total = logs.length;
      var totalTime = 0;
      var day = 0;
      var dayTime = 0;
      var list = [];
      for(var i=0;i<logs.length;i++) {
        if (util.formatTime(new Date()).substr(0, 10) == logs[i].date.substr(0,10)) {
          day = day + 1;
          dayTime = dayTime + parseInt(logs[i].time); 
          list.push(logs[i]); // 默认是显示今日列表
        }
        totalTime = totalTime + parseInt(logs[i].time);
      }
      this.setData({
        logs: list,
        'sum[0].num': day,
        'sum[1].num': total,
        'sum[2].num': dayTime+'分钟',
        'sum[3].num': totalTime+'分钟' 
      });
    }
  },
  changeType: function (e) {
    var activeIndex = e.currentTarget.dataset.index;
    var logs = wx.getStorageSync('logs') || [];
    if (logs) {
      var list = [];
      if (activeIndex == 0) {
        for (var i = 0; i < logs.length; i++) {
          if (util.formatTime(new Date()).substr(0, 10) == logs[i].date.substr(0, 10)) {
            list.push(logs[i]);
          }
        }
      } else {
        list = logs;
      }
    }
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      logs: list
    })
  }
})
