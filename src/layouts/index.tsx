import React from 'react'
import { Layout, Menu, Avatar, Badge, Button, Col, Row } from 'antd'
import { Link } from 'umi'
import { HomeTwoTone, FileTextTwoTone, ExperimentTwoTone, MessageTwoTone, HeartTwoTone, IdcardTwoTone, UserOutlined, GithubOutlined } from '@ant-design/icons'
import styles from './index.less'
import theme from '../../config/theme'

import heartImg from '../assets/imgs/heart.png'
import logoImg from '../assets/imgs/logo.png'

const { Header, Content, Footer } = Layout
function BasicLayout(props: { location: any; children: React.ReactNode; }) {
  const pathname = props.location.pathname
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}><img src={logoImg} style={{height: "30px"}}/> mysite</div>
        <div className={styles.user}>
          <Button type="primary" size="small">登录</Button>&nbsp;&nbsp;&nbsp;
          <Button type="default" size="small">注册</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href=""><GithubOutlined className={styles.githubLink} /></a> 
        </div>
        <div className={styles.user} style={{ display: "none" }}>
          <Badge count={0}>
            <Avatar icon={<UserOutlined />} />
          </Badge>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={pathname}
          style={{ lineHeight: '48px' }}
        >
          <Menu.Item key='home'><Link to='home'><HomeTwoTone twoToneColor={theme["@primary-color"]} />首页</Link></Menu.Item>
          <Menu.Item key='blog'><Link to='blog'><FileTextTwoTone twoToneColor={theme["@primary-color"]} />博客</Link></Menu.Item>
          <Menu.Item key='lab'><Link to='lab'><ExperimentTwoTone twoToneColor={theme["@primary-color"]} />实验室</Link></Menu.Item>
          <Menu.Item key='message'><Link to='message'><MessageTwoTone twoToneColor={theme["@primary-color"]} />留言板</Link></Menu.Item>
          <Menu.Item key='partner'><Link to='partner'><HeartTwoTone twoToneColor={theme["@primary-color"]} />伙伴</Link></Menu.Item>
          <Menu.Item key='about'><Link to='about'><IdcardTwoTone twoToneColor={theme["@primary-color"]} />关于我</Link></Menu.Item>
        </Menu>
      </Header>
      <Content className={styles.content}>
        <Row style={{ margin: '20px 0' }}>
          <Col span={15} offset={2} style={{ marginRight: '12px' }}>
            <div className={styles.children}>
              {props.children}
            </div>
          </Col> 
          <Col span={5} style={{ marginLeft: '12px' }}>
            <Row>
              <Col span={24} className={styles.sidetools}>

              </Col>
              <Col span={24} className={styles.sidetools}>

              </Col>
              <Col span={24} className={styles.sidetools}>

              </Col>
              <Col span={24} className={styles.sidetools}>

              </Col>
            </Row>
          </Col>
        </Row>
          
      </Content>
      <Footer className={styles.footer}>
        <p>2020 </p>
        <div className={styles.divider}></div>
        <p>Made with <img src={heartImg} style={{height: "20px"}} /> by Hal</p>
      </Footer>
    </Layout>
  );
}

export default BasicLayout;