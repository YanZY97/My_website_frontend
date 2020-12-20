import React from 'react';
import globalstyles from './styles/index.less';
import styles from './styles/likeme.less';

interface Props {
  onClick: () => Promise<number>;
  count: number;
}

interface isState {
  action: number;
  countState: number;
}

class LikeMe extends React.Component<Props, isState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      action: 0,
      countState: props.count,
    };
  }

  HandleClick = async (onClick: () => Promise<number>) => {
    this.setState({ action: 2 });
    const count = await onClick();
    this.setState({ countState: count });
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
    const { onClick, count } = this.props;
    const actionType: { [key: number]: string } = {
      0: `${styles.heart}`,
      1: `${styles.heart} ${styles.heart1}`,
      2: `${styles.heart} ${styles.heart2}`,
    };

    return (
      <div className={globalstyles.contact}>
        <div className={styles.text}>
          <h1 className={styles.font}>Do You Like Me?</h1>
        </div>
        <div
          className={actionType[this.state.action]}
          onClick={() => this.HandleClick(onClick)}
        ></div>
        <div className={styles.text}>
          <h1 className={styles.font} style={{ paddingBottom: '16px' }}>
            {this.state.countState}
          </h1>
        </div>
      </div>
    );
  }
}

export default LikeMe;
