const write = (data) => { document.write(`<p>${data}</p>`) }

// 测试跨域请求，接口代理
const queryWeather = function(city) {
    // 聚合数据的接口
    $.ajax({
            url: '/api/onebox/weather/query',
            type: 'GET',
            dataType: 'json',
            data: {
                cityname: city,
                key: 'eec56fd860f07a4fac7edbef4c32cfcb'
            }
        })
        .done(function(res) {
            write(res.reason)
            let info = res.result.data.realtime
            for (let prop in info) {
                write(`${prop} = ${info[prop]}`)
            }
        })
        .fail(function() {
            write('error')
        })
}

$(function() {
    queryWeather('上海')
})
