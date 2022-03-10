import axios from 'axios'

// 默认接口头部公有的ip地址
// 因此使用本地回环地址127.0.0.1同时默认是80端口
// axios.defaults.baseURL = 'http://1.117.169.85:8081';
axios.defaults.baseURL = '/apis';
// axios.defaults.baseURL = 'http://api.cheeseburgerim.space';


export const createClass = (username, cname, teacherName) => {
  let fd = new FormData();
  fd.append("username", username);
  fd.append("cname", cname);
  fd.append("teacherName", teacherName);
  return axios.post('/class/api/create', fd);
}
export const getClassList = (teacherUsername) => {
  let fd = new FormData();
  fd.append("teacherUsername", teacherUsername);
  return axios.post('/class/api/get/all', fd);
}

export const editClass = (cid, cname) => {
  let fd = new FormData();
  fd.append("cid", cid);
  fd.append("cname", cname);
  return axios.post("/class/api/edit", fd);
}

export const invite = (cid, username, teacherUsername) => {
  let fd = new FormData();
  fd.append("cid", cid);
  fd.append("username", username);
  fd.append("teacherName", teacherUsername)
  return axios.post("/class/api/invite", fd);
}
export const dismissClass = (cid) => {
  let fd = new FormData();
  fd.append("cid", cid);
  return axios.post("/class/api/dismiss", fd);
}
