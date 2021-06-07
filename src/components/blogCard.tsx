import React from 'react';
import globalstyles from './styles/index.less';
import style from './styles/bolgCard.less';
import { Link } from 'umi';
import { Avatar, Row, Col, Typography } from 'antd';

import { Time, Cls, Tags, Feedbacks } from './candies/components';

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
    abstract?: string;
  };
}

class BlogCard extends React.Component<Props, any> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { tags } = this.props.data;
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
            <Link to={`/articles/${this.props.data.id}`}>
              <div className={style.title} style={{ cursor: 'pointer' }}>
                {this.props.data.title}
              </div>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <Link to={`/articles/${this.props.data.id}`}>
              <Paragraph
                ellipsis={{ rows: 3, expandable: false }}
                style={{ cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ margin: '16px 8px', fontSize: '16px' }}>
                  {this.props.data.abstract}
                </div>
              </Paragraph>
            </Link>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <div className={style.leftspan}>
              <Time time={this.props.data.time!} />
              &nbsp;&nbsp;&nbsp;
              <Cls cls={this.props.data.cls!} />
              &nbsp;&nbsp;&nbsp;
              <Tags tags={tags!} />
            </div>
          </Col>
          <Col span={8} style={{ float: 'right' }}>
            <div className={style.rightspan}>
              <Feedbacks
                visits={this.props.data.visits!}
                comments={this.props.data.comments!}
                likes={this.props.data.likes!}
                id={this.props.data.id!}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogCard;
