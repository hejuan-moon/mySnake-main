class Snake {
    //表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体,包括蛇头
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div') as HTMLElement  //拿到第一个div
        this.bodies = this.element.getElementsByTagName('div')
    }

    // 获取蛇的坐标（蛇头的坐标）

    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    set X(val: number) {
        //新值和旧值相同，则返回不在修改
        if (this.X === val) {
            return
        }
        // X的值的合法范围0-290之间
        if (val < 0 || val > 290) {
            //说明撞墙了，抛出异常
            throw new Error('蛇撞墙了！')
        }

        // 蛇在向左移动时，不能向左掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
            // console.log('水平方向发生了掉头')
            //如果发生了掉头，让蛇向反方向继续移动
            if (val > this.X) {
                //如果新值val大于旧值X,则说明蛇本来是向左走，但是按了右边，发生掉头，应该继续往左走
                val = this.X - 10
            } else {
                val = this.X + 10
            }
        }


        //移动身体
        this.moveBody()
        this.head.style.left = val + 'px'
        // 检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(val: number) {
        if (this.Y === val) {
            return
        }
        // Y的值的合法范围0-290之间
        if (val < 0 || val > 290) {
            //说明撞墙了，抛出异常
            throw new Error('蛇撞墙了！')
        }
        // 蛇在向上移动时，不能向下 掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
            // console.log('水平方向发生了掉头')
            //如果发生了掉头，让蛇向反方向继续移动
            if (val > this.Y) {
                //如果新值val大于旧值X,则说明蛇在向右走，此时发生掉头，应该使蛇继续往左走
                val = this.Y - 10
            } else {
                val = this.Y + 10
            }
        }
        //移动身体
        this.moveBody()
        this.head.style.top = val + 'px'
        // 检查有没有撞到自己
        this.checkHeadBody()
    }
    //蛇增加身体的方法
    addBody() {
        // 给element添加一个div
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    //蛇身体移动
    moveBody() {

        /**
         * 将后面的身体设置为前面身体的位置
         *  第四节=第三节的位置
         *  第三节=第二节的位置
         *  第二节=第一节的位置
         */
        for (let i = this.bodies.length - 1; i > 0; i--) {
            //获取前面身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            //将这个值设置到当前的身体上

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    checkHeadBody() {
        //获取所有的身体，检查是否和蛇头的坐标重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断，说明蛇撞到了身体，游戏结束
                throw new Error("撞到自己了")
            }
        }
    }
}
export default Snake;