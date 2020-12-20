import React from 'react';
import globalstyles from './styles/index.less';
import styles from './styles/likeme.less';

interface Props {
  onClick: () => Promise<number>;
  count: number;
}

interface isState {
  action: boolean;
  countState: number;
}

class LikeMe extends React.Component<Props, isState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      action: false,
      countState: props.count,
    };
  }

  HandleClick = async (onClick: () => Promise<number>) => {
    const count = await onClick();
    console.log(count);
    this.setState({ countState: count });
    this.animate();
  };

  animate = () => {
    if (this.state.action) {
      this.setState({ action: false });
      setTimeout(() => {
        this.setState({ action: true });
      }, 10);
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
            {this.state.countState}
          </h1>
        </div>
      </div>
    );
  }
}

export default LikeMe;
