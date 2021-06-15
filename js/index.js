//game constants and variable
let inputDir={x:0,y:0};
const eat=new Audio('eat.mp3');
const gameover=new Audio('game_over.wav');
const move=new Audio('changedirec.wav');
const bgmusic=new Audio('main_theme.mp3');
let speed=5;
let lastPaintTime=0;
let snakearr=[{x:10,y:10}];
let food={x:13,y:15};
let score=0;
//functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000< (1/speed))
    {
    return;}
    lastPaintTime=ctime;
    gameEngine();
    //console.log(ctime);
}
function isCollide(sarr){
     //if you bump into yourself
     for(let i=1;i<sarr.length;i++)
     {
         if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y )
         return true;
     }
     //if you bump into wall
     if(sarr[0].x>=19||sarr[0].x<=0||sarr[0].y>=17||sarr[0].y<=0)
     return true;
}
function gameEngine()
{
    //part 1:updating snake array and food
    if(isCollide(snakearr))
    {
        gameover.play();
        bgmusic.pause();
        speed=5;
        inputDir={x:0,y:0};
        alert("Game Over,Press ok to play again");
        snakearr=[{x:10,y:10}];
        bgmusic.play();
        score=0;

    }
    //if snake eats the food, increment the score and regenerate the food
    if(snakearr[0].y==food.y && snakearr[0].x==food.x)
    {
        eat.play();
        score+=1;
        if(score%4==0)
          speed+=3;
        if(score>highscoreval)
        {
            highscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(highscoreval))
            hiscorebx.innerHTML="High Score:"+highscoreval;
        }

        scorebx.innerHTML="Score: "+score;
    snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y});
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    //moving the body
    for(let i=snakearr.length-2;i>=0;i--)
    {
        snakearr[i+1]={...snakearr[i]};//solving the problem of referencing
    }
    snakearr[0].x+=inputDir.x;
    snakearr[0].y+=inputDir.y;
    //part 2:display the snake and food
    //display the snake
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else
          snakeElement.classList.add('snake');

        board.appendChild(snakeElement);
     });
     //display the food
     snakearr.forEach((e,index)=>{
      foodElement=document.createElement('div');
      foodElement.style.gridRowStart=food.y;
      foodElement.style.gridColumnStart=food.x;
      foodElement.classList.add('food');
        board.appendChild(foodElement);
     });
   
}
bgmusic.play();
//main logic
let hscore=localStorage.getItem('hiscorebx');
if(hscore==null)
{
    highscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(hscore);
    hiscorebx.innerHTML="High Score:"+hscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    move.play();
    switch(e.key){
        case "ArrowUp":console.log("Arrow up");
                       inputDir.x=0;
                       inputDir.y=-1;
                break;
        case "ArrowDown":console.log("Arrow down");
                         inputDir.x=0;
                         inputDir.y=1;

                break;
        case "ArrowLeft":console.log("Arrow left");
                          inputDir.x=-1;
                          inputDir.y=0;
        

                break;
        case "ArrowRight":console.log("Array right");
                          inputDir.x=1;
                          inputDir.y=0;

               break;
        default:break;

    }
});