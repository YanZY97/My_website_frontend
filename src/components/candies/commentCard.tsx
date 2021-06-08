import React, { createElement } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';
import moment from 'moment';
import {
  likeCommentHelper,
  dislikeCommentHelper,
} from '@/utils/feedbackHelper';

interface Props {
  data: {
    id: number;
    author: string;
    avatar: string;
    data: string;
    likes: number;
    dislikes: number;
    time: string;
  };
}

interface States {
  likes: number;
  dislikes: number;
  like: boolean;
  dislike: boolean;
}

class CommentCard extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      likes: this.props.data.likes,
      dislikes: this.props.data.dislikes,
      like: false,
      dislike: false,
    };
  }

  like = async () => {
    if (this.state.like) {
      return;
    }
    const likes = await likeCommentHelper(this.props.data.id);
    this.setState({
      like: true,
      likes: likes,
    });
  };

  dislike = async () => {
    if (this.state.dislike) {
      return;
    }
    const dislikes = await dislikeCommentHelper(this.props.data.id);
    this.setState({
      dislike: true,
      dislikes: dislikes,
    });
  };

  render() {
    const { data } = this.props;
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={this.like}>
          {createElement(this.state.like ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{this.state.likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={this.dislike}>
          {React.createElement(
            this.state.dislike ? DislikeFilled : DislikeOutlined,
          )}
          <span className="comment-action">{this.state.dislikes}</span>
        </span>
      </Tooltip>,
      // <span key="comment-basic-reply-to">Reply to</span>,
    ];
    return (
      <>
        <Comment
          actions={actions}
          author={data.author}
          avatar={<Avatar src={data.avatar} />}
          content={<p>{data.data}</p>}
          datetime={
            <Tooltip title={data.time}>
              {/* <span>{moment().fromNow()}</span> */}
              {data.time}
            </Tooltip>
          }
        />
      </>
    );
  }
}

export default CommentCard;
