const jsonFilePath = "docs/data.json"; // JSON 파일의 경로
const time = [] // 예보시각
const tmp = [] // 온도
const pop = [] // 강수확률

// JSON 데이터를 가져오는 함수
function fetchJSONFile(filePath, callback) {
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error("Error loading JSON data:", error);
        });
}

function displayForecast() {
    const forecastResults = document.getElementById("forecast-results");
    const updateTime = document.getElementById("update-time");

    forecastResults.innerHTML += '==================' + '<br>';
    forecastResults.innerHTML += '시간 | 기온 | 강수확률' + '<br>';
    forecastResults.innerHTML += '==================' + '<br>';
    for (let i = 0; i < 12; i++) {
        const result = time[i][0] + time[i][1] + '시 | ' + tmp[i] + '도 | ' + pop[i] + '%';
        forecastResults.innerHTML += result + '<br>';
    }
    forecastResults.innerHTML += '==================' + '<br>';
}

// docs/data.json 파일 parse해서 배열에 저장
fetchJSONFile("docs/data.json", function(data) {
    const jsonData = JSON.stringify(data, null, 2);
    const json_parse = JSON.parse(jsonData);
    const item = json_parse.response.body.items.item;
    
    for (let i = 0; i < 144; i++) {
        const category = item[i].category;
        const fcstTime = item[i].fcstTime;
        const fcstValue = item[i].fcstValue;
        
        if (category === 'TMP') {
            time.push(fcstTime);
            tmp.push(fcstValue);
        } else if (category === 'POP') {
            pop.push(fcstValue);
        }
    }
    
    displayForecast();
});

// docs/timestamp.json 읽어서 최신화 시간 출력
fetchJSONFile("docs/timestamp.json", function(data) {
    const updateTime = document.getElementById("update-time");
    const jsonData = JSON.stringify(data, null, 2);
    const json_parse = JSON.parse(jsonData);
    const timestamp = json_parse.timestamp;

    updateTime.innerHTML += '[데이터 최신화 : ' + timestamp + ']';
    console.log(timestamp);

    // // 세션 스토리지에 'hasVisited' 키가 없으면 코드를 실행
    // if (!sessionStorage.getItem('hasVisited')) {
    //     window.location.reload(true); // 캐시 비우고 하드 리로드
    //     sessionStorage.setItem('hasVisited', 'true'); // 세션 스토리지에 'hasVisited' 키 저장
    // }

    // 첫 방문시, 재 방문시 '최신화 시간'이 기존과 다를경우
    if (sessionStorage.getItem('visitTime') !== timestamp) {
        sessionStorage.setItem('visitTime', timestamp);  // 페이지 '최신화 시간' 저장
        window.location.reload(true); // 캐시 비우고 하드 리로드
    }
});