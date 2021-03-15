import { request } from 'umi';

export async function likeCommentHelper(id: number) {
  return request('/api/blog/likecomments/', {
    params: {
      id: id,
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error.data);
    });
}

export async function dislikeCommentHelper(id: number) {
  return request('/api/blog/dislikecomments/', {
    params: {
      id: id,
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error.data);
    });
}

export async function likeArticleHelper(id: number) {
  return request('/api/blog/likearticle/', {
    params: {
      id: id,
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error.data);
    });
}

export async function dislikeArticleHelper(id: number) {
  return request('/api/blog/dislikearticle/', {
    params: {
      id: id,
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error.data);
    });
}
