import React from 'react';
import { DatabaseTwoTone } from '@ant-design/icons';

interface Props {
  cls: string;
  size?: number;
  color?: string;
}

class Cls extends React.Component<Props, any> {
  static defaultProps = {
    size: 13,
    color: '#55bd00',
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const iconsize = this.props.size! + 3;
    return (
      <>
        <DatabaseTwoTone
          style={{
            fontSize: iconsize,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
            cursor: 'pointer',
          }}
          twoToneColor={this.props.color}
        />
        &nbsp;
        <span
          style={{
            fontSize: this.props.size,
            fontWeight: 'lighter',
            fontFamily: 'comic-sans-ms',
            cursor: 'pointer',
          }}
        >
          {this.props.cls}
        </span>
      </>
    );
  }
}

export default Cls;
