const $postBtn = document.getElementById("postForm");
const $getBtn = document.getElementById("getRequest");








// POST 요청 처리
function func(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var score = parseInt(document.getElementById("score").value);

    fetch('http://113.198.233.57:3000/api/test/record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, score: score }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").innerHTML += 'POST Response: ' + JSON.stringify(data) + '<br>';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

$postBtn.addEventListener("submit", func);




function fun() {
    fetch('http://113.198.233.57:3000/api/test/record?type=score')
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").innerHTML += 'GET Response: ' + JSON.stringify(data) + '<br>';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
// GET 요청 처리
$getBtn.addEventListener("click", fun);