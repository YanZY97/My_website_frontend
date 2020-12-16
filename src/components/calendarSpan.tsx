import { Calendar } from 'antd';
import React from 'react';
import styles from './styles/calendarSpan.less'

const onPanelChange = (value: any, mode: any) => {
  console.log(value, mode);
}

const CalendarSpan = () => (
  <div className={styles.calendar}>
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>
)

export default CalendarSpan