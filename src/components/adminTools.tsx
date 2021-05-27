import React, { useState, FC } from 'react';
import { MarkdownEditor } from '@/components/components';
import { Modal, Button, Input, message } from 'antd';
import { request } from 'umi';

const { TextArea } = Input;

const AdminTools: FC<any> = props => {
  const [isPostBlogModalVisible, setIsPostBlogModalVisible] = useState(false);
  const [
    isPostAnnouncementModalVisible,
    setIsPostAnnouncementModalVisible,
  ] = useState(false);
  const [postText, setPostText] = useState('');
  const handleChangePostText = (e: any) => {
    setPostText(e.target.value);
  };

  const showModalPostBlog = () => {
    setIsPostBlogModalVisible(true);
  };

  const handleOkPostModal = () => {
    setIsPostBlogModalVisible(false);
  };

  const handleCancelPostModal = () => {
    setIsPostBlogModalVisible(false);
  };

  const showModalPostAnnouncement = () => {
    setIsPostAnnouncementModalVisible(true);
  };

  const handleOkPostAnnouncementModal = () => {
    setIsPostAnnouncementModalVisible(false);
  };

  const handleCancelPostAnnouncementModal = () => {
    setIsPostAnnouncementModalVisible(false);
  };

  const handlePostAnnouncement = () => {
    request('/api/tools/postannouncement/', {
      method: 'post',
      headers: {
        Authorization:
          'Bearer ' +
          (localStorage.getItem('access') || sessionStorage.getItem('access')),
      },
      data: {
        text: postText,
      },
    })
      .then(response => {
        message.success(response);
        setIsPostAnnouncementModalVisible(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const content = [
    <>
      <div style={{ padding: '12px' }}>
        <Button type="default" onClick={showModalPostBlog}>
          发布文章
        </Button>
        <br />
        <br />
        <br />
        <Button type="default" onClick={showModalPostAnnouncement}>
          发布通知
        </Button>
      </div>
    </>,
  ];

  const modalPostBlog = [
    <Modal
      visible={isPostBlogModalVisible}
      onOk={handleOkPostModal}
      onCancel={handleCancelPostModal}
      footer={null}
      width={1500}
    >
      <MarkdownEditor />
    </Modal>,
  ];

  const modalPostAnnouncement = [
    <Modal
      visible={isPostAnnouncementModalVisible}
      onOk={handleOkPostAnnouncementModal}
      onCancel={handleCancelPostAnnouncementModal}
      footer={null}
    >
      <div>发布通知</div>
      <TextArea rows={4} onChange={handleChangePostText} />
      <br />
      <br />
      <Button type={'primary'} onClick={handlePostAnnouncement}>
        发布
      </Button>
    </Modal>,
  ];
  return (
    <>
      {content}
      {modalPostBlog}
      {modalPostAnnouncement}
    </>
  );
};

export default AdminTools;
