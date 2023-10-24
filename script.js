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

    updateTime.innerHTML += '[데이터 최신화 : ' + json_parse.timestamp + ']';
});

// 페이지가 로드될 때 실행할 함수
function clearCacheAndReload() {
    // 캐시 비우기
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
            caches.delete(cacheName);
        });
        });
    }

    // 하드 리로드 (캐시를 사용하지 않고 다시 불러오기)
    window.location.reload(true);
}
  
// 페이지를 방문할 때 clearCacheAndReload 함수 실행
window.addEventListener('load', clearCacheAndReload);
  