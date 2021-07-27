import React from 'react'
import { Avatar } from 'antd'
import { AndroidOutlined } from '@ant-design/icons';

interface isProps {
  content: string
}

class ServerBubble extends React.Component<isProps, any> {
  constructor(props: isProps) {
    super(props)
  }

  render() {
    return (
      <div style={{ display: 'flex', margin: '6px 0' }}>
        <div style={{ float: 'left' }}>
          <Avatar icon={<AndroidOutlined />} />
        </div>
        <div style={{ flex: 1, overflow: 'hidden', marginLeft: '8px', paddingTop: '4px' }}>
          <div style={{ backgroundColor: 'white', maxWidth: '80%', float: 'left', borderRadius: '4px', fontSize: '16px', wordWrap: 'break-word' }}>
            <div style={{lineHeight: '135%'}} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ServerBubble
