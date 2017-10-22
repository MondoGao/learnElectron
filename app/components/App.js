import React, { Component } from 'react';
import * as R from 'ramda';

import styles from './App.css';

export default class App extends Component {
  state = {
    ip: '',
    port: '',
    username: '', 
    passwd: '', 
  }

  handleInputChange = R.curry((name, e) => {
    this.setState({
      [name]: e.target.value,
    });
  })

  handleSubmit = () => {
    console.log(this.state);
  }
  
  render() {
    const inputArr = [
      {
        name: 'ip',
        placeholder: '地址',
        onChange: this.handleInputChange('ip'),
      },
      {
        name: 'port', 
        placeholder: '端口', 
        onChange: this.handleInputChange('port'),
      },
      {
        name: 'username', 
        placeholder: '用户名',
        onChange: this.handleInputChange('username'),
      },
      {
        name: 'passwd', 
        placeholder: '密码',
        onChange: this.handleInputChange('passwd'),
      },
    ];

    return (
      <div className={styles.app}>
        <i className="fa fa-connectdevelop" aria-hidden="true"></i>
        <h2>链接到数据库</h2>
        {inputArr.map(input => <Input key={input.name} {...input}/>)}
        <Button onClick={this.handleSubmit}>登录</Button>
      </div>
    );
  }
}

function Input(props) {
  return (
    <input
      type="text"
      className={styles.input}
      {...props}
    /> 
  );
}

function Button(props) {
  return (
    <span 
      className={styles.btn}
      {...props}
    >
      {props.children}
    </span>
  );
}
