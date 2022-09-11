import request from '@/utils/request'

// 列表
export function getList(pageNo, size, tab) {
  return request(({
    url: '/post/list',
    method: 'get',
    params: { pageNo: pageNo, size: size, tab: tab }
  }))
}

export function postRate(perkId,userId,popularity,appearance) {
  return request(({
    url: "/rate/post",
    method: 'get',
    params: {sperkId:perkId,userId:userId,popularity:popularity,appearance:appearance}
    // data: {appearance,popularity}
  }))
}

export function postKillerRate(perkId,userId,popularity,appearance) {
  return request(({
    url: "/killerrate/post",
    method: 'get',
    params: {kperkId:perkId,userId:userId,popularity:popularity,appearance:appearance}
    // data: {appearance,popularity}
  }))
}

export function sacredPlace(){
  return request(({
    url: "/post/sacred",
    method: 'get',
    params: {}
  }))
}

export function getRated(sperkId,userId){
  return request(({
    url: "/rate/get",
    method: 'get',
    params: {sperkId: sperkId, userId: userId}
  }))
}

export function getKillerRated(kperkId,userId){
  return request(({
    url: "/killerrate/get",
    method: 'get',
    params: {kperkId: kperkId, userId: userId}
  }))
}

export function deleteRated(sperkId,userId,appearance,popularity){
  return request(({
    url: "/rate/delete",
    method: 'get',
    params: {sperkId: sperkId, userId: userId,popularity:popularity,appearance:appearance}
  }))
}

// 发布
export function post(topic) {
  return request({
    url: '/post/create',
    method: 'get',
    data: topic
  })
}

// 浏览
export function getTopic(id) {
  return request({
    url: `/post`,
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getTopicKiller(id) {
  return request({
    url: `/post/killer`,
    method: 'get',
    params: {
      id: id
    }
  })
}
// 获取详情页推荐
export function getRecommendTopics(id) {
  return request({
    url: '/post/recommend',
    method: 'get',
    params: {
      topicId: id
    }
  })
}

export function update(topic) {
  return request({
    url: '/post/update',
    method: 'post',
    data: topic
  })
}

export function deleteTopic(id) {
  return request({
    url: `/post/delete/${id}`,
    method: 'delete'
  })
}

