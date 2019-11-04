import React from 'react';
import ChatIcon from '../../assets/images/chat.svg';
import './chat.scss';
class Feedback extends React.Component {
  componentDidMount() {
    (window as any).$(function() {
      // eslint-disable-next-line
      new (window as any).ZammadChat({
        background: '#e6e5e5',
        fontSize: '12px',
        chatId: 1,
        show: false,
        debug: true,
      });
    });
  }
  public render(): JSX.Element {
    return (
      <div className="open-zammad-chat" style={{ position: 'fixed', right: '15px', bottom: '5px', cursor: 'pointer' }}>
        <img src={ChatIcon} alt="chat" style={{ width: '43px', height: '43px' }} />
      </div>
    );
  }
}
export default Feedback;