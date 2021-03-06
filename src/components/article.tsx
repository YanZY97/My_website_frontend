import React from 'react';
import { request } from 'umi';

interface Props {
  id: number;
}

interface States {
  data: string;
}

class Article extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    request('/api/blog/getarticle/', {
      params: {
        id: this.props.id,
      },
    })
      .then(response => {
        this.setState({ data: response });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    return <div>{this.props.id}</div>;
  }
}

export default Article;
