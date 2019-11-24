import request from '@/utils/request'

function dateFormat(fmt, date) {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
            );
        }
    }
    return fmt;
}
  

export function getPieChartData(from, to) {
    return request({
        url: '/statistics/property', // 假地址 自行替换
        method: 'get',
        params: {
            'from': dateFormat("YYYY-mm-dd HH:MM:SS", from),
            'to': dateFormat("YYYY-mm-dd HH:MM:SS", to)
        }
    })
}

export function getBarChartData(year, month) {
    if(year<0){
        return request({
            url: '/statistics/type', // 假地址 自行替换
            method: 'get',
        })
    }else{
        return request({
            url: '/statistics/type', // 假地址 自行替换
            method: 'get',
            params: {
                'year': year,
                'month': month
            }
        })
    }
}

export function getSunburstChartData(op, year, date){
    if(op==1){
        return request({
            url: '/statistics/status', // 假地址 自行替换
            method: 'get'
        })
    }else if(op==2){
        return request({
            url: '/statistics/status', // 假地址 自行替换
            method: 'get',
            params: {
                'year': year,
                'month': date
            }
        })
    }else{
        return request({
            url: '/statistics/status', // 假地址 自行替换
            method: 'get',
            params: {
                'year': year,
                'quarter': date
            }
        })
    }
}

export function getDetailedData(page,count){
    return request({
        url: '/data', // 假地址 自行替换
        method: 'get',
        params: {page,count}
    })
}
export function getDataCount() {
    return request({
        url: '/data/count', // 假地址 自行替换
        method: 'get'
    })
}
export function getMyData() {
    return request({
        url: '/user/data', // 假地址 自行替换
        method: 'get'
    })
}

export function getAbnormalData(){
    return request({
        url: '/data/abnormal',
        method: 'get'
    })
}

export function getMapData(year, month){
    if(year<0){
        return request({
            url: '/statistics/community', // 假地址 自行替换
            method: 'get',
        })
    }else{
        return request({
            url: '/statistics/community', // 假地址 自行替换
            method: 'get',
            params: {
                'year': year,
                'month': month
            }
        })
    }
}

export function getDataVersion(){
    return request({
        url: '/data/version',
        method: 'get'
    })
}
