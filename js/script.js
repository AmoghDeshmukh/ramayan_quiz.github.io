let index=0;
let attempt=0;
let score=0;
let wrong=0;
let questions=quiz.sort(function(){
    return 0.5 - Math.random();
});

let totalQuestion=questions.length;



$(function (){
    //timer code start from here

    let totalTime = 60;
    let min= 0;
    let sec=0;
    let counter = 0;

    let timer=setInterval(function(){
        counter++;
        min=Math.floor((totalTime-counter)/60);
        sec=totalTime-min*60 - counter;

        $(".timerBox span").text(min + ":" + sec);

        if(counter == totalTime){

            alert("Time is up.press ok to show result.");
            result();
            clearInterval(timer);    
        }

        //console.log("min="+min);
       // console.log("sec="+sec);
    },1000); //timer set for 1 sec interval
    //timer code end here

    //print Question 
    printQuestion(index);


});
//Function to print question start
function printQuestion(i){
    $(".questionBox").text(questions[i].question);
    $(".optionBox span").eq(0).text(questions[i].option[0]);
    $(".optionBox span").eq(1).text(questions[i].option[1]);
    $(".optionBox span").eq(2).text(questions[i].option[2]);
    $(".optionBox span").eq(3).text(questions[i].option[3]);
}


//Function to check answer start
function checkAnswer(option){
  attempt++;
  let optionClicked=$(option).data("opt");
  //console.log(questions[index]);
  if(optionClicked==questions[index].answer){
      $(option).addClass("right");
      score++;
  }
  else{
      $(option).addClass("wrong");
      wrong++;
  }

  $(".scoreBox span").text(score);
  $(".optionBox span").attr("onclick","");

}


//Function for the next question start
function showNext(){
    if(index>= questions.length-1){
        showResult(0);
        return;
    }
    index++;
    $(".optionBox span").removeClass();
    $(".optionBox span").attr("onclick","checkAnswer(this)");

    printQuestion(index);
}
  
//Function for result
function showResult(j){
if(
    j==1 &&
    index < questions.length - 1 &&
    !confirm( "You have not attempted all the questions.Press ok to skip & get your final result."
    )  
){
    return;
}
result();
}

//Result function
    function result(){
    $("#questionScreen").hide();
    $("#resultScreen").show();

    $("#totalQuestion").text(totalQuestion);
    $("#attemptQuestion").text(attempt);
    $("#correctAnswers").text(score);
    $("#wrongAnswers").text(wrong);
    } 
