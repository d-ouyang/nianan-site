import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/tokens.css';
import '@/styles/base.css';
import App from '@/App';

// 显式抛错而不是用 assert：python -O 那类「断言被剥掉」的教训在 JS 侧同样成立，
// 打包压缩后 assert 会被移除，而这里失败必须是响亮的。
const container = document.getElementById('root');
if (!container) {
  throw new Error('#root not found in index.html');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
