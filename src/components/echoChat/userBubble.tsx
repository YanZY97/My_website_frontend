import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';

interface isProps {
  content: string
}

class UserBubble extends React.Component<isProps, any> {
  constructor(props: isProps) {
    super(props)
  }

  render() {
    return (
      <div style={{ display: 'flex', margin: '6px 0' }}>
        <div style={{ flex: 1, overflow: 'hidden', marginRight: '8px', paddingTop: '4px' }}>
          <div style={{ padding: '8px 10px 10px', backgroundColor: '#54d100', maxWidth: '80%', float: 'right', borderRadius: '4px', fontSize: '16px', wordWrap: 'break-word' }}>
            <div style={{lineHeight: '135%'}} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <Avatar icon={<UserOutlined />} />
        </div>
      </div>
    )
  }
}

export default UserBubble
