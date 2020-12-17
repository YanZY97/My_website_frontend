import React from 'react';
import globalstyles from './styles/index.less';
import styles from './styles/likeme.less';
import heartImg from '../assets/imgs/heart.png';

interface Props {
  onClick: () => void;
  count: number;
}

interface isState {
  action: boolean;
}

class LikeMe extends React.Component<Props, isState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      action: false,
    };
  }

  HandleClick = (onClick: () => void) => {
    onClick();
    this.animate();
  };

  animate = () => {
    if (this.state.action) {
      this.setState({ action: false });
    } else {
      this.setState({ action: true });
    }
  };

  render() {
    const { onClick, count } = this.props;

    return (
      <div className={globalstyles.contact}>
        <div className={styles.text}>
          <h1 className={styles.font}>Do You Like Me?</h1>
        </div>
        <div
          className={`${styles.heart} ${
            this.state.action ? styles.heart1 : null
          }`}
          onClick={() => this.HandleClick(onClick)}
        ></div>
        <div className={styles.text}>
          <h1 className={styles.font} style={{ paddingBottom: '16px' }}>
            {count}
          </h1>
        </div>
      </div>
    );
  }
}

export default LikeMe;
