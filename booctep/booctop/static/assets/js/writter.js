const player = new Plyr('#player');
        
        
/* HomePage writter */

class Typewritter {
  constructor({ text, time = 300 }) {
    this.texts = text.split(",");
    this.sT = document.querySelector(".secondary__title");
    this.realTime = time;
    this.wait = time + 1000;
    this.changeTime = 0;
    this.length = this.texts.length;
    this.countChar = 0;
    this.current = 0;
    this.flag = false;

    this.cutText();
  }

  cutText() {
    const text = this.texts[this.current];
    const tLength = this.texts[this.current].length;
    
    if (this.countChar === tLength) this.changeTime = this.wait;
    if (this.flag && this.countChar === tLength - 1)
      this.changeTime = this.realTime / 2;
    if (this.countChar === 0) this.changeTime = this.realTime;

    this.drawText(text.substr(0, this.countChar));

    if (!this.flag) {
      this.countChar++;
      if (this.countChar === tLength) {
        this.flag = true;
      }
    } else if (this.flag) {
      this.countChar--;
      if (this.countChar === 0) {
        this.flag = false;
        this.current = ++this.current % this.length;
      }
    }

    setTimeout(() => this.cutText(), this.changeTime);
  }

  drawText(chars) {
    this.sT.innerHTML = chars;
  }
}

new Typewritter({
  text: "Development,Mathmatics,Arts,Aviation,Business", // Set words separate with commas in this property
  time: 100 // Set speed of writing
});

