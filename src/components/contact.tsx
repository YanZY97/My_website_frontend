import React from 'react';
import globalstyles from './styles/index.less';
import { createFromIconfontCN } from '@ant-design/icons';
import { Tooltip, Popover, Typography } from 'antd';
import qq from '../assets/imgs/qq.png';
import wechat from '../assets/imgs/wechat.png';
import music from '../assets/imgs/music.png';

const { Text } = Typography;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2272819_jvlgz9b2j1k.js',
});

const handleClick = (url: string) => {
  const w: any = window.open();
  w.location.href = url;
};

const Contact = () => (
  <div className={globalstyles.sidetool}>
    <Tooltip title="Github">
      <IconFont
        type="icon-github"
        className={globalstyles.icon}
        onClick={() => handleClick('https://github.com/YanZY97')}
      />
    </Tooltip>
    <Popover content={<img src={qq} width="160px" />} color="#000000cc">
      <IconFont type="icon-qq" className={globalstyles.icon} />
    </Popover>
    <Popover content={<img src={wechat} width="160px" />} color="#000000cc">
      <IconFont type="icon-wechat" className={globalstyles.icon} />
    </Popover>
    <Tooltip
      title={
        <Text copyable style={{ color: 'white' }}>
          1835752347@qq.com{' '}
        </Text>
      }
    >
      <IconFont type="icon-youxiang-" className={globalstyles.icon} />
    </Tooltip>
    <Tooltip
      title={
        <div>
          好友代码：
          <Text copyable style={{ color: 'white' }}>
            162932926{' '}
          </Text>
        </div>
      }
    >
      <IconFont type="icon-steam" className={globalstyles.icon} />
    </Tooltip>
    <br />
    <Popover content={<img src={music} width="160px" />} color="#000000cc">
      <IconFont
        type="icon-netease-cloud-music-fill"
        className={globalstyles.icon}
      />
    </Popover>
    <Tooltip title="Douban">
      <IconFont
        type="icon-douban_F"
        className={globalstyles.icon}
        onClick={() => handleClick('https://www.douban.com/people/146301000/')}
      />
    </Tooltip>
    <Tooltip title="Resume">
      <IconFont type="icon-resume" className={globalstyles.icon} />
    </Tooltip>
    <Tooltip title="more">
      <IconFont
        type="icon-more-copy-copy"
        className={globalstyles.icon}
        onClick={() => {
          window.location.href = '/about';
        }}
      />
    </Tooltip>
  </div>
);

export default Contact;
