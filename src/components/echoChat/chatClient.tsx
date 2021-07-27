import React from 'react'
import UserInput from './userInput'
import UserBubble from './userBubble'
import ServerBubble from './serverBubble'
import styles from './chatClient.less'

interface isState {
  bubbles: Array<{[key: string]: string}>
}

class ChatClient extends React.Component<React.HTMLAttributes<HTMLDivElement>, isState> {
  constructor(props: React.HTMLAttributes<HTMLDivElement>) {
    super(props)
    this.state = {
      bubbles: []
    }
  }

  // 添加bubble
  addBubble = (from: 'user' | 'server',content: string) => {
    this.setState({
      bubbles: this.state.bubbles.concat({'from': from, 'content': content})
    })
    let endRef = document.getElementById("endRef");
    endRef?.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div className={styles.box} style={this.props.style}>
        {/* chat history box */}
        <div id='chatbox' style={{ flex: 1, padding: '16px', overflow: 'auto', backgroundColor: '#eee'}}>
          {
            this.state.bubbles.map(bubble => {
              return bubble.from === 'server' ? <ServerBubble content={bubble.content}/> : <UserBubble content={bubble.content}/>
            })
          }
          <div id="endRef" />
        </div>

        {/* user command box */}
        <div>
          <UserInput addBubble={this.addBubble}/>
        </div>
      </div>
    )
  }
}

export default ChatClient
