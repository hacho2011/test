var junil = junil || {} ;
(function () {
  // 슬라이드 클래스
  const Slide = class {

    // 생성자
    constructor (ele) {
      this.variableSet(ele)
      this.styleSet()
      this.play()
    }

    // 변수 세팅
    variableSet (ele) {
      this.pos = 0
      this.target = ele.children[0] // .slide ul 선택
      this.len = this.target.children.length // .slide li의 갯수
      this.playTime = parseFloat(ele.dataset.playtime) / 1000 // transition time
      this.setTime = ~~ele.dataset.settime // setInterval 주기, ~~ 연산은 parseInt와 같음
      this.h = ele.clientHeight // 세로 너비
    }

    // 빈 메소드를 구현하여, 자식 Class에서 실행하더라도 오류가 발생하지 않도록 한다.
    styleSet () {}
    playBefore () {}
    playAfter () {}

    // 슬라이드 플레이
    play () {
      setInterval(_ => {
        // 장면 전환 전에 실행 할 구문
        this.playBefore()

        // 장면 선택
        this.pos = (this.pos + 1) % this.len

        // 장면 전환
        this.playAfter()
      }, this.setTime)
    }


    static init () {
      // .slide 의 갯수 만큼 Slide Type에 맞는 Instance를 생성합니다.
      all('.slide').forEach(ele => new slideType[ele.dataset.type](ele))
    }
  }

  // 가로 슬라이드
  const SlideWidth = class extends Slide {
    // extends하여 사용할 경우 항상 부모의 constructor(=super)를 실행해줘야 한다.
    constructor (ele) { super(ele) }
    styleSet () {
      // ul의 가로 너비가 100% * 슬라이드 장면 갯수
      this.target.style.cssText = `width:calc(100% * ${this.len});display:flex;transition:${this.playTime}s`

      // li의 가로 너비가 100% / 슬라이드 장면 갯수 = 슬라이드의 가로 너비
      Array.from(this.target.children).forEach(ele => ele.style.cssText = `width:calc(100% / ${this.len})`)
    }
    playAfter () {
      // 장면 이동
      this.target.style.marginLeft = `${-this.pos * 100}%`
    }
  }

  // 세로 슬라이드
  const SlideHeight = class extends Slide {
    constructor (ele) { super(ele) }
    styleSet () {
      // ul의 세로 너비가 100% * 슬라이드 장면 갯수
      this.target.style.cssText = `height:calc(100% * ${this.len});transition:${this.playTime}s`

      // li의 세로 너비가 100% / 슬라이드 장면 갯수 = 슬라이드의 가로 너비
      Array.from(this.target.children).forEach(ele => ele.style.cssText = `height:calc(100% / ${this.len})`)
    }
    playAfter () {
      // 장면 이동
      this.target.style.marginTop = `${-this.pos * this.h}px`
    }
  }

  // 페이드 슬라이드
  const SlideFade = class extends Slide {
    constructor (ele) { super(ele) }
    styleSet () {
      this.target.style.cssText = `position:relative;`
      const liStyle = `position:absolute;left:0;right:0;top:0;bottom:0;transition:${this.playTime}s;opacity:0;`
      Array.from(this.target.children).forEach(ele => ele.style.cssText = liStyle)
      this.target.children[0].style.opacity = 1
    }
    playBefore () { this.target.children[this.pos].style.opacity = 0 }
    playAfter () { this.target.children[this.pos].style.opacity = 1 }
  }

  // 슬라이드 타임 마다 실행할 클래스 목록
  const slideType = { SlideWidth, SlideHeight, SlideFade }

  // export 합니다.
  junil.Slide = Slide
})();