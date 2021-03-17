import React, { useState, FC } from 'react';
import globalstyles from './styles/index.less';
import { MarkdownEditor } from '@/components/components';
import { Modal, Button } from 'antd';

interface Props {
  isAdmin: boolean;
}

const AdminTools: FC<Props> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const content = [
    <div className={globalstyles.sidetool}>
      <div style={{ padding: '12px' }}>
        <Button type="ghost" onClick={showModal}>
          发布文章
        </Button>
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={1500}
        >
          <MarkdownEditor />
        </Modal>
      </div>
    </div>,
  ];

  const empty = [<></>];
  return <>{props.isAdmin ? content : empty}</>;
};

export default AdminTools;
