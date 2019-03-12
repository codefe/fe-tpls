import axios from 'axios';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.config.method === 'get') {
        let para = response.config.url.split('=')[1];
        if (para === 'quickNav') {
            return Promise.resolve(response.data[para]);
        } else {
            return Promise.resolve({ data: response.data, status: response.status, statusText: response.statusText });
        }
    } else {
        return Promise.resolve(response);
    }
}, function (error) {
    // 对响应错误做点什么
    if (error.response) {
        switch (error.response.status) {
            case 404:
                console.log('404 err');
                break;
        }
    }
    return Promise.reject(error.response);
});
export const getList = (url) => axios.get(url);
export const getAll = (url1, url2) => axios.all([getList(url1), getList(url2)]).then(
    axios.spread(function (acct, perms) {
        return Promise.resolve([acct, perms]);
    })
);
