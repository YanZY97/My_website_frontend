import React from 'react';
import MarkdownIt from 'markdown-it';
import ReactMarkdown from 'react-markdown';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import { Button, message } from 'antd';
import { request } from 'umi';

import 'react-markdown-editor-lite/lib/index.css';

interface isProps {
  url?: string;
}

const PLUGINS = undefined;
// const PLUGINS = ['header', 'image', 'full-screen'];

// MdEditor.use(Plugins.AutoResize, {
//   min: 200,
//   max: 800
// });

MdEditor.use(Plugins.TabInsert, {
  tabMapValue: 1, // note that 1 means a '\t' instead of ' '.
});

class MarkdownEditor extends React.Component<isProps, any> {
  mdEditor?: MdEditor = undefined;
  mdParser: MarkdownIt;
  static defaultProps = {
    url: '/api/blog/postblog/',
  };

  constructor(props: isProps) {
    super(props);
    this.renderHTML = this.renderHTML.bind(this);
    // initial a parser
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
    });

    this.state = {
      value: '',
      cls: '',
      tags: '',
    };
  }
  handleEditorChange = (it: { text: string; html: string }, event: any) => {
    // console.log('handleEditorChange', it.text, it.html, event);
    this.setState({
      value: it.text,
    });
  };

  handleImageUpload = (file: File): Promise<string> => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        // @ts-ignore
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  onCustomImageUpload = (event: any): Promise<any> => {
    console.log('onCustomImageUpload', event);
    return new Promise((resolve, reject) => {
      const result = window.prompt('Please enter image url here...') as string;
      resolve({ url: result });
      // custom confirm message pseudo code
      // YourCustomDialog.open(() => {
      //   setTimeout(() => {
      //     // setTimeout 模拟oss异步上传图片
      //     // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
      //     const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'
      //     resolve({url: url, name: 'pic'})
      //   }, 1000)
      // })
    });
  };

  handleGetMdValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getMdValue());
    }
  };

  handleGetHtmlValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getHtmlValue());
    }
  };

  handleSetValue = () => {
    const text = window.prompt('Content');
    this.setState({
      value: text,
    });
  };

  renderHTML(text: string) {
    // return this.mdParser.render(text);
    // Using react-markdown
    return React.createElement(ReactMarkdown, {
      source: text,
    });
  }

  postBlog = async () => {
    await request(this.props.url!, {
      method: 'post',
      headers: {
        Authorization:
          'Bearer ' +
          (localStorage.getItem('access') || sessionStorage.getItem('access')),
      },
      data: {
        data: this.state.value,
        cls: this.state.cls,
        tags: this.state.tags,
      },
    })
      .then(response => {
        message.success(response.data);
      })
      .catch(error => {
        console.log(error);
        message.error('没有操作权限');
      });
  };

  render() {
    return (
      <>
        <MdEditor
          ref={node => (this.mdEditor = node || undefined)}
          value={this.state.value}
          style={{ height: '500px', width: '100%' }}
          renderHTML={this.renderHTML}
          plugins={PLUGINS}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true,
              hideMenu: true,
            },
            table: {
              maxRow: 5,
              maxCol: 6,
            },
            imageUrl: 'https://octodex.github.com/images/minion.png',
            syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
          }}
          onChange={this.handleEditorChange}
          onImageUpload={this.handleImageUpload}
          // onCustomImageUpload={this.onCustomImageUpload}
        />
        <Button type="primary" onClick={this.postBlog}>
          postBlog
        </Button>
      </>
    );
  }
}

export default MarkdownEditor;
