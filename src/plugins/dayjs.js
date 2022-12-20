// 引入 dayjs 包，注意：新版的 dayjs 只能用 import * as xxx from 'dayjs' 语法导入
import * as dayjs from 'dayjs'
// 引入 相对时间 插件模块
import relativeTime from 'dayjs/plugin/relativeTime'
// 引入 中文语言包，注意：语言包 不需要用变量接收，引入了即可
import 'dayjs/locale/zh-cn'

// 配置语言包环境
dayjs.locale('zh-cn')
// 注册 相对时间 这个插件
dayjs.extend(relativeTime)

export default dayjs