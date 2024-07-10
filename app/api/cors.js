import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

// 初始化 CORS 中间件
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: 'chrome-extension://kepemcmfokkadammjlcknhpnmakajmkn', // 你的 Chrome 扩展 ID
  })
);

export default cors;