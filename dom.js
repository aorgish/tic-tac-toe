window.onload = function() {
   
    var btns = ['#human-first', '#human-second'].map(querySelector); 
    var cells = ['#c0','#c1','#c2','#c3','#c4','#c5','#c6','#c7','#c8'].map(querySelector);
    var board = querySelector('#ticTacToe');
    var handCss = ['player-x', 'player-o'];
    var gameResultDiv = querySelector('.result-text');
    var humanHand;
    
    function querySelector(sel) {
        return document.querySelector(sel);
    } 
      
    function setElementState(el, className, onclick) {
        el.className = className;
        el.onclick = onclick;
    }  
      
    function init() {
        board.className = '';
        
        setElementState(btns[0], '', startFirstHand);
        setElementState(btns[1], '', startSecondHand);
        
        cells.forEach(function(x,ind) {  x.onclick = null;  });
    }
    
    function startFirstHand() {
        startGame(0, 'human-first','active','inactive');
    }
    
    function startSecondHand() {
        startGame(1, 'human-second','inactive','active');
        botMove();
    }
    
    function startGame(hand, boardClass, btn1Class, btn2Class) {
        board.className = boardClass;
        humanHand = hand;
        
        setElementState(btns[0], btn1Class, null);
        setElementState(btns[1], btn2Class, null);
        
        cells.forEach(function(x,ind) {
           setElementState(x, 'empty', null);
           x.onclick = function() { humanMove(ind); } 
        });

        showResultText('');
        
        ticTacToeEngine.initBoard(hand+1);
    } 
    
    function humanMove(ind) {
        setElementState(cells[ind], handCss[humanHand], null);
        ticTacToeEngine.setHumanMove(ind);
        botMove();
    }
    
    function botMove() {
        var cell = ticTacToeEngine.getBotMove();
        setElementState(cells[cell], handCss[humanHand ^ 1], null);
        checkStatus();
    }
    
    function checkStatus() {
        [
            function() {},
            function() { gameOver('DRAW'); },
            function() { gameOver('X WINS'); },
            function() { gameOver('O WINS'); },
        ][
            ticTacToeEngine.getStatus()
        ]();
    }
        
    function gameOver(message) {
	init();
        showResultText(message);
    }
    
    function showResultText(message) {
        gameResultDiv.innerText = message;
    }
    
    init();
}
