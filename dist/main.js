var l = Object.defineProperty;
var a = (n, t, e) => t in n ? l(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => (a(n, typeof t != "symbol" ? t + "" : t, e), e);
class c {
  constructor(t, e) {
    o(this, "text");
    o(this, "onClick");
    this.text = t, this.onClick = e;
  }
  render() {
    const t = document.createElement("button");
    return t.innerHTML = this.text, t.onclick = this.onClick, t.className = "custom-button", t;
  }
}
const h = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" viewBox="0 0 256 256"><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></svg>
`;
class u {
  constructor(t) {
    o(this, "player");
    o(this, "button");
    o(this, "options");
    this.player = {}, this.button = new c(h, () => {
      this.play();
    }), this.options = t;
  }
  init(t, e) {
    const i = document.getElementById(t);
    if (!i)
      return;
    const { width: s, height: r } = this.options;
    i.innerHTML = `
			<div>
				<video id=${t} width="${s}" height="${r}" preload="auto" playsinline webkit-playsinline></video>
			</div>
		`, this.player = e(t, this.options), this.appendButton();
  }
  play() {
    this.player.play();
  }
  getPercentageOfVideo() {
    return (this.player.currentTime() / this.player.duration() * 100).toFixed(2);
  }
  on(t, e) {
    this.player.on(t, e);
  }
  appendButton() {
    const t = document.querySelector(".vjs-button-icon");
    if (t) {
      const e = t.querySelector("svg");
      e && t.removeChild(e), t.appendChild(this.button.render());
    }
  }
}
export {
  u as VideoPlayer
};
