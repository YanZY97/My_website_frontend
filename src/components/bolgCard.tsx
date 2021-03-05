import React from 'react';
import globalstyles from './styles/index.less';
import style from './styles/bolgCard.less';
import { request, Request } from 'umi';
import { Avatar, Row, Col, Typography, Tag } from 'antd';
import {
  TagsTwoTone,
  CalendarTwoTone,
  LikeTwoTone,
  DatabaseTwoTone,
  EyeTwoTone,
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;

interface Props {
  id?: number;
  author?: string;
  title?: string;
  cls?: string;
  tags: Array<string>;
  likes?: number;
  dislikes?: number;
  visits?: number;
  time?: string;
  content?: string;

  urlOnClickDetail: string;
  urlOnClickTag: string;
  urlOnClickCls: string;
  urlOnClickLike: string;
}

class BlogCard extends React.Component<Props, any> {
  static defaultProps = {
    id: 1,
    author: 'y',
    title: '标题test',
    cls: 'article',
    tags: ['react', 'vue'],
    likes: 15,
    dislikes: 0,
    visits: 100,
    time: '2021/3/3 16:00:00',
    content:
      '管理页面我们通常能看到一连串的卡片，以很明显的方式对用户进行提示，也可以是图表嵌在卡片的形式直观展示。那就会存在一个需求，用户可以自定义自己想要的卡片布局，其实也就是自定义宽高这样。这样一个需求我们如何去实现呢？\
    查阅了一些文章之后，我选择了React-Grid-Layout这样一个组件，基本放大缩小以及拖拽这些都能实现，参照官方文档就ok，我这里主要讲一下，使用之后会出现的一些问题。\
    因为是基于hzero的项目，所有的路由是像一个tab页一样并列在顶部，并且路由之间的跳转不会触发组件的unmount方法，这时候就遇到了一个问题。当我们在其他页面进行浏览器的放大和缩小后，再回到使用React-Grid-Layout的页面，就会发现，所有的卡片挤在一起，样式错乱了，只在使用React-Grid-Layout的页面缩放就不会有问题，这样试了几次之后，很奇怪，为什么出现这种情况呢，那就只能去看看组件源码了，看了会，我发现了问题。',
    urlOnClickDetail: '/api/blog/getblog/',
  };

  constructor(props: Props) {
    super(props);
  }

  onClickDetail = () => {
    request(this.props.urlOnClickDetail, {
      method: 'get',
      data: { id: this.props.id },
    });
  };

  render() {
    const { tags } = this.props;
    const taglist = [];
    for (let i = 0; i < tags.length; i++) {
      taglist.push(
        <Tag color="magenta" style={{ cursor: 'pointer' }}>
          {tags[i]}
        </Tag>,
      );
    }
    return (
      <div className={globalstyles.articlecard}>
        <Row gutter={8}>
          <Col span={2}>
            <Avatar
              size={'large'}
              src={'/api/media/avatars/' + this.props.author + '/avatar.png'}
              style={{ cursor: 'pointer' }}
            />
          </Col>
          <Col>
            <div
              className={style.title}
              style={{ cursor: 'pointer' }}
              onClick={this.onClickDetail}
            >
              {this.props.title}
            </div>
          </Col>
        </Row>
        <Row style={{ margin: '16px 0 8px 0' }}>
          <Col span={22} offset={1}>
            <Paragraph
              ellipsis={{ rows: 3, expandable: false }}
              style={{ cursor: 'pointer' }}
            >
              <span onClick={this.onClickDetail}>{this.props.content}</span>
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={16} style={{ margin: '0 15px 0px 15px' }}>
          <Col span={12}>
            <div className={style.tags}>
              &nbsp;
              <DatabaseTwoTone twoToneColor="#55bd00" />
              &nbsp;
              <span className={style.clicktext}>{this.props.cls}</span>
              &nbsp;&nbsp;
              <TagsTwoTone twoToneColor="#e80285" />
              &nbsp;
              {taglist}
              &nbsp;&nbsp;
              <CalendarTwoTone twoToneColor="#0e0aff" />
              &nbsp;
              <span className={style.time}>{this.props.time}</span>
            </div>
          </Col>
          <Col span={12} style={{ float: 'right' }}>
            <div className={style.details}>
              <EyeTwoTone twoToneColor="#00a344" />
              &nbsp;
              <span className={style.time}>{this.props.visits}</span>
              &nbsp;&nbsp;
              <LikeTwoTone
                twoToneColor="#ff5c5c"
                style={{ cursor: 'pointer' }}
              />
              &nbsp;
              <span className={style.clicktext}>{this.props.likes}</span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogCard;
