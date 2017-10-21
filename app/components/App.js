import React, { Component } from 'react';

import styles from './App.css';

export default class App extends Component {
  render() {
    const inputArr = [
      {
        placeholder: '地址',
      },
      {
        placeholder: '端口', 
      },
      {
        placeholder: '用户名',
      },
      {
        placeholder: '密码',
      },
    ];

    return (
      <div className={styles.app}>
        <i class="fa fa-connectdevelop" aria-hidden="true"></i>
        <h2>链接到数据库</h2>
        {inputArr.map(input => <Input {...input} className={styles.input}/>)}
        <Button>登录</Button>
      </div>
    );
  }
}

class Input extends Component {
  render() {
    return (
      <input
        type="text"
        {...this.props}
      /> 
    );
  }
}

class Button extends Component {
  render() {
    return (
      <span className={styles.btn}>{this.props.children}</span>
    );
  }
}
