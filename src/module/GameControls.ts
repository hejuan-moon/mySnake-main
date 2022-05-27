import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";


// 游戏控制器，控制其他类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel
    // 创建一个属性来存储蛇移动的方向（也就是按键的方向）
    derection: string = '';
    // 创建一个属性记录游戏是否结束
    isLive = true
    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 2)
        this.init()
    }
    //初始化方法，调用后游戏即将开始
    init() {
        // 绑定键盘按下事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))

        // 调用run
        this.run()
    }
    // 创建一个键盘按下响应函数
    keydownHandler(event: KeyboardEvent) {
        // ArrowDown
        // ArrowUp
        // ArrowRight
        // ArrowLeft
        // 需要检查event.key是否合法（是否按了正确的按键）
        this.derection = event.key
    }

    // 创建一个蛇移动的方法
    run() {
        /**根据方向（this.derection）来使蛇移动
         * 向上：top减少
         * 向下：top增加
         * 向左：left减少
         * 向右：left增加
         */
        let X = this.snake.X
        let Y = this.snake.Y
        //根据按键的方向修改x,y值
        switch (this.derection) {
            case "ArrowUp":  //chorme浏览器
            case "Up":   //ie浏览器
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }
        // 检查蛇是否吃到食物
        this.checkEat(X, Y)
        // 修改蛇的x和y值
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e: any) {
            // 异常，游戏结束
            alert(e.message + "GAME OVER !")
            // 将isLive设置成false
            this.isLive = false
        }


        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    // 检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            console.log('吃到食物')
            // 食物的位置要重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore()
            //蛇要增加一节
            this.snake.addBody()
        }
    }

}
export default GameControl