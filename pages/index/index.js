//index.js
const util = require("../../utils/util.js");
//获取应用实例
const app = getApp()

Page({
  data: {
    cate:[
      {
        icon:'work',
        text:'工作'
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
    ],
    cateActive:0,
    time: '5',
    timer:null,
    wrapShow: true,
    clockHeight:0,
    rate: 0.5,
    progressWidth: 400,
    progressHeight: 400,
    showTime: '300000', // 毫秒数
    showTimeStr: '05:00',
    okShow: false,
    pauseShow: true,
    continueCancleShow: false,
    i:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var logs = wx.getStorageSync('logs') || [];
    var res = wx.getSystemInfoSync();
    this.setData({
      rate: res.windowWidth / 750,
      clockHeight: 750 / res.windowWidth * res.windowHeight
    })
  },
  slideChange:function (e) {
    this.setData({
      time: e.detail.value,
      showTime: e.detail.value*60*1000,
      showTimeStr: e.detail.value > 10 ? e.detail.value+':00' : '0' + e.detail.value+":00" 
    })    
  },
  selectCate: function (e) {
    this.setData({
      cateActive: e.currentTarget.dataset.index
    })
  },
  start: function () {
    this.setData({
      wrapShow: false,
      showTimeStr: this.data.time > 10 ? this.data.time + ':00' : '0' + this.data.time + ":00" 
    })
    this.drawBg();
    this.drawCircle();

  },

  drawBg: function () {
    var lineWidth = 6 * this.data.rate;
    var ctx = wx.createCanvasContext('canvas_bg');
    // 设置圆环的宽度
    ctx.setLineWidth(lineWidth);
    // 设置圆环的颜色
    ctx.setStrokeStyle('#000000');
    // 设置圆环端点的形状
    ctx.setLineCap('round');
    //开始一个新的路径
    ctx.beginPath();
    //设置一个原点(110,110)，半径为100的圆的路径到当前路径
    ctx.arc(this.data.progressWidth * this.data.rate / 2, this.data.progressHeight * this.data.rate / 2, this.data.progressWidth * this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false);
    //对当前路径进行描边
    ctx.stroke();
    //开始绘制
    ctx.draw();
  },
  drawCircle:function (type = 1) {    
    // if(type == 1) {
    //   var showTimeStr = parseInt(parseInt(this.data.showTime) / 1000); // 得到秒数
    //   var showTimeStr1 = parseInt(showTimeStr / 60); // 得到分钟数
    //   var showTimeStr2 = showTimeStr - showTimeStr1 * 60; // 取完分钟后剩余的秒数
    //   var showTimeStr = (showTimeStr1 < 10 ? '0' + showTimeStr1 : showTimeStr1) + ":" + (showTimeStr2 < 10 ? '0' + showTimeStr2 : showTimeStr2);
    //   this.setData({
    //     showTimeStr: showTimeStr
    //   })
    // }

    var _this = this;
    var i = this.data.i;
    var msecond = 0;
    var timer = setInterval(function (){
      i++; 
      _this.setData({
        i: i
      })   


      // 100ms 5*60*1000ms
      // 1.5  3.5
      // 2
      // 5*60*1000ms/100ms = 300000/100 = 3000
      2 / 3000

      // 300000/100 = 3000   
      var angle = 1.5 + (i * 2)/(parseInt(_this.data.time)*600); 
      // console.log(angle);
      if(angle < 3.5) {
        var msecond = i * 100;
        if (msecond % 1000 == 0) {
          // console.log(_this.data.showTime);
          var showTimeStr = parseInt((parseInt(_this.data.showTime)-msecond) / 1000); // 得到秒数
          var showTimeStr1 = parseInt(showTimeStr / 60); // 得到分钟数
          var showTimeStr2 = showTimeStr - showTimeStr1 * 60;
          var showTimeStr = (showTimeStr1 < 10 ? '0' + showTimeStr1 : showTimeStr1) + ":" + (showTimeStr2 < 10 ? '0' + showTimeStr2 : showTimeStr2);
          // console.log(_this.data.showTime);
          _this.setData({
            showTimeStr: showTimeStr
          })
        }  
        var lineWidth = 6 * _this.data.rate;
        var ctx = wx.createCanvasContext('canvas_circle');
        // 设置圆环的宽度
        ctx.setLineWidth(lineWidth);
        // 设置圆环的颜色
        ctx.setStrokeStyle('#ffffff');
        // 设置圆环端点的形状
        ctx.setLineCap('round');
        //开始一个新的路径
        ctx.beginPath();
        //设置一个原点(110,110)，半径为100的圆的路径到当前路径
        ctx.arc(_this.data.progressWidth * _this.data.rate / 2, _this.data.progressHeight * _this.data.rate / 2, _this.data.progressWidth * _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
        //对当前路径进行描边
        ctx.stroke();
        //开始绘制
        ctx.draw(); 
      } else {
        clearInterval(_this.data.timer);
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift({
          date: util.formatTime(new Date()),
          cate: _this.data.cateActive,
          time: _this.data.time
        });
        wx.setStorageSync('logs', logs);
        _this.setData({
          showTimeStr: '00:00',
          showTime:0,
          okShow: true,
          pauseShow: false,
          continueCancleShow: false
        })        
      }
    },100);

    this.setData({
      timer: timer
    })


  },
  pause: function () {
    clearInterval(this.data.timer);
    this.setData({
      continueCancleShow: true,
      pauseShow: false,
      okShow: false
    })
  },
  continue: function () {
    this.drawCircle(2);
    this.setData({
      continueCancleShow: false,
      pauseShow: true,
      okShow: false,
    })  

  },
  cancle: function () {
    clearInterval(this.data.timer);
    this.setData({
      continueCancleShow: false,
      pauseShow: true,
      okShow: false,
      timer: null,
      wrapShow: true,
      i:0
    })    
  },
  ok: function () {
    clearInterval(this.data.timer);
    this.setData({
      continueCancleShow: false,
      pauseShow: true,
      okShow: false,
      timer: null,
      wrapShow: true,
      i: 0
    })    
  }
})
