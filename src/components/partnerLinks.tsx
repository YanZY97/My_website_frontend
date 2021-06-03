import React from 'react';
import { request, history } from 'umi';
import { Row, Col, Card, Avatar, Divider, Typography } from 'antd';

const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;
import QueueAnim from 'rc-queue-anim';

interface isProps {
  data: {
    image: string;
    link: string;
    username: string;
    signature: string;
  };
}

class LinkCard extends React.Component<isProps, any> {
  constructor(props: isProps) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 200, height: 250 }}
            cover={<img src={data.image} />}
            onClick={() => {
              window.open('http://' + data.link);
            }}
          >
            <Meta
              avatar={
                <Avatar
                  src={
                    '/api/media/avatars/' +
                    data.username +
                    '/avatar.png' +
                    '?ran=' +
                    Math.random()
                  }
                />
              }
              title={data.username}
              description={data.signature}
            />
          </Card>
        </Col>
      </>
    );
  }
}

interface isState {
  linkCardList: any;
}

class PartnerLinks extends React.Component<any, isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      linkCardList: [],
    };
  }

  componentDidMount() {
    this.getPartnerLinks();
  }

  getPartnerLinks = async () => {
    await request('/api/user/getwebaccess/', {
      method: 'get',
    })
      .then(response => {
        let linkList = [];
        for (let k = 0; k < response.data.length; k++) {
          linkList.push(<LinkCard data={response.data[k]} key={k} />);
        }
        this.setState({
          linkCardList: linkList,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <Title>Partners</Title>
        <Paragraph>
          <pre>
            能访问的个人主页会显示在这里
            <br />
            请联系我并将本站链接加入你的网站中
            <br />
            提供网站图片用来展示
          </pre>
        </Paragraph>
        <Divider />
        <Row gutter={[48, 48]}>
          {/* <QueueAnim> */}
          {this.state.linkCardList}
          {/* </QueueAnim> */}
        </Row>
        <Divider />
        <Title>常用网站</Title>
        <Row gutter={[48, 48]}>
          <Col span={6}>
            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => {
                window.open('https://github.com/');
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    shape="square"
                    src={'https://github.com/favicon.ico'}
                  />
                }
                title={'Github'}
                description={'Where the world builds software'}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => {
                window.open('https://stackoverflow.com/');
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    shape="square"
                    src={'https://stackoverflow.com/favicon.ico'}
                  />
                }
                title={'stackoverflow'}
                description={'Where Developers Learn, Share, & Build Careers'}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => {
                window.open('https://translate.google.com/');
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    shape="square"
                    src={
                      'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/cdbf6c81800a19d8ce78815539fa828ba61e4662.jpg'
                    }
                  />
                }
                title={'google翻译'}
                description={'google translate'}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => {
                window.open('https://www.csdn.net/');
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    shape="square"
                    src={'https://g.csdnimg.cn/static/logo/favicon32.ico'}
                  />
                }
                title={'CSDN'}
                description={'专业开发者社区'}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => {
                window.open('https://ant.design/index-cn');
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
                    }
                    shape="square"
                  />
                }
                title={'Ant Design'}
                description={'React UI 组件库'}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => {
                window.open('https://gitmind.cn/');
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4IC0xOCkiPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItODg0LjQ4NiIgeTE9IjU2NC4xOTUiIHgyPSItODg0LjM1NCIgeTI9IjU2My45NjciIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMzYgMCAwIC0zNiAzMTg4NyAyMDM0NSkiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y1YTI0NiIvPjxzdG9wIG9mZnNldD0iLjc3IiBzdG9wLWNvbG9yPSIjZWY1NjMxIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJNNDggNTcuOGMtOC4yIDAtMTUuNy01LjEtMTguNi0xMy4xLTMuMy05LjEuNC0xOS4xIDguOC0yMy45IDguNC00LjggMTguOS0yLjkgMjUuMSA0LjYuNi44LjUgMS45LS4yIDIuNS0uOC42LTEuOS41LTIuNS0uMi01LTYuMS0xMy43LTcuNi0yMC41LTMuNy02LjkgMy45LTkuOSAxMi4xLTcuMiAxOS42LjEuMy4yLjUuMy44TDM4LjcgMzBjLjMtLjcuOS0xLjIgMS43LTEuMi44IDAgMS40LjUgMS43IDEuMmw0LjEgMTIuMyA0LjYtMTAuNmMuMy0uNyAxLTEuMSAxLjctMS4xczEuNC41IDEuNiAxLjFsMS43IDQuNEg2NmMxIDAgMS44LjggMS44IDEuOCAwIDkuNi02LjkgMTcuOC0xNi40IDE5LjUtMS4xLjMtMi4zLjQtMy40LjR6bS0xMi42LTkuNkMzOSA1Mi43IDQ0LjkgNTUgNTAuOCA1NGM3LjItMS4zIDEyLjUtNy4xIDEzLjMtMTQuMmgtOS42Yy0uNyAwLTEuNC0uNS0xLjctMS4xbC0uNi0xLjVMNDcuNSA0OGMtLjMuNy0xIDEuMS0xLjcgMS4xcy0xLjQtLjUtMS42LTEuMmwtNC0xMi00LjggMTIuM3oiIGZpbGw9InVybCgjYSkiLz48L2c+PC9zdmc+'
                    }
                    shape="square"
                  />
                }
                title={'Gitmind'}
                description={'免费在线思维导图软件'}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => {
                window.open('https://www.iconfont.cn/');
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      'http://img.alicdn.com/imgextra/i4/O1CN01EYTRnJ297D6vehehJ_!!6000000008020-55-tps-64-64.svg'
                    }
                    shape="square"
                  />
                }
                title={'iconfont'}
                description={'阿里巴巴矢量图标库'}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default PartnerLinks;
