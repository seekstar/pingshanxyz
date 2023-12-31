import request from '@/utils/request'

export function putData(form) {
    return request({
      url: '/data',
      method: 'post',
      data: form
    })
  }
export function putMyData(data) {
  return request({
    url: '/user/data',
    method: 'put',
    data
  })
}

export function sendEmail(form) {
  return request({
    url: '/mail',
    method: 'post',
    data: form
  })
}

export function changeIsread(id, isread) {
  return request({
    url: '/mail',
    method: 'put',
    data: {
      'id': id,
      'isread': isread
    }
  })
}

