import React from 'react';
import { CalendarTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;
interface Props {
  time: string;
  size?: number;
  color?: string;
}

class Time extends React.Component<Props, any> {
  static defaultProps = {
    size: 13,
    color: '#0e0aff',
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const iconsize = this.props.size! + 3;
    return (
      <>
        <CalendarTwoTone
          twoToneColor={this.props.color}
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
          <Text>{this.props.time}</Text>
        </span>
      </>
    );
  }
}

export default Time;
