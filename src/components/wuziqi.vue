<template>
    <div class='back'>
        <div class='item'><span>Action:{{actioning}}</span><span>AI:{{AI|toChinese}}</span><span>debug:{{debug|toChinese}}</span></div>
        <div id="chess" ref='chess'>
            <template v-for='(items,ix) in grid'>
                <div v-for='(item,iy) in items' class='grid' @click='action(item,ix,iy)' :style='{left:(7 + ix * 50) + "px",top:(7 + iy * 50) + "px",backgroundImage:"url("+require("../assets/"+ item.value +".png") + ")"}'>
                    <template v-if='debug'>{{item.text}}</template>
                </div>
            </template>
        </div>
        <div class='item'>
            <button class='btn' @click='AI = !AI'>开启/关闭AI</button>
            <button class='btn' @click='debug = !debug'>开启/关闭调试</button>
            <button class='btn' @click='init'>重新开始</button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            grid:[],//二维数组，记录棋盘点是否有棋子，什么棋子
            chessWidth:15,
            count:0,//棋盘上棋子数 可以根据棋子数 判断当前该落子的是黑还是白
            lock:false,//点击时间锁
            AI:true,
            debug:false,
            actioning:'黑子'
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.grid = [];
            this.count = 0;
            this.lock = false;
            for (let i = 0; i < this.chessWidth; i++) {
                this.grid[i] = [];
                for (let j = 0; j < this.chessWidth; j++) {
                    this.grid[i][j] = { x: i, y: j, value: 0 };
                }
            }
        },
        checkFinish () {
            for(let i = 0; i < this.grid.length;i++){
                for(let j = 0; j < this.grid[i].length; j++){
                    if(this.grid[i][j].value == 0){
                        continue;
                    }
                    let result = this.checkLine(i,j);
                    if(result > 0) return result
                }
            }
            return 0
        },
        checkLine (x,y){
            let result1 = 3, result2 = 3, result3 = 3, result4 = 3;
            for(let i = 0; i< 5;i ++){
                //按位与 横向 纵向 斜上 斜下
                result1 &= y + i >= this.chessWidth ? 0 : this.grid[x][y + i].value;
                result2 &= x + i >= this.chessWidth ? 0 : this.grid[x + i][y].value;
                result3 &= x + i >= this.chessWidth || y - i < 0 ? 0 : this.grid[x + i][y - i].value;
                result4 &= x + i >= this.chessWidth || y + i >= this.chessWidth ? 0 : this.grid[x + i][y + i].value;
            }
            //按位或
            return result1 | result2 | result3 | result4;
        },
        action (i,x,y) {
            if (i.value > 0 || this.lock) {
                return
            }
            this.lock = true;
            i.value = this.count % 2 + 1;
            this.actioning = this.count % 2 == 0 ? '白子' : '黑子'
            let temp  = this.grid[x]
            temp[y] = i;
            this.grid.splice(x,1,temp)
            this.count ++;
            let result = this.checkFinish();
            if (result == 0) { //没结束
                if (this.AI && this.count % 2 == 1) {
                    //判断是否有AI
                    this.lock = false;
                    this.aiAction();
                }
                this.lock = false;
            } else {
                setTimeout(() => {
                    alert(result == 1 ? '黑棋胜' : '白棋胜')
                }, 200);
            }
        },
        //AI部分
        analysisScore(arr) {
            let greater3 = 0;
            let greater2 = 0; 
            let greater1 =0;
            let equal3 = 0;
            let equal2 = 0;
            let equal1 = 0;
            for (let i = 0; i< arr.length;i++){
                if(arr[i] >= 4){
                    return 100;
                }
                if(arr[i] > 3){
                    greater3 ++
                }else if(arr[i] == 3){
                    equal3++
                }else if(arr[i] > 2){
                    greater2 ++
                }else if(arr[i] ==2){
                    equal2 ++
                }else if(arr[i] > 1){
                    greater1 ++
                }else if(arr[i] == 1){
                    equal1 ++
                }
            }
            if(greater3 + equal3 > 1) return 95 //双四
            if(greater3 > 0) return 90 //活四
            if(equal3 > 0 && greater2 > 0) return 85 //四三 下一手上活四
            if(greater2 > 1) return 80 //双三
            if(equal3 > 0) return 60 //冲四
            if(greater2 > 0 && equal2 > 0) return 50 //活三 + 眠三
            if(greater2 > 0 && greater1 > 0) return 30 //活三,可继续连招
            if(greater2 > 0) return 25 //活三
            if(greater1 > 1) return 20 //活二
            if (greater1 > 0) return 15 //活二
            if (equal2 > 1) return 10 //多眠三
            if (equal2 > 0) return 5 //眠三
            if (equal1 > 1) return -1 //绝地
            if (equal2 > 0) return 1 //勉强连着
            return 0
        },
        getRealScore (leftRow,leftCol,rightRow,rightCol,val) {
            if (leftRow < 0 || leftRow > 14 || leftCol < 0 || leftCol > 14 || rightRow < 0 || rightRow > 14 || rightCol < 0 || rightCol > 14) {
                return false;
            }
            if ((this.grid[leftRow][leftCol].value == 0 || this.grid[leftRow][leftCol].value == val) && (this.grid[rightRow][rightCol].value == 0 || this.grid[rightRow][rightCol].value == val)) {
                return true;
            } else {
                return false;
            }
        },
        getScore (arr,val) {
            let result = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].value == 0) {
                    continue;
                } else if (arr[i].value == val) {
                    result += 1;
                } else {
                    return 0;
                }
            }
            return result;
        },
        analysisObliUpLine (row, col, val) {//斜上方向分析
            var maxScore = 0;
            for (var i = 0; i < 5; i++) {
                if (row + 4 - i > 14 || row + 4 - i < 4 || col - 4 + i < 0 || col - 4 + i > 10) {
                    continue;
                }
                var arr = [];
                for (var j = 0; j < 5; j++) {
                    arr.push(this.grid[row + 4 - i - j][col - 4 + i + j]);
                }
                var score = this.getScore(arr, val);
                var realPower = this.getRealScore(row + 5 - i, col - 5 + i, row - i + 1, col + i + 1, val);
                var total = score * (realPower ? 1.1 : 1);
                maxScore = maxScore > total ? maxScore : total;
            }
            return maxScore;
        },
        analysisObliDownLine (row, col, val) {//斜下方向分析
            let maxScore = 0;
            for (var i = 0; i < 5; i++) {
                if (row - i + 4 > 14 || row - i < 0 || col - i + 4 > 14 || col - i < 0) {
                    continue;
                }
                var arr = [];
                for (var j = 0; j < 5; j++) {
                    arr.push(this.grid[row - i + j][col - i + j]);
                }
                var score = this.getScore(arr, val);
                var realPower = this.getRealScore(row - i - 1, col - i - 1, row + 5 - i, col + 5 - i, val);
                var total = score * (realPower ? 1.1 : 1);
                maxScore = maxScore > total ? maxScore : total;
            }
            return maxScore;
        },
        analysisColLine (row, col, val) {//纵向分析
            let maxScore = 0;
            for (var i = 0; i < 5; i++) {
                if (row - i + 4 > 14 || row - i < 0) {
                    continue;
                }
                var arr = [];
                for (var j = 0; j < 5; j++) {
                    arr.push(this.grid[row - i + j][col]);
                }
                var score = this.getScore(arr, val);
                var realPower = this.getRealScore(row - i - 1, col, row - i + 5, col, val);
                var total = score * (realPower ? 1.1 : 1);
                maxScore = maxScore > total ? maxScore : total;
            }
            return maxScore;
        },
        analysisRowLine (row, col, val) {//横向分析
            var maxScore = 0;
            for (var i = 0; i < 5; i++) {
                if (col - i + 4 > 14 || col - i < 0) {
                    continue;
                }
                var arr = [];
                for (var j = 0; j < 5; j++) {
                    arr.push(this.grid[row][col - i + j]);
                }
                var score = this.getScore(arr, val);
                var realPower = this.getRealScore(row, col - 1 - i, row, col + 5 - i, val);
                var total = score * (realPower ? 1.1 : 1);
                maxScore = maxScore > total ? maxScore : total;
            }
            return maxScore;
        },
        analysisAttackPoint (x,y) {
             if (this.grid[x][y].value > 0) {
                return 0;
            }
            var score1 = this.analysisRowLine(x, y, 2);
            var score2 = this.analysisColLine(x, y, 2);
            var score3 = this.analysisObliUpLine(x, y, 2);
            var score4 = this.analysisObliDownLine(x, y, 2);
            var totalScore = this.analysisScore([score1, score2, score3, score4]);
            return totalScore;
        },
        analysisDefensePoint(x,y){
             if (this.grid[x][y].value > 0) {
                return 0;
            }
            var score1 = this.analysisRowLine(x, y, 1);
            var score2 = this.analysisColLine(x, y, 1);
            var score3 = this.analysisObliUpLine(x, y, 1);
            var score4 = this.analysisObliDownLine(x, y, 1);
            var totalScore = this.analysisScore([score1, score2, score3, score4]);
            return totalScore;
        },
        analysisPowerScore (x,y) {
            var attackPower = 0;
            var defensePower = 0;
            var power = new Array(8);
            power[0] = x - 1 < 0 || y - 1 < 0 ? 0 : this.grid[x - 1][y - 1].value;
            power[1] = x - 1 < 0 ? 0 : this.grid[x - 1][y].value;
            power[2] = x - 1 < 0 || y + 1 > 14 ? 0 : this.grid[x - 1][y + 1].value;
            power[3] = y - 1 < 0 ? 0 : this.grid[x][y - 1].value;
            power[4] = y + 1 > 14 ? 0 : this.grid[x][y + 1].value;
            power[5] = x + 1 > 14 || y - 1 < 0 ? 0 : this.grid[x + 1][y - 1].value;
            power[6] = x + 1 > 14 ? 0 : this.grid[x + 1][y].value;
            power[7] = x + 1 > 14 || y + 1 > 14 ? 0 : this.grid[x + 1][y + 1].value;
            for (var i = 0; i < power.length; i++) {
                if (power[i] == 1) {
                    defensePower += 1;
                } else if (power[i] == 2) {
                    attackPower += 1;
                }
            }
            return [attackPower, defensePower];
        },
        compareScore (originType, originScore, originPower, nowType, nowScore, nowPower) {
            if (originScore > nowScore) {
                return true;
            }
            if (originScore == nowScore && originPower > nowPower) {
                return true;
            }
            if (originScore == nowScore && originPower == nowPower && originType == 1) {
                return true;
            }
            return false;
        },
        aiAction () {
            let _this = this
            var bestGrid = null;
            var maxAttackScore = 0;
            var maxDefenseScore = 0;
            var maxAttackPowerScore = 0;
            var maxDefensePowerScore = 0;
            for (var i = 0; i < this.grid.length; i++) {
                for (var j = 0; j < this.grid[i].length; j++) {
                    var attackScore = this.analysisAttackPoint(i, j);
                    var defenseScore = this.analysisDefensePoint(i, j);
                    var powerScore = this.analysisPowerScore(i, j);
                    var attackPowerScore = powerScore[0];
                    var defensePowerScore = powerScore[1];
                    if (this.debug) {
                        this.grid[i][j].text = "" + defenseScore;
                    }
                    var needChange = false;
                    var attVsAtt = this.compareScore(1, attackScore, attackPowerScore, 1, maxAttackScore, maxAttackPowerScore);
                    var attVsDef = this.compareScore(1, attackScore, attackPowerScore, 2, maxDefenseScore, maxDefensePowerScore);
                    if (attVsAtt && attVsDef) {
                        needChange = true;
                    }
                    var defVsAtt = this.compareScore(2, defenseScore, defensePowerScore, 1, maxAttackScore, maxAttackPowerScore);
                    var defVsDef = this.compareScore(2, defenseScore, defensePowerScore, 2, maxDefenseScore, maxDefensePowerScore);
                    if (defVsAtt && defVsDef) {
                        needChange = true;
                    }
                    if (needChange) {
                        bestGrid = this.grid[i][j];
                        maxAttackScore = attackScore;
                        maxAttackPowerScore = attackPowerScore;
                        maxDefenseScore = defenseScore;
                        maxDefensePowerScore = defensePowerScore
                    }
                }
            }
            if (bestGrid == null) {
                for (var i = 0; i < this.grid.length; i++) {
                    for (var j = 0; j < this.grid[i].length; j++) {
                        if (this.grid[i][j].value == 0) {
                            bestGrid = this.grid[i][j];
                            break;
                        }
                    }
                }
            }
            if (bestGrid == null) {
                alert("平局了");
            }
            setTimeout(function () {
                _this.action(bestGrid, bestGrid.x, bestGrid.y);
            }, 20);
        }
    },
    filters:{
        toChinese (v) {
            return v == true ? '已开启' : '未开启'
        }
    }
}
</script>
<style scoped>
    .item{
        text-align: center;
        margin-top: 15px;
    }
    .item span {margin-left: 15px;}
    .btn{
        outline: none;
        background-color: #f66;
        display: inline-block;
        border-radius: 5px;
        padding: 10px 50px;
        color: #fff;
        border:none;
        margin-left: 15px;
        cursor: pointer;
    }
    #chess {
    position: relative;
    width: 762px;
    height: 762px;
    margin: 20px auto 0px auto;
    background-image: url("../assets/timg.jpg");
    background-size: 100% 100%;
    cursor: pointer;
}
.grid {
    width: 50px;
    height: 50px;
    position: absolute;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 25px;
    background-origin: content-box;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    line-height: 50px;
    text-align: center;
    color: aqua;
}
</style>