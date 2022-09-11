import request from '@/utils/request'

// 关键词检索
export function searchByKeyword(query) {
  return request({
    url: `/search/survivor`,
    method: 'get',
    params: {
      keyword: query.keyword,
      pageNum: query.pageNum,
      pageSize: query.pageSize
    }
  })
}

export function searchByKeywordKiller(query) {
  return request({
    url: `/search/killer`,
    method: 'get',
    params: {
      keyword: query.keyword,
      pageNum: query.pageNum,
      pageSize: query.pageSize
    }
  })
}