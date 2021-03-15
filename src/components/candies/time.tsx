import React from 'react';
import { CalendarTwoTone } from '@ant-design/icons';

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
          {this.props.time}
        </span>
      </>
    );
  }
}

export default Time;
