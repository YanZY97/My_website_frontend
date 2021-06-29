import React from 'react';
import { request } from 'umi';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { Time, Cls, Tags, Feedbacks, CommentCard } from './candies/components';
import { Avatar, List, Spin, Typography } from 'antd';
import CommentEditor from './commentEditor';

import 'highlight.js/styles/atelier-seaside-dark.css';
// import './styles/github-markdown.css';
import style from './styles/article.less';

interface ArticleProps {
  id: number;
}

interface ArticleStates {
  data: {
    id?: number;
    author?: string;
    avatar?: string;
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
  commentsData: Array<{
    id: number;
    author: string;
    avatar: string;
    data: string;
    likes: number;
    dislikes: number;
    time: string;
  }>;
  initialized: boolean;
}

interface ContentProps {
  content: string;
}

interface TitleProps {
  id: number;
  title: string;
  author: string;
  avatar: string;
  cls: string;
  tags: Array<string>;
  time: string;
  visits: number;
  likes: number;
  comments: number;
}

class Title extends React.Component<TitleProps, any> {
  constructor(props: TitleProps) {
    super(props);
  }

  render() {
    const {
      title,
      author,
      avatar,
      cls,
      tags,
      time,
      visits,
      likes,
      comments,
      id,
    } = this.props;
    return (
      <>
        <div className={style.titlelayout}>
          <div className={style.title}>
            <Typography.Text>{title}</Typography.Text>
          </div>
          <div className={style.author}>
            <Avatar size={'small'} src={avatar} />
            &nbsp;&nbsp;&nbsp;
            <Typography.Text>{author}</Typography.Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Time time={time} />
            &nbsp;&nbsp;&nbsp;
            <Cls cls={cls} />
            &nbsp;&nbsp;&nbsp;
            <Tags tags={tags} />
            &nbsp;&nbsp;&nbsp;
            <Feedbacks
              visits={visits}
              likes={likes}
              comments={comments}
              id={id}
            />
          </div>
        </div>
      </>
    );
  }
}

class Content extends React.Component<ContentProps, any> {
  mdParser: MarkdownIt;
  constructor(props: ContentProps) {
    super(props);
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return ''; // use external default escaping
      },
    })
      .use(require('markdown-it-emoji'))
      .use(require('markdown-it-sub'))
      .use(require('markdown-it-sup'))
      .use(require('markdown-it-footnote'))
      .use(require('markdown-it-deflist'))
      .use(require('markdown-it-abbr'))
      .use(require('markdown-it-ins'))
      .use(require('markdown-it-mark'))
      .use(require('markdown-it-task-lists'))
      .use(require('markdown-it-container'));
  }

  renderHTML(text: string) {
    return this.mdParser.render(text);
  }

  render() {
    return (
      <>
        <div className={style.content}>
          <div
            className={style.markdownbody}
            dangerouslySetInnerHTML={{
              __html: this.renderHTML(this.props.content),
            }}
          ></div>
        </div>
      </>
    );
  }
}

class Article extends React.Component<ArticleProps, ArticleStates> {
  constructor(props: ArticleProps) {
    super(props);
    this.state = {
      data: {
        author: 'y',
        title: 'title',
        cls: 'cls',
        tags: ['tags'],
        likes: 0,
        dislikes: 0,
        visits: 0,
        comments: 0,
        time: '1997/2/7 10:00:00',
        content: 'content',
      },
      commentsData: [
        {
          id: 0,
          author: 'y',
          avatar: '',
          likes: 0,
          dislikes: 0,
          time: '1997/2/7 10:00:00',
          data: 'data',
        },
      ],
      initialized: false,
    };
  }

  async componentDidMount() {
    await this.getArticle();
    await this.getComments();
    this.setState({ initialized: true });
  }

  getArticle = async () => {
    return request('/api/blog/getarticle/', {
      params: {
        id: this.props.id,
      },
    })
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  getComments = async () => {
    return request('/api/blog/getcomments/', {
      params: {
        id: this.props.id,
      },
    })
      .then(response => {
        this.setState({ commentsData: response.data });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    const {
      id,
      author,
      title,
      cls,
      tags,
      likes,
      avatar,
      visits,
      time,
      content,
    } = this.state.data;
    const { initialized } = this.state;
    const component = [
      <div className={style.article}>
        <Title
          title={title!}
          author={author!}
          avatar={avatar!}
          cls={cls!}
          tags={tags!}
          likes={likes!}
          visits={visits!}
          time={time!}
          comments={this.state.commentsData.length!}
          id={id!}
        />
        <Content content={content!} />
        <div className={style.divider}></div>
        <CommentEditor
          id={this.props.id}
          handleRefresh={() => {
            this.getComments();
          }}
        />
        <List
          header={`共 ${this.state.commentsData.length} 条评论`}
          className={style.comments}
          itemLayout="horizontal"
          dataSource={this.state.commentsData}
          renderItem={item => (
            <li>
              <CommentCard data={item} />
            </li>
          )}
        />
      </div>,
    ];

    const skeleton = [
      <div className={style.article}>
        <div className={style.spin}>
          <Spin size="large" />
        </div>
      </div>,
    ];

    return <>{initialized ? component : skeleton}</>;
  }
}

export default Article;
