import { setTwoToneColor, getTwoToneColor } from '@ant-design/icons';

const setTheme = async () => {
  const defaultTheme = 'purple';
  const themes = [
    'purple',
    'red',
    'volcano',
    'sunset',
    'cyan',
    'green',
    'blue',
    'geekblue',
    'magenta',
  ];
  let notAutoTheme =
    localStorage.getItem('notAutoTheme') ||
    sessionStorage.getItem('notAutoTheme');
  let visited = sessionStorage.getItem('visited');
  let theme = localStorage.getItem('theme') || sessionStorage.getItem('theme');
  if (visited) {
  } else {
    if (notAutoTheme) {
      if (theme) {
      } else {
        await localStorage.setItem('theme', defaultTheme);
      }
    } else {
      await localStorage.setItem(
        'theme',
        themes[Math.floor(Math.random() * themes.length)],
      );
    }
    await sessionStorage.setItem('visited', '1');
  }
  const iconColor: { [key: string]: string } = {
    purple: '#9254de',
    red: '#ff4d4f',
    volcano: '#ff7a45',
    sunset: '#ffc53d',
    cyan: '#36cfc9',
    green: '#73d13d',
    blue: '#40a9ff',
    geekblue: '#597ef7',
    magenta: '#f759ab',
    dark: '#1765ad',
    'dark-red': '#a61d24',
    'dark-volcano': '#aa3e19',
    'dark-sunset': '#aa6215',
    'dark-cyan': '#138585',
    'dark-green': '#3c8618',
    'dark-geekblue': '#263ea0',
    'dark-purple': '#51258f',
    'dark-magenta': '#a02669',
  };
  theme = localStorage.getItem('theme') || sessionStorage.getItem('theme');
  if (theme) {
  } else {
    theme = defaultTheme;
  }
  setTwoToneColor(iconColor[theme]);

  let styleLink = document.getElementById('theme-style');
  if (styleLink) {
    // 假如存在id为theme-style 的link标签，直接修改其href
    styleLink.href = '/theme/' + theme + '.css'; // 切换 antd 组件主题
  } else {
    // 不存在的话，则新建一个
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    styleLink.href = '/theme/' + theme + '.css';
    document.body.append(styleLink);
    const img = require('../assets/backgrounds/' + theme + '.jpg');
    document.getElementsByTagName('body')[0].style.backgroundImage =
      'url(' + img + ')';
  }
};

const setTheme1 = async () => {
  const iconColor: { [key: string]: string } = {
    purple: '#9254de',
    red: '#ff4d4f',
    volcano: '#ff7a45',
    sunset: '#ffc53d',
    cyan: '#36cfc9',
    green: '#73d13d',
    blue: '#40a9ff',
    geekblue: '#597ef7',
    magenta: '#f759ab',
    dark: '#1765ad',
    'dark-red': '#a61d24',
    'dark-volcano': '#aa3e19',
    'dark-sunset': '#aa6215',
    'dark-cyan': '#138585',
    'dark-green': '#3c8618',
    'dark-geekblue': '#263ea0',
    'dark-purple': '#51258f',
    'dark-magenta': '#a02669',
  };
  let theme = await (localStorage.getItem('theme') ||
    sessionStorage.getItem('theme'));
  if (theme) {
  } else {
    theme = 'purple';
  }
  setTwoToneColor(iconColor[theme]);
  let styleLink = document.getElementById('theme-style');
  if (styleLink) {
    // 假如存在id为theme-style 的link标签，直接修改其href
    styleLink.href = '/theme/' + theme + '.css'; // 切换 antd 组件主题
  } else {
    // 不存在的话，则新建一个
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    styleLink.href = '/theme/' + theme + '.css';
    document.body.append(styleLink);
  }
  const img = require('../assets/backgrounds/' + theme + '.jpg');
  document.getElementsByTagName('body')[0].style.backgroundImage =
    'url(' + img + ')';
};

export { setTheme1 };
export default setTheme;
