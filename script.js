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

function displayClothes() {
    // 온도에 따른 옷 img src, 텍스트 추가하는 코드
    var tmp_sum = 0;
    for (let i = 0; i < tmp.length; i++) {
        tmp_sum += parseInt(tmp[i]);
    }
    var tmp_ave = tmp_sum / tmp.length;

    if (tmp_ave <= 4) {
        document.getElementById("clothes-img").src = "images/4.png";
        document.getElementById("clothes-text").innerHTML = "패딩, 두꺼운 코트, 누빔 옷, 기모, 목도리";
    } else if (tmp_ave > 4 && tmp_ave <= 8) {
        document.getElementById("clothes-img").src = "images/5_8.png";
        document.getElementById("clothes-text").innerHTML = "울 코트, 히트텍, 가죽 옷, 기모";
    } else if (tmp_ave > 8 && tmp_ave <= 11) {
        document.getElementById("clothes-img").src = "images/9_11.png";
        document.getElementById("clothes-text").innerHTML = "트렌치 코트, 야상, 점퍼, 스타킹, 기모바지";
    } else if (tmp_ave > 11 && tmp_ave <= 16) {
        document.getElementById("clothes-img").src = "images/12_16.png";
        document.getElementById("clothes-text").innerHTML = "자켓, 가디건, 청자켓, 니트, 스타킹, 청바지";
    } else if (tmp_ave > 16 && tmp_ave <= 19) {
        document.getElementById("clothes-img").src = "images/17_19.png";
        document.getElementById("clothes-text").innerHTML = "얇은 가디건이나 니트, 맨투맨, 후드, 긴바지";
    } else if (tmp_ave > 19 && tmp_ave <= 22) {
        document.getElementById("clothes-img").src = "images/20_22.png";
        document.getElementById("clothes-text").innerHTML = "블라우스, 긴팔 티, 면바지, 슬랙스";
    } else if (tmp_ave > 22 && tmp_ave <= 27) {
        document.getElementById("clothes-img").src = "images/23_27.png";
        document.getElementById("clothes-text").innerHTML = "반팔, 얇은셔츠, 반바지, 면바지";
    } else {
        document.getElementById("clothes-img").src = "images/28_.png";
        document.getElementById("clothes-text").innerHTML = "민소매, 반팔, 반바지, 짧은 치마, 린넷 옷";
    }

    // 강수 확률에 따른 우산 img src 추가 코드 (강수확률 40% 이상이 하나라도 있으면 챙기기)
    var is_rain = false;
    for (let i = 0; i < pop.length; i++) {
        if(parseInt(pop[i]) >= 40) {
            is_rain = true;
        }
    }

    if(is_rain) {
        document.getElementById("plus").src = "images/plus.png";
        document.getElementById("umb").src = "images/umb.png";
    }
}
 
function displayForecast() {
    const forecastResults = document.getElementById("forecast-results");

    // forecastResults.innerHTML += '==================' + '<br>';
    // forecastResults.innerHTML += '시간 | 기온 | 강수확률' + '<br>';
    // forecastResults.innerHTML += '==================' + '<br>';
    // for (let i = 0; i < 12; i++) {
    //     const result = time[i][0] + time[i][1] + '시 | ' + tmp[i] + '도 | ' + pop[i] + '%';
    //     forecastResults.innerHTML += result + '<br>';
    // }
    // forecastResults.innerHTML += '==================' + '<br>';
    
    for (let i = 0; i < time.length; i++) {
        var result = '';
        result += '<div class="card">\n';
        result += '\t<p style="font-size: 64px;">' + time[i][0] + time[i][1] + '시' + '</p>\n';
        result += '\t<p>' + tmp[i] + '°' + '</p>\n';
        result += '\t<p>' + pop[i] + '%' + '</p>\n';
        result += '</div>\n'
        forecastResults.innerHTML += result;
    }
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
    
    displayClothes();
    displayForecast();
});

// docs/timestamp.json 읽어서 최신화 시간 출력
fetchJSONFile("docs/timestamp.json", function(data) {
    const updateTime = document.getElementById("update-time");
    const jsonData = JSON.stringify(data, null, 2);
    const json_parse = JSON.parse(jsonData);
    const timestamp = json_parse.timestamp;

    updateTime.innerHTML += '[데이터 최신화 : ' + timestamp + ']';
});