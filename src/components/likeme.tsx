import React from 'react';
import globalstyles from './styles/index.less';
import styles from './styles/likeme.less';

interface Props {
  onClick: () => void;
  count: number;
}

interface isState {
  action: number;
}

class LikeMe extends React.Component<Props, isState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      action: 0,
    };
  }

  HandleClick = async (onClick: () => void) => {
    this.setState({ action: 2 });
    await onClick();
    this.animate();
  };

  animate = () => {
    if (this.state.action === 1) {
      this.setState({ action: 0 });
      setTimeout(() => {
        this.setState({ action: 1 });
      }, 10);
    } else {
      this.setState({ action: 1 });
    }
  };

  render() {
    const { onClick } = this.props;
    const actionType: { [key: number]: string } = {
      0: `${styles.heart}`,
      1: `${styles.heart} ${styles.heart1}`,
      2: `${styles.heart} ${styles.heart2}`,
    };

    return (
      <div className={globalstyles.sidetool}>
        <div className={styles.text}>
          <h1 className={styles.font}>Do You Like Me?</h1>
        </div>
        <div
          className={actionType[this.state.action]}
          onClick={() => this.HandleClick(onClick)}
        ></div>
        <div className={styles.text}>
          <h1 className={styles.font} style={{ paddingBottom: '16px' }}>
            {this.props.count}
          </h1>
        </div>
      </div>
    );
  }
}

export default LikeMe;
