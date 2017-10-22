import React, { Component } from 'react';
import * as R from 'ramda';
import { ipcRenderer } from 'electron';

import styles from './App.css';

export default class App extends Component {
  state = {
    form: {
      ip: '',
      port: '',
      username: '', 
      passwd: '', 
      database: '',
    },
  }

  handleInputChange = R.curry((name, e) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: e.target.value,
      }, 
    });
  })

  handleSubmit = () => {
    ipcRenderer.send('connect', this.state.form);
    ipcRenderer.once('connected', (e, arg) => {
      alert(`成功连接到数据库，数据库中的表有:${arg.join()}`)
    });
  }
  
  render() {
    const createInputConfig = (name, placeholder) => ({
      name,
      placeholder,
      onChange: this.handleInputChange(name),
      value: this.state.form[name], 
    })
    const inputArr = [
      createInputConfig('ip', '地址'),
      createInputConfig('port', '端口'),
      createInputConfig('username', '用户名'),
      createInputConfig('passwd', '密码'),
      createInputConfig('database', '数据库'),
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
