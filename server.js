// Express, Websocket 모듈 가져오기
const express = require('express');
const WebSocket = require('ws');

// Express server set
// Express 애플리케이션 초기화
const app = express();
//3000포트 사용하도록 설정
const port = 3000;
// public폴더 내의 파일을 정적 파일로 제공하도록 설
app.use(express.static('public'));

// WebSocket 서버설정
//
const server = app.listen(port, () => {
	console.log('Listening on http://localhost:${port}');
});
// WebSocket 서버가 이미 실행중인 Express 서버를 공유하도록 설정한다

const wss = new WebSocket.Server({server});

wss.on('connection', ws => {
	console.log('A new client connected!');

	ws.on('message', message => {
		console.log('Received: ${message}');

		const messageString = message.toString();
		//모든 클라이언트에게 메시지 브로드캐스트
		wss.clients.forEach(client => {
			if(client.readyState === WebSocket.OPEN) {
				client.send(messageString);
			}
		});
	});
	
	ws.on('close', () => {
		console.log('Client hs disconnected');
	});


});

