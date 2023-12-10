const socket = io('http://113.198.233.57:3000/chat');
const $app = document.getElementById('app');
const $userCount = document.createElement('div');
const $today = document.createElement('div');
const $messageInput = document.createElement('input');
$messageInput.id = 'messageInput';
const $sendMessage = document.createElement('button');
$sendMessage.innerText = '전송';
$sendMessage.id = 'sendMessage';
const $messages = document.createElement('div');

$app.appendChild($userCount);
$app.appendChild($today);
$app.appendChild($messageInput);
$app.appendChild($sendMessage);
$app.appendChild($messages);


// 오늘 날짜 표시
const today = new Date();
$today.innerText = `오늘의 날짜: ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

// 유저 수 표시
socket.on('joinUser', (data) => {
  $userCount.innerText = `유저 수: ${data.userCount}`;
});

// const data ={
//  userName : '다영',
//  message : '123',
//  timeStamp : new Date()
// }

const userName = '다영'; // 사용자 이름 설정
// 메시지 수신
socket.on('receiveMessage', (data) => {
  const $message = document.createElement('div');
  $message.innerText = `${data.userName}: ${data.message} (보낸 시간: ${new Date(data.timeStamp).toLocaleTimeString()})`;

  // 사용자가 보낸 메시지인 경우 배경색 변경
  if (data.userName === userName) {
    $message.style.backgroundColor = '#a2d5f2'; // 예시로 파란색 계열 배경 적용
    $message.style.color = 'white'; // 텍스트 색상 변경
    $message.style.padding = '5px'; // 패딩 추가
    $message.style.borderRadius = '5px'; // 경계 둥글게
  }

  $messages.appendChild($message);
});


function fun (){
  const message = $messageInput.value;
// debugger
  const userName = '다영'; // 사용자 이름 설정
  socket.emit('sendMessage', { userName, message });
  $messageInput.value = '';
  

  const $message = document.createElement('div');
  $message.innerText = `${userName} : ${message} 보낸시간 : ${new Date(new Date().getTime()).toLocaleTimeString()}`;
    // 사용자가 보낸 메시지인 경우 배경색 변경
    if (userName ) {
      $message.style.backgroundColor = '#a2d5f2'; // 예시로 파란색 계열 배경 적용
      $message.style.color = 'white'; // 텍스트 색상 변경
      $message.style.padding = '5px'; // 패딩 추가
      $message.style.borderRadius = '5px'; // 경계 둥글게
    }
  $messages.appendChild($message);
}

// 메시지 전송
$sendMessage.addEventListener('click', fun);


// $sendMessage.addEventListener('click', () => {
//   const message = $messageInput.value;
//   socket.emit('sendMessage', { userName: '다영', message });
//   $messageInput.value = '';
// });
