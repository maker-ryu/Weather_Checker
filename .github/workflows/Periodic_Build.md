name: Periodic Build

on:
  schedule:
    # - cron: '0 11,14,17,20,23,2,5,8 * * *' # 2시, 5시, 8시, ... 23시에 실행 (UTC 기준, 우리나라 시간은 UTC+9)
    - cron: '*/1 * * * 1,2,3,4,5'
    # '0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'
    # '1100', '1400', '1700', '2000', '2300', '0200', '0500', '0800'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Check Out Code
      uses: actions/checkout@v2

    - name: Set Parameters and Run Build
      run: |
        current_hour=$(date +'%H')
        if [ $current_hour -eq 2 ]; then
          currunt_time="1100"
        elif [ $current_hour -eq 5 ]; then 
          currunt_time="1400"
        elif [ $current_hour -eq 8 ]; then
          currunt_time="1700"
        elif [ $current_hour -eq 11 ]; then
          currunt_time="2000"
        elif [ $current_hour -eq 14 ]; then
          currunt_time="2300"
        elif [ $current_hour -eq 17 ]; then
          currunt_time="0200"
        elif [ $current_hour -eq 20 ]; then
          currunt_time="0500"
        elif [ $current_hour -eq 23 ]; then
          currunt_time="0800"
        else
          echo "No parameters specified for the current time ($current_hour)"
          exit 1
        fi

        echo "Running the build with base_time: $currunt_time"