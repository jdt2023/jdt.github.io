const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('新客户端连接');

    ws.on('message', message => {
        console.log(`收到消息: ${message}`);

        // 广播消息给所有客户端
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.send('欢迎加入聊天！');
});

console.log('WebSocket 服务器正在运行在 ws://localhost:8080');function deleteMessages() {
    localStorage.removeItem('chatMessages');
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
}function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
        const userInput = document.getElementById('user-input');
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };

    recognition.onspeechend = function () {
        recognition.stop();
    };

    recognition.onerror = function (event) {
        console.error('语音识别错误:', event.error);
    };
}function uploadImage() {
    // 触发图片文件选择
    document.getElementById("imageInput").click();
  
    // 监听文件选择事件
    document.getElementById("imageInput").addEventListener("change", function() {
      // 获取选择的图片文件
      var file = this.files[0];
  
      // 创建FormData对象并添加文件
      var formData = new FormData();
      formData.append("image", file);
  
      // 发送AJAX请求上传图片
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/upload/image", true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          // 上传成功后的处理逻辑
          console.log("Image uploaded successfully!");
        } else {
          // 上传失败后的处理逻辑
          console.error("Error uploading image:", xhr.status);
        }
      };
      xhr.send(formData);
    });
  }
  
  function uploadVideo() {
    // 触发视频文件选择
    document.getElementById("videoInput").click();
  
    // 监听文件选择事件
    document.getElementById("videoInput").addEventListener("change", function() {
      // 获取选择的视频文件
      var file = this.files[0];
  
      // 创建FormData对象并添加文件
      var formData = new FormData();
      formData.append("video", file);
  
      // 发送AJAX请求上传视频
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/upload/video", true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          // 上传成功后的处理逻辑
          console.log("Video uploaded successfully!");
        } else {
          // 上传失败后的处理逻辑
          console.error("Error uploading video:", xhr.status);
        }
      };
      xhr.send(formData);
    });
  }
  