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
