// 定义食物类
class Food {
    // 定义一个属性表示食物对应的元素
    element: HTMLElement;
    constructor() {
        // 获取页面中的food元素，并将其赋值给element
        //解释下为啥后面要加个！，因为ts语法检查到food这个div不一定存在，
        // 需要我们判断是否存在再去赋值，但是我们fooddiv已经写在文件里面了，
        // 所以我们确定他一定存在，所以我们加个！表示，确定存在的意思
        this.element = document.getElementById('food')!;
    }
    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }
    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }
    // 修改食物的位置方法
    change() {
        // 生成一个随机的位置
        // 食物的位置最小0，最大是290
        // 蛇移动一次一格，一格大小是10，所以坐标为整10
        let left = Math.round(Math.random() * 29) * 10
        let top = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }

}
export default Food