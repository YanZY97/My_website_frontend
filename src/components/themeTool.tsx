import React from 'react';
import { Popover, Button, Switch, Typography } from 'antd';
import { SkinOutlined } from '@ant-design/icons';
import { setTheme1 } from '@/utils/setTheme';
import styles from './styles/themeTool.less';

interface isProps {
  changeIconColorSignal: any;
}

class ThemeTool extends React.Component<isProps, any> {
  constructor(props: isProps) {
    super(props);
  }

  loadTheme = async (theme: string) => {
    await localStorage.setItem('theme', theme);
    await setTheme1();
    this.props.changeIconColorSignal();
  };

  onChange = (checked: boolean) => {
    if (checked) {
      localStorage.removeItem('notAutoTheme');
    } else {
      localStorage.setItem('notAutoTheme', 'y');
    }
  };

  render() {
    const content = (
      <>
        <div>
          <Typography.Text>
            随机主题(开启后每次进入时随机选择主题)&nbsp;&nbsp;&nbsp;
          </Typography.Text>
          <Switch
            defaultChecked={() => !localStorage.getItem('notAutoTheme')}
            onChange={this.onChange}
          />
        </div>
        <div style={{ padding: '12px 6px 6px' }}>
          <div
            className={styles.light}
            style={{ backgroundColor: '#F5222D' }}
            onClick={() => this.loadTheme('red')}
          ></div>
          <div
            className={styles.light}
            style={{ backgroundColor: '#FA541C' }}
            onClick={() => this.loadTheme('volcano')}
          ></div>
          <div
            className={styles.light}
            style={{ backgroundColor: '#FAAD14' }}
            onClick={() => this.loadTheme('sunset')}
          ></div>
          <div
            className={styles.light}
            style={{ backgroundColor: '#13C2C2' }}
            onClick={() => this.loadTheme('cyan')}
          ></div>
          <div
            className={styles.light}
            style={{ backgroundColor: '#52C41A' }}
            onClick={() => this.loadTheme('green')}
          ></div>
          <div
            className={styles.light}
            style={{ backgroundColor: '#1890FF' }}
            onClick={() => this.loadTheme('blue')}
          ></div>
          <div
            className={styles.light}
            style={{ backgroundColor: '#2F54EB' }}
            onClick={() => this.loadTheme('geekblue')}
          ></div>
          <div
            className={styles.light}
            style={{ backgroundColor: '#722ED1' }}
            onClick={() => this.loadTheme('purple')}
          ></div>
          <div
            className={styles.light}
            style={{ backgroundColor: '#EB2F96' }}
            onClick={() => this.loadTheme('magenta')}
          ></div>
        </div>
        <div style={{ padding: '0px 6px 0px' }}>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#F5222D' }}
            onClick={() => this.loadTheme('dark-red')}
          ></div>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#FA541C' }}
            onClick={() => this.loadTheme('dark-volcano')}
          ></div>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#FAAD14' }}
            onClick={() => this.loadTheme('dark-sunset')}
          ></div>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#13C2C2' }}
            onClick={() => this.loadTheme('dark-cyan')}
          ></div>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#52C41A' }}
            onClick={() => this.loadTheme('dark-green')}
          ></div>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#1890FF' }}
            onClick={() => this.loadTheme('dark')}
          ></div>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#2F54EB' }}
            onClick={() => this.loadTheme('dark-geekblue')}
          ></div>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#722ED1' }}
            onClick={() => this.loadTheme('dark-purple')}
          ></div>
          <div
            className={styles.dark}
            style={{ backgroundColor: '#EB2F96' }}
            onClick={() => this.loadTheme('dark-magenta')}
          ></div>
        </div>
      </>
    );
    return (
      <>
        <Popover content={content} title="修改主题" trigger="click">
          <Button
            style={{
              right: '50px',
              bottom: '50px',
              position: 'fixed',
              zIndex: 190,
            }}
            type="default"
            shape="circle"
            size="large"
            icon={<SkinOutlined />}
          />
        </Popover>
      </>
    );
  }
}

export default ThemeTool;
