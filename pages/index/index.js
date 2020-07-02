//index.js
//获取应用实例


import {
  getMainColor
} from '../../utils/image-main-color.js'
const app = getApp()
var snake = {
  sh: {
    x: 25,
    y: 150
  }
}; //蛇
var direction; // 0上,1下,2左,3右
var dirs = [{
  x: 0,
  y: 0
}, {
  x: 0,
  y: 0
}];

var cvsw = 0;
var cvsh = 0;
var interval; //定时器
Page({
  data: {},
  onLoad: function() {

      // setTimeout(function(){
      //   begin();
      // },1500)
    
    //获取Canvas
    //微信获取元素的对象
  
    var query = wx.createSelectorQuery();
    //拿谁
    query.select('#canvas').boundingClientRect();
    //取数据
    query.exec(function(res) {
      console.info(res); //[{}]
      //获取数组中的第一个数据res[0]
      console.info(res[0].height);
      console.info(res[0].width);
      //记录canvas的宽高
      cvsw = res[0].width;
      cvsh = res[0].height;
    });
    //-------------------------------------------
    //获取网页上的Canvas的平面画板
    //drawSnake();
    interval = setInterval(drawSnake, 100);
    interval = setInterval(begin, 1500);
    console.log("1");


  },
  
  
  touchtop: function(e) {
    console.info("按下屏幕");
    console.info(e.touches[0].x + "---" + e.touches[0].y);
    //记录按下的坐标
    dirs[0].x = e.touches[0].x;
    dirs[0].y = e.touches[0].y;
  },
  movetop: function() {
    console.info("移动手指");
  },
  endtop: function(e) {
    console.info("离开屏幕");
    console.info(e.changedTouches[0].x + "" + e.changedTouches[0].y);
    //记录坐标
    dirs[1].x = e.changedTouches[0].x;
    dirs[1].y = e.changedTouches[0].y;
    console.info(dirs);
    var xm = dirs[1].x - dirs[0].x; //计算x轴的位移
    var ym = dirs[1].y - dirs[0].y; //计算y轴的位移
    if (xm < 0) {
      xm *= -1;
    } //如果位移是负数，乘以-1方便判断
    if (ym < 0) {
      ym *= -1;
    }
    console.info(xm + "----" + ym);
    if (xm > ym) { //x轴移动的多
      //到底是往左还是往右
      //离开位置小于开始位置往左
      if (dirs[1].x < dirs[0].x) {
        direction = 2;
      }
      //离开位置大于开始位置往右					
      if (dirs[1].x > dirs[0].x) {
        direction = 3;
      }
    } else { //y轴移动的多
      //到底是往上还是往下
      //离开位置小于开始位置往上
      if (dirs[1].y < dirs[0].y) {
        direction = 0;
      }
      //离开位置大于开始位置往下
      if (dirs[1].y > dirs[0].y) {
        direction = 1;
      }
    } //
    console.info(direction);
    if (direction == 0) {
      snake.sh.y = snake.sh.y - 100;
      console.info("1----------------------");
      console.info(snake.sh.y);
    }
    if (direction == 1) {
      snake.sh.y = snake.sh.y + 100
      console.info("1----------------------")
      console.info(snake.sh.y)
      
    }
    if (direction == 2) {
      snake.sh.x = snake.sh.x - 100
      console.info("2----------------------");
      console.info(snake.sh.x);
    }
    if (direction == 3) {
      
      snake.sh.x = snake.sh.x + 100
      console.info("3----------------------");
      console.info(snake.sh.x);
    }
    drawSnake();
  },

  goUp: function() {
    console.log('goUp');
    direction = 0;
  },

  goDown: function() {
    console.log('goDown');
    direction = 1;
  },
  goLeft: function() {
    console.log('goLeft');
    direction = 2;
  },
  goRight: function() {
    console.log('goRight');
    direction = 3;
  },
  stop: function() {
    console.log('stop');
    direction = null;
  },
  begin: function(){
    begin();
  }
})

function drawSnake() {
  //判断蛇坐标有没有出去
  //x 0 - cvsw-10
  //y 0 - cvsh-10
  if (
    snake.sh.x < 0 ||
    snake.sh.x > cvsw - 10 ||
    snake.sh.y < 0 ||
    snake.sh.y > cvsh - 10
  ) {
    //关闭定时器
    clearInterval(interval);
  }

  var ctx = wx.createCanvasContext("myCanvas");
  ctx.drawImage("../image/gg.png",snake.sh.x, snake.sh.y, 6, 6);
  ctx.draw();
  //计算下一次出现的位置
  if (direction == 0) {
    snake.sh.y = snake.sh.y - 1;
    console.info("1----------------------");
    console.info(snake.sh.y);
    
  }
  if (direction == 1) {
    snake.sh.y = snake.sh.y + 1;
    console.info("1----------------------")
    console.info(snake.sh.y)
    console.info(snake.sh.x)

  }
  if (direction == 2) {
    snake.sh.x = snake.sh.x - 1;
    console.info("1----------------------")
    console.info(snake.sh.x)
  }
  if (direction == 3) {
    snake.sh.x = snake.sh.x + 1;
    console.info("1----------------------")
    console.info(snake.sh.x)
  }
}

function begin() {
    console.log("2")
    wx.getImageInfo({
      src: '../image/gg.png',
      success(res) {
        const poster = res.path
        console.log(poster)
        console.log(res.width)
        console.log(res.height)
        console.log("333333333")
        wx.canvasGetImageData({
          canvasId: 'myCanvas',
          // x: 23,
          // y: 153,
          x: snake.sh.x,
          y: snake.sh.y,
          width: 10,
          height: 10,
          success(res) {
            console.log(res.data) // true
            console.log(res.data.length) // 100 * 100 * 4
            const imageData = res.data
            let resImageObj = getMainColor(imageData)
            const { defaultRGB } = resImageObj
            const { r, g, b } = defaultRGB
            let resBackground = `rgb(${r}, ${g}, ${b})`
            console.log(resBackground);
            console.log(r);
            console.log(g);
            console.log(b);
            if (r < 14 - 5) {
              console.log("r!=14");
              console.log("over");
              wx.showToast({
                title: '撞到墙啦',
                icon: 'none',
              })
              
              const answerRightAudio = wx.createInnerAudioContext();
              answerRightAudio.autoplay = false;
              answerRightAudio.src = 'https://js.runhua.com.cn/sound/right.wav';
              answerRightAudio.play()
              direction = null;
              
            }
            if (g < 21 - 5 | g >= 22) {
              console.log("g!=21");
              console.log("over");
              wx.showToast({
                title: '快撞墙啦',
                icon: 'none',
              })
              const answerRightAudio = wx.createInnerAudioContext();
              answerRightAudio.autoplay = false;
              answerRightAudio.src = 'https://js.runhua.com.cn/sound/right.wav';
              answerRightAudio.play()
              direction = null;
            }
            if (b < 41 - 5) {
              console.log("b!=41");
              console.log("over")
              wx.showToast({
                title: '慢点走',
                icon: 'none',
              })
              const answerRightAudio = wx.createInnerAudioContext();
              answerRightAudio.autoplay = false;
              answerRightAudio.src = 'https://js.runhua.com.cn/sound/right.wav';
              answerRightAudio.play()
              direction = null;
            }
          }
        })


      }
    }),
      console.log("2")
}
