import React from 'react';
import globalstyles from './styles/index.less';
import style from './styles/bolgCard.less';
import { request, Link } from 'umi';
import { Avatar, Row, Col, Typography, Tag } from 'antd';
import {
  TagsTwoTone,
  CalendarTwoTone,
  LikeTwoTone,
  DatabaseTwoTone,
  EyeTwoTone,
  MessageTwoTone,
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;

interface Props {
  data: {
    id?: number;
    author?: string;
    title?: string;
    cls?: string;
    tags?: Array<string>;
    likes?: number;
    dislikes?: number;
    visits?: number;
    comments?: number;
    time?: string;
    content?: string;
  };

  urlOnClickTag?: string;
  urlOnClickCls?: string;
  urlOnClickLike?: string;
}

class BlogCard extends React.Component<Props, any> {
  static defaultProps = {
    urlOnClickDetail: '/api/blog/getblog/',
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { tags } = this.props.data;
    const taglist = [];
    for (let i = 0; i < tags!.length; i++) {
      taglist.push(
        <Tag color="magenta" style={{ cursor: 'pointer' }}>
          {tags![i]}
        </Tag>,
      );
    }
    return (
      <div className={globalstyles.articlecard}>
        <Row gutter={8}>
          <Col span={2}>
            <Avatar
              size={'large'}
              src={
                '/api/media/avatars/' + this.props.data.author + '/avatar.png'
              }
              style={{ cursor: 'pointer' }}
            />
          </Col>
          <Col>
            <Link to={`articles/${this.props.data.id}`}>
              <div className={style.title} style={{ cursor: 'pointer' }}>
                {this.props.data.title}
              </div>
            </Link>
          </Col>
        </Row>
        <Row style={{ margin: '16px 0 8px 0' }}>
          <Col span={22} offset={1}>
            <Link to={`articles/${this.props.data.id}`}>
              <Paragraph
                ellipsis={{ rows: 3, expandable: false }}
                style={{ cursor: 'pointer' }}
              >
                <span>{this.props.data.content}</span>
              </Paragraph>
            </Link>
          </Col>
        </Row>
        <Row gutter={16} style={{ margin: '0 15px 0px 15px' }}>
          <Col span={16}>
            <div className={style.tags}>
              <CalendarTwoTone twoToneColor="#0e0aff" />
              &nbsp;
              <span className={style.time}>{this.props.data.time}</span>
              &nbsp;&nbsp;&nbsp;
              <DatabaseTwoTone twoToneColor="#55bd00" />
              &nbsp;
              <span className={style.clicktext}>{this.props.data.cls}</span>
              &nbsp;&nbsp;&nbsp;
              <TagsTwoTone twoToneColor="#e80285" />
              &nbsp;
              {taglist}
            </div>
          </Col>
          <Col span={8} style={{ float: 'right' }}>
            <div className={style.details}>
              <EyeTwoTone twoToneColor="#00a344" />
              &nbsp;
              <span className={style.time}>{this.props.data.visits}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <MessageTwoTone
                twoToneColor="#00b8b5"
                style={{ cursor: 'pointer' }}
              />
              &nbsp;
              <span className={style.clicktext}>
                {this.props.data.comments}
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <LikeTwoTone
                twoToneColor="#ff5c5c"
                style={{ cursor: 'pointer' }}
              />
              &nbsp;
              <span className={style.clicktext}>{this.props.data.likes}</span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogCard;
