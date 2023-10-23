// JSON 파일의 경로
const jsonFilePath = "docs/data.json";

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

// JSON 파일 parse해서 배열에 저장
fetchJSONFile(jsonFilePath, function(data) {
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

    const forecastResults = document.getElementById("forecast-results");

    forecastResults.innerHTML += '==================' + '<br>';
    forecastResults.innerHTML += '시간 | 기온 | 강수확률' + '<br>';
    forecastResults.innerHTML += '==================' + '<br>';
    for (let i = 0; i < 12; i++) {
        const result = time[i][0] + time[i][1] + '시 | ' + tmp[i] + '도 | ' + pop[i] + '%';
        forecastResults.innerHTML += result + '<br>';
    }

    // document.getElementById("json-data").textContent = jsonData;
    // document.getElementById("json-data").textContent = json_parse.response.body.items.item[0].baseDate;
    // document.getElementById("json-data1").textContent = json_parse.response.body.items.item[0].baseTime;

    // document.getElementById("json-data").textContent = jsonData;
});