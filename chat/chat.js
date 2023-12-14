// 소켓 통신을 위한 변수 선언
let socket;

// HTML 문서 내에 특정 ID를 가진 요소를 찾아 변수에 할당
const $app = document.getElementById('app');

// 채팅 앱에 필요한 HTML 요소들을 생성
const $userCount = document.createElement('div');  // 유저 수를 표시할 div 요소
const $today = document.createElement('div');      // 오늘 날짜를 표시할 div 요소
const $messageInput = document.createElement('input');  // 메시지 입력을 위한 input 요소
$messageInput.id = 'messageInput';  // 메시지 입력란에 ID 부여
const $sendMessage = document.createElement('button');   // 메시지 전송 버튼
$sendMessage.innerText = '전송';  // 버튼에 표시될 텍스트 설정
$sendMessage.id = 'sendMessage';  // 버튼에 ID 부여
const $messages = document.createElement('div');  // 메시지를 표시할 div 요소

// 생성한 요소들을 페이지에 추가
$app.appendChild($userCount);
$app.appendChild($today);
$app.appendChild($messageInput);
$app.appendChild($sendMessage);
$app.appendChild($messages);

// 오늘 날짜를 계산하여 표시
const today = new Date();
$today.innerText = `오늘의 날짜: ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

// 연결 버튼 생성 및 페이지에 추가
const $conButton = document.createElement('button');
$conButton.innerText = '연결';
$app.appendChild($conButton);

// 로컬 저장소에 메시지를 저장하는 함수
function saveMessagesToLocalStorage(messages) {
    // 로컬 저장소에 'chatMessages'라는 키로 메시지 배열을 JSON 문자열로 변환하여 저장
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// 로컬 저장소에서 메시지를 불러오는 함수
function loadMessagesFromLocalStorage() {
    // 'chatMessages'라는 키로 저장된 데이터를 가져와 JSON 객체로 변환
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    return savedMessages || [];  // 저장된 메시지가 없으면 빈 배열 반환
}


// 메시지를 화면에 표시하는 함수
function displayMessage(data) {
  const $message = document.createElement('div');  // 새 div 요소 생성
  // 메시지 내용을 div에 설정 (사용자 이름, 메시지, 시간)
  $message.innerText = `${data.userName}: ${data.message} (보낸 시간: ${new Date(data.timeStamp).toLocaleTimeString()})`;

  // 사용자 본인이 보낸 메시지의 경우 배경색과 스타일 변경
  if (data.userName === '다영') {
      $message.style.backgroundColor = '#ffc0cb';  // 배경색 설정
      $message.style.color = 'white';              // 글자색 설정
      $message.style.padding = '5px';              // 패딩 설정
      $message.style.borderRadius = '5px';         // 테두리 둥글게 설정
  }
  $messages.appendChild($message);  // 메시지를 페이지에 추가
}

// 페이지 로드 시 저장된 메시지를 불러와 화면에 표시
document.addEventListener('DOMContentLoaded', () => {
    const savedMessages = loadMessagesFromLocalStorage();
    savedMessages.forEach(displayMessage);
});

// 소켓 서버에 연결하는 함수
function con() {
   
    // 지정된 주소의 소켓 서버에 연결
    socket = io('http://113.198.233.57:3000/chat');
    
    // 유저 수가 변경될 때마다 화면에 표시
    socket.on('joinUser', (data) => {
        $userCount.innerText = `유저 수: ${data.userCount}`;
    });

    // 다른 유저로부터 메시지를 받으면 화면에 표시하고 로컬 저장소에 저장
    socket.on('receiveMessage', (data) => {
      // 본인이 보낸 메시지는 무시 (화면에 중복으로 표시되지 않도록)
      
        displayMessage(data);
        const savedMessages = loadMessagesFromLocalStorage();
        savedMessages.push(data);
        saveMessagesToLocalStorage(savedMessages);
      
    });
}

// 연결 버튼에 클릭 이벤트 리스너 추가
$conButton.addEventListener('click', con);


// 메시지를 전송하는 함수
function fun() {
  const message = $messageInput.value;  // 입력란에서 메시지 내용 가져오기
  const userName = '다영';              // 사용자 이름 설정
  const timeStamp = new Date();         // 현재 시각
  const messageData = { userName, message, timeStamp };

  // 소켓을 통해 메시지 전송
  socket.emit('sendMessage', messageData);
  $messageInput.value = '';  // 입력란 비우기

  // 메시지를 화면에 표시하고 로컬 저장소에 저장
  
  const savedMessages = loadMessagesFromLocalStorage();
  savedMessages.push(messageData);
  saveMessagesToLocalStorage(savedMessages);
}

// 전송 버튼에 클릭 이벤트 리스너 추가
$sendMessage.addEventListener('click', fun);