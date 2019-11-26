import request from '@/utils/request'

export function startTest() {
    return request({
        url: '/test/start',
        method: 'put'
    })
}
export function stopTest() {
    return request({
        url: '/test/stop',
        method: 'put'
    })
}
export function cleanTest() {
    return request({
        url: '/test/clean',
        method: 'post'
    })
}
export function getTest() {
    return request({
        url: '/test',
        method: 'get'
    })
}

export function startPhone() {
    return request({
        url: '/phone/start',
        method: 'put'
    })
}
export function stopPhone() {
    return request({
        url: '/phone/stop',
        method: 'put'
    })
}
export function getPhone() {
    return request({
        url: '/phone',
        method: 'get'
    })
}