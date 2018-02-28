function gameFun(container)
{
    this.container = container;
    this.boxs = new Array(16);
}

gameFun.prototype = {
    initialization: function(){
        for(var i = 0, len = this.boxs.length; i < len; i++){
            var box = this.newBox(0);
            box.setAttribute('index', i);
            this.container.appendChild(box);
            this.boxs[i] = box;
        }
        this.randomBox();
        this.randomBox();
    },
    newBox: function(val){
        var box = document.createElement('div');
        this.setBoxVal(box, val)
        return box;
    },
    setBoxVal: function(box, val){
        box.className = 'box box' + val;
        box.setAttribute('val', val);
        box.innerHTML = val > 0 ? val : '';
    },
    randomBox: function(){
        var zeroBoxs = [];
        for(var i = 0, len = this.boxs.length; i < len; i++){
            if(this.boxs[i].getAttribute('val') == 0){
                zeroBoxs.push(this.boxs[i]);
            }
        }
        var rBox = zeroBoxs[Math.floor(Math.random() * zeroBoxs.length)];
        this.setBoxVal(rBox, Math.random() < 0.8 ? 2 : 4);
    },
    moveBox:function(direction){
        var j;
        /*left arrow	37
        up arrow	38
        right arrow	39
        down arrow	40
        */
        switch(direction){
            case 38:
                for(var i = 4, len = this.boxs.length; i < len; i++){
                    j = i;
                    while(j >= 4){
                        this.mergeBox(this.boxs[j - 4], this.boxs[j]);
                        j -= 4;
                    }
                }
                break;
            case 40:
                for(var i = 11; i >= 0; i--){
                    j = i;
                    while(j <= 11){
                        this.mergeBox(this.boxs[j + 4], this.boxs[j]);
                        j += 4;
                    }
                }
                break;
            case 37:
                for(var i = 1, len = this.boxs.length; i < len; i++){
                    j = i;
                    while(j % 4 != 0){
                        this.mergeBox(this.boxs[j - 1], this.boxs[j]);
                        j -= 1;
                    }
                }
                break;
            case 39:
                for(var i = 14; i >= 0; i--){
                    j = i;
                    while(j % 4 != 3){
                        this.mergeBox(this.boxs[j + 1], this.boxs[j]);
                        j += 1;
                    }
                }
                break;
        }
        this.randomBox();
    },
    mergeBox: function(prevBox, currBox){
        var prevVal = prevBox.getAttribute('val');
        var currVal = currBox.getAttribute('val');
        if(currVal != 0){
            if(prevVal == 0){
                this.setBoxVal(prevBox, currVal);
                this.setBoxVal(currBox, 0);
            }
            else if(prevVal == currVal){
                this.setBoxVal(prevBox, prevVal * 2);
                this.setBoxVal(currBox, 0);
            }
        }
    },
    equalVal: function(box1, box2){
        return box1.getAttribute('val') == box2.getAttribute('val');
    },
    maxVal: function(){
        for(var i = 0, len = this.boxs.length; i < len; i++){
            if(this.boxs[i].getAttribute('val') == 2048){
                return true;
            }
        }
    },
    overNumbers: function(){
        for(var i = 0, len = this.boxs.length; i < len; i++){
            if(this.boxs[i].getAttribute('val') == 0){
                return false;
            }
            if(i % 4 != 3){
                if(this.equalVal(this.boxs[i], this.boxs[i + 1])){
                    return false;
                }
            }
            if(i < 12){
                if(this.equalVal(this.boxs[i], this.boxs[i + 4])){
                    return false;
                }
            }
        }
        return true;
    },
    cleanNumber: function(){
        for(var i = 0, len = this.boxs.length; i < len; i++){
            this.container.removeChild(this.boxs[i]);
        }
        this.boxs = new Array(16);
    }
}

var game, startGame;

window.onload = function(){
    var container = document.getElementById('div2048');
    startGame = document.getElementById('startGame');
    startGame.onclick = function(){
        this.style.display = 'none';
        game = game || new gameFun(container);
        game.initialization();
    }
}

window.onkeydown = function(e){
    var keynum;
    if(window.event){
        keynum = e.keyCode;
    }
    else if(e.which){
        keynum = e.which;
    }

/*left arrow	37
up arrow	38
right arrow	39
down arrow	40
*/
    if([ 37, 38, 39, 40].indexOf(keynum) > -1){
        if(game.overNumbers()){
            game.cleanNumber();
            startGame.style.display = 'block';
            startGame.innerHTML = 'game over, replay?';
            return;
        }
        game.moveBox(keynum);
    }
}
