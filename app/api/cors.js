import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

// 初始化 CORS 中间件
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: 'chrome-extension://kepemcmfokkadammjlcknhpnmakajmkn', // 你的 Chrome 扩展 ID
    optionsSuccessStatus: 200, // 一些遗留浏览器 (IE11, various SmartTVs) 无法处理 204
    credentials: true, // 如果需要支持跨域 cookies
  })
);

export default cors;