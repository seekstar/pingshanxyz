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

export function getDetailedData(page,count,state){
    return request({
        url: '/data', // 假地址 自行替换
        method: 'get',
        params: {page,count,state}
    })
}
export function getDataCount() {
    return request({
        url: '/data/count', // 假地址 自行替换
        method: 'get'
    })
}
export function getMyData(page,count,sort,property,status) {
    return request({
        url: '/user/data', // 假地址 自行替换
        method: 'get',
        params:{page,count,sort,property,status}
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

function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}

function gen_index_of(arr) {
    var index_of = {};
    for (let i = 0; i < arr.length; ++i) {
        index_of[arr[i]] = i;
    }
    return index_of;
}

function shallow_copy_array(arr) {
    var ret = [];
    for (let v of arr) {
        ret.push(v);
    }
    return ret;
}

//得到从from开始的7天的数据（每个街道的每个类别的事件的数目）
//from 形如 2018-10-30
export function getTotalNumOfEachTypes(from) {
    /*return request({
        url:
        method: 'get',
        params: {
            'from': from,
        }
    })*/
    var ori_street = ['碧岭街道', '龙田街道', '马峦街道', '石井街道', '坪山街道', '坑梓街道'];
    var ori_type = ['求决', '投诉', '咨询', '建议', '感谢', '其他'];
    var street_num = ori_street.length;
    var type_num = ori_type.length;

    var now_street = shallow_copy_array(ori_street);
    shuffle(now_street);
    var now_type = shallow_copy_array(ori_type);
    shuffle(now_type);
    // console.log(now_street);
    // console.log(now_type);
    var ans = [];
    for (let day = 0; day < 7; ++day) {
        let ret = [];
        for (let i = 0; i < 6; ++i) {   //街道
            let tmp = [];
            for (let j = 0; j < 6; ++j) {   //类别（求决、投诉等）
                tmp.push({
                    name: now_type[j],
                    value: Math.random() * 100  //事件数目
                });
            }
            ret.push({
                name: now_street[i],
                value: tmp
            });
        }
        ans.push(ret);
    }
    // console.log("random given data:");
    // console.log(ans);

    var index_of_street = gen_index_of(ori_street);
    var index_of_type = gen_index_of(ori_type);
    //console.log(index_of_street);
    //console.log(index_of_type);

    var clean_data = [];
    for (let given_day_data of ans) {
        let street_data = new Array(street_num);
        for (let given_street_data of given_day_data) {   //街道
            let to = index_of_street[given_street_data.name];
            //console.log("For street name " + given_street_data.name + ", to = " + to);
            street_data[to] = new Array(type_num);
            for (let given_type_data of given_street_data.value) {   //类别（求决、投诉等）
                street_data[to][index_of_type[given_type_data.name]] = given_type_data.value;
            }
        }
        clean_data.push(street_data);
    }
    //console.log(clean_data);

    return clean_data;
}


export function getEmails(page, count) {
    return request({
        url: '/mail',
        method: 'get',
        params: {
            'page': page,
            'count': count
        }
    })
}
export function getEmailHistory(page, count) {
    return request({
        url: '/mail/history',
        method: 'get',
        params: {
            'page': page,
            'count': count
        }
    })
}

