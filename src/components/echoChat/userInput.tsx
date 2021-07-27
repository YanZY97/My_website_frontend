import React from 'react'
import { Button, Input, message } from 'antd'
import { request } from 'umi'

interface isProps {
  addBubble: any
}

interface isState {
  message: string
}

class UserInput extends React.Component<isProps, isState> {
  constructor(props: isProps) {
    super(props)
    this.state = {
      message: ''
    }
  }

  onSend = () => {
    this.props.addBubble('user', this.state.message ? this.state.message : '&nbsp;')
    this.setState({
      message: ''
    })
    request('/api/tools/echochat/', {
      method: 'get',
      params: {'command': this.state.message }
    })
    .then(response => {
      this.props.addBubble('server', response)
    })
    .catch(error => {
      message.error('服务器未响应')
    })
  }

  onMessageChange = (e: any) => {
    this.setState({
      message: e.target.value
    })
  }

  render() {
    return(
      <div style={{ display: 'flex', padding: '8px 4px' }}>
        <div style={{ flex: 1, marginRight: '16px' }}>
          <Input onChange={this.onMessageChange}  onPressEnter={this.onSend} value={this.state.message} />
        </div>
        <div style={{ float: 'right' }}>
          <Button type='primary' onClick={this.onSend}>Send</Button>
        </div>
      </div>
    )
  }
}

export default UserInput
