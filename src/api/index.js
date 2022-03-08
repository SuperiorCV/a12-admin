// 读取所欲模块内部定义的请求方法
import * as login from './login.js'
import * as  homepage from './homepage.js'
// 暴露给外部以便调用，此时所有的api方法整合到了一起形成一个对象命名为apis
const apis={
    login
}
export default apis


