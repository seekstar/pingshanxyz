import request from '@/utils/request'

export function putData(form) {
    return request({
      url: '/data',
      method: 'post',
      data: form
    })
  }
