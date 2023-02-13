// Counter.js

import React, { Component } from "react";

class Counter extends Component {
  // 이벤트 등록시 메서드와 컴포넌트 인스턴스 관계 끊어지는 현상 막기
  // 1. 클래스의 생성자 메서드 constructor 에서 bind 작업
  // bind : 해당 함수에서 가리킬 this를 직접 설정
  // constructor : props 파라미터를 받아옴
  // super(props) : 파라미터 호출
  // 이 클래스(Counter)가 컴포넌트로서 작동할 수 있도록 해주는 Component API쪽에 구현되어 있는 생성자함수를 먼저 실행해주고, 우리가 할 작업을 하겠다 라는 의미
  // 무슨 말인지..

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     counter: 0,
  //     fixed: 1,
  //   };
  //   this.handleIncrease = this.handleIncrease.bind(this);
  //   this.handleDecrease = this.handleDecrease.bind(this);
  // }
  // handleIncrease() {
  //   this.setState({
  //     counter: this.state.counter + 1,
  //   });
  // }
  // handleDecrease() {
  //   this.setState({
  //     counter: this.state.counter - 1,
  //   });
  // }

  // 2. 화살표 함수를 사용해 메서드 구현
  // 클래스에 특정 속성을 선언할 수 있게 해주는 class-properties 라는 문법을 사용해야 함(javascript 공식문법은 아님)
  // 보통 CRA로 만든 프로젝트에서 커스텀메서드를 만들 때 이 방법을 사용함
  state = {
    counter: 0,
    fixed: 1,
  };
  handleIncrease = () => {
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
  };
  handleDecrease = () => {
    this.setState((state) => ({
      counter: state.counter - 1,
    }));
  };

  // 3. onClick에서 새로운 함수를 만들어서 전달하는 방법
  // 추천하는 방법은 아님 (렌더링 할 때마다 함수가 새로 만들어지기 때문에 나중에 컴포넌트 최적화 할 때 까다로워짐)
  render() {
    return (
      <div>
        <h2>{this.state.counter}</h2>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
        {/* <button onClick={() => {this.handleIncrease();}}>+1</button>
        <button onClick={() => {this.handleDecrease();}}>-1</button> */}
        <p>고정된 값 : {this.state.fixed}</p>
      </div>
    );
  }
}

export default Counter;
