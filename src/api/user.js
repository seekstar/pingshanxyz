import request from '@/utils/request'

export function login(loginInfo) {
  return request({
    url: '/user/login',
    method: 'post',
    data: loginInfo
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function updateInfo(data){
  return request({
    url: '/user/info',
    method: 'put',
    data
  })
}
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}
export function getCode(phone) {
  return request({
    url: '/user/password',
    method: 'get',
    params:{phone}
  })
}
export function resetPassword(data) {
  return request({
    url: '/user/password',
    method: 'post',
    data
  })
}
export function updatePassword(data) {
  return request({
    url: '/user/password',
    method: 'put',
    data
  })
}