const userBtns=[...document.querySelectorAll('.user-btn')];
const userScore=document.querySelector('.user-score span');
const compScore=document.querySelector('.computer-score span')
;
const mainDisplay=document.querySelector('.display-content-text');
const roundDisplay=document.querySelector('.round-content');
const restartBtn=document.querySelector('.fa-undo');
let userPts=0;
let computerPts=0;
let roundNum=0;
let userIcon='';
let compIcon='';
window.addEventListener('DOMContentLoaded',(e)=>{
    restartBtn.addEventListener('click',e=>{
        resetGame();
    });
    userBtns.forEach(userBtn=>{
            userBtn.addEventListener('click',(e)=>{
                if(true){
                    mainDisplay.textContent="";
                    let value=e.target.getAttribute('value');
                    let userSelection=valueToAction(parseInt(value));
                    let computerSelection=computerPlay();
                    userIcon=document.querySelector(`.user-${userSelection}`);
                    compIcon=document.querySelector(`.comp-${computerSelection}`);
                    userIcon.style.animationName='right-transition';
                    compIcon.style.animationName='left-transition'; 
                    
                    let roundWinner=playRound(userSelection,computerSelection);
                    console.log(`user: ${userSelection}---computer: ${computerSelection}---${roundWinner} wins.`);
                    
                    let roundMsg;
                    if(roundWinner=='user'){
                        userPts++;
                        userScore.textContent=userPts;
                        
                        roundMsg=`Round ${roundNum+1}: User wins`;
                    }else if(roundWinner=='computer'){
                        computerPts++;
                        compScore.textContent=computerPts;
                        roundMsg=`Round ${roundNum+1}: Computer wins`;
                    }else{
                        roundMsg=`Round ${roundNum+1}: draw`;
                    }
                    compIcon.addEventListener('animationend',()=>{
                        userIcon.style.animationName='';
                        compIcon.style.animationName=''; 
                        mainDisplay.textContent=roundMsg;
                    });
                   
                    roundNum++;
                    if(roundNum>=5){
                        gameEnd();
                    }
                }
            });
    })
})
function gameEnd(){
    userBtns.forEach(userBtn=>{
        userBtn.disabled=true;
    });
    if(userPts===computerPts){
        roundDisplay.textContent='IT IS A DRAW GAME';
    }else if(userPts<computerPts){
        roundDisplay.textContent='COMPUTER WINS GAME';
    }else{
        roundDisplay.textContent='USER WINS GAME';
    }
}
function resetGame(){
    userBtns.forEach(userBtn=>{
        userBtn.disabled=false;
    });
    roundNum=0;
    userPts=0;
    computerPts=0;
    userScore.textContent=userPts;
    compScore.textContent=computerPts;
    roundDisplay.textContent="";
    mainDisplay.textContent="";
}
function playRound(userSelection, computerSelection){
    if(userSelection===computerSelection){
        return 'draw';
    }else if((userSelection==='rock'&&computerSelection==='scissors')||(userSelection==='paper'&&computerSelection==='rock')||(userSelection==='scissors'&&computerSelection==='paper')){
        return 'user';
    }else{
        return 'computer';
    }
}
function valueToAction(value){
    switch(value){
        case 0:
            return 'rock';
            break;
        case 1:
            return 'paper';
            break;
        default:
            return 'scissors';
            break;
    };
};

function computerPlay(){
    let computerValue=Math.floor(Math.random()*3);
    return valueToAction(computerValue);
}