import React from 'react';
import { TagsTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';

interface Props {
  tags: Array<string>;
  size?: number;
  color?: string;
}

class Tags extends React.Component<Props, any> {
  static defaultProps = {
    size: 13,
    color: '#e80285',
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { tags } = this.props;
    const iconsize = this.props.size! + 3;
    const taglist = [];
    for (let i = 0; i < tags!.length; i++) {
      taglist.push(
        <Tag
          color="magenta"
          style={{
            cursor: 'pointer',
            fontSize: this.props.size,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
          }}
        >
          {tags![i]}
        </Tag>,
      );
    }
    return (
      <>
        <TagsTwoTone
          style={{
            cursor: 'pointer',
            fontSize: iconsize,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
          }}
          twoToneColor={this.props.color}
        />
        &nbsp;
        {taglist}
      </>
    );
  }
}

export default Tags;
