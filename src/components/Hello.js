// Hello.js
import React, { Component } from "react";

class Hello extends Component {
  // static : props 기본값 설정
  static defaultProps = {
    name: "이름없음",
  };
  // render() 메소드 : 이 안에 렌더링 하고싶은 JSX 반환, 필수요소
  render() {
    // this.props : props 조회
    const { color, name, isSpecial } = this.props;

    return (
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
      </div>
    );
  }
}

// props 기본값 설정
// Hello.defaultProps = {
//   name: "이름없음",
// };

export default Hello;
