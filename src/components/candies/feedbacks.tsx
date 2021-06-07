import React from 'react';
import { EyeTwoTone, MessageTwoTone, LikeTwoTone } from '@ant-design/icons';
import { likeArticleHelper } from '../../utils/feedbackHelper';

interface Props {
  id: number;
  visits: number;
  comments: number;
  likes: number;
  size?: number;
  color?: [string, string, string];
}

interface States {
  init: boolean;
  likes: number;
}

class Feedbacks extends React.Component<Props, States> {
  static defaultProps = {
    size: 15,
    color: ['#00a344', '#00b8b5', '#ff5c5c'],
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      init: false,
      likes: props.likes,
    };
  }

  onClickLike = async () => {
    const likes = await likeArticleHelper(this.props.id);
    this.setState({
      init: true,
      likes: likes,
    });
  };

  render() {
    const { color } = this.props;
    const iconsize = this.props.size! + 2;
    return (
      <>
        <EyeTwoTone
          style={{
            fontSize: iconsize,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
          }}
          twoToneColor={color![0]}
        />
        &nbsp;
        <span
          style={{
            fontSize: this.props.size,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
          }}
        >
          {this.props.visits}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <MessageTwoTone
          twoToneColor={color![1]}
          style={{
            fontSize: iconsize,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
          }}
        />
        &nbsp;
        <span
          style={{
            fontSize: this.props.size,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
          }}
        >
          {this.props.comments}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <LikeTwoTone
          twoToneColor={color![2]}
          style={{
            fontSize: iconsize,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
            cursor: 'pointer',
          }}
          onClick={this.onClickLike}
        />
        &nbsp;
        <span
          style={{
            fontSize: this.props.size,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
          }}
        >
          {this.state.init ? this.state.likes : this.props.likes}
        </span>
      </>
    );
  }
}

export default Feedbacks;
