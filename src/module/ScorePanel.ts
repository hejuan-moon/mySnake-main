//定义记分牌的类
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 设置一个变量限制等级
    maxLevel: number;
    // 设置一个变量，多少分升一级
    upScore: number;
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel
        this.upScore = upScore

    }
    // 设置一个加分方法
    addScore() {
        // 使分数自增
        // this.score++;
        this.scoreEle.innerHTML = ++this.score + ''  //innerHTML的内容必须是字符串，所以加一个空的字符串
        if (this.score % this.upScore == 0) {
            this.levelUp()
        }
    }
    //升级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }

    }

}

// const scorePanel = new ScorePanel()
// for (let i = 0; i < 200; i++) {
//     scorePanel.addScore()

// }

export default ScorePanel