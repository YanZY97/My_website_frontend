import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import { Button, message } from 'antd';
import { request } from 'umi';
import hljs from 'highlight.js';
import PostBlog from './plugins/postBlog';

import 'react-markdown-editor-lite/lib/index.css';
import 'highlight.js/styles/atom-one-light.css';
// import 'highlight.js/styles/github.css'

interface isProps {
  url?: string;
}

MdEditor.use(Plugins.TabInsert, {
  tabMapValue: 1, // note that 1 means a '\t' instead of ' '.
});
MdEditor.use(PostBlog, {
  url: '/api/blog/postblog/',
});
MdEditor.unuse(Plugins.FullScreen);

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
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return ''; // use external default escaping
      },
    })
      .use(require('markdown-it-emoji'))
      .use(require('markdown-it-sub'))
      .use(require('markdown-it-sup'))
      .use(require('markdown-it-footnote'))
      .use(require('markdown-it-deflist'))
      .use(require('markdown-it-abbr'))
      .use(require('markdown-it-ins'))
      .use(require('markdown-it-mark'))
      .use(require('markdown-it-task-lists'))
      .use(require('markdown-it-container'));

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
    return this.mdParser.render(text);
  }

  render() {
    return (
      <>
        <MdEditor
          ref={node => (this.mdEditor = node || undefined)}
          value={this.state.value}
          style={{ height: '500px', width: '100%' }}
          renderHTML={this.renderHTML}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
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
        />
      </>
    );
  }
}

export default MarkdownEditor;
