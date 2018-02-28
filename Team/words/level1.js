window.onload=function(){
	//start set words , select random , number of try , number of second  
    var words=["Facebook","Google","YouTube","w3schools","twitter","oracle","Microsoft","gmail","Linkedin","apple","samsung","instagram",
			   "amazon","udemy","coursera","lynda","vodafone","nokia","orange","adidas","yahoo","nike"];
	var score_number = 0 ;
	var num_try = 0;
	var seconds = 120;
	//start function which reload  a new word
	function again(){
    var random_word = Math.round(Math.random()*22);//Math.floor(Math.random()*100); choose a random number
    word = words[random_word];
    word_length = word.length;
    var letters=word.split("").sort();
	document.getElementById("to_strt").style.display ='none';

	//start main div
    main_div = document.createElement('div');
    main_div.setAttribute("id", "main_div");
	main_div.setAttribute("class", "maindiv");
    document.body.appendChild(main_div);
	
	//end main div
	//start container div
	var container_div = document.createElement('div');
    container_div.setAttribute("id", "container_div");
    main_div.appendChild(container_div);
	
	//end container div
	//start container div
	var have_char = document.createElement('div');
    have_char.setAttribute("id", "have_char");
    container_div.appendChild(have_char);
	/*
	var newDiv = document.createElement('div');
	newDiv.setAttribute("id","new")
	have_char.appendChild(newDiv);*/
	//end container div
	//start set button 
    for(i=0;i<word_length;i++){
       var mybutton = document.createElement('button');
       mybutton.setAttribute("value", letters[i]);
	   mybutton.setAttribute("id", i);
       have_char.appendChild(mybutton);
	   document.getElementsByTagName("button")[i].innerHTML = letters[i];
	   mybutton.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	   mybutton.addEventListener('click', getvalue);
	}
	//end set button
	// start create text box 
	   var answer = document.createElement('input');
       answer.setAttribute("type","text");
       answer.setAttribute("id","ans");
	   answer.setAttribute("class","answer");
	   answer.setAttribute("readonly","true");
       container_div.appendChild(answer);
	//end  create text box
	//start submit button
	var submit_button = document.createElement('button');
    submit_button.setAttribute("id","id_submit");
	submit_button.setAttribute("class","submit");
	container_div.appendChild(submit_button);
	document.getElementById("id_submit").innerHTML = "submit";
	submit_button.addEventListener('click', tosubmit);
	submit_button.addEventListener('click', again);
	
    //end submit button
	//start score
	var score = document.createElement('div');
    score.setAttribute("id","id_score");
	score.setAttribute("class","score");
	main_div.appendChild(score);
	document.getElementById("id_score").innerHTML= "SCORE : " + score_number;
	
	//end score
	//start number of try
	var number_words = document.createElement('input');
	number_words.setAttribute("type","text");
    number_words.setAttribute("id","number_words");
	number_words.setAttribute("class","num_words");
	number_words.setAttribute("readonly","true");
	main_div.appendChild(number_words);
	document.getElementById("number_words").value= num_try ;
	
	//end number of try
	//start delete button
	var delete_char = document.createElement('button');
    delete_char.setAttribute("id","id_delete");
	delete_char.setAttribute("class","delete");
	container_div.appendChild(delete_char);
	document.getElementById("id_delete").innerHTML= "DELETE";
	delete_char.addEventListener('click', to_delete);
	
	//end delete button
	//start time
	countdiv = document.createElement("div");
    countdiv.setAttribute("id", "countdown");
	countdiv.setAttribute("class", "conut_down");
    main_div.appendChild(countdiv);
    count = document.getElementById("countdown");
    countdown = setInterval(function(){secondpass();},1000);
    function secondpass(){
          minutes =  Math.floor(seconds / 60);
          remsecond =  seconds%60;
		// to makr a result as 0:08
        if(seconds<10){
            remsecond = "0" + remsecond;
        }
      
       if(seconds >  0){
		 document.getElementById("countdown").innerHTML = minutes + ":" + remsecond;
        seconds -=1;
       }
	   else{
	    clearInterval(countdown);
	   }
	   }
	  if(seconds ===  0){
		 main_div.remove();
		 //start the result after time end
		 var main_result = document.createElement("div");
         main_result.setAttribute("id", "id_result");
	     main_result.setAttribute("class", "result");
         document.body.appendChild(main_result);
		//end the result after time end
		//start to play again
		 var play_again = document.createElement("a");
         play_again.setAttribute("href", "level1.HTML");
	     play_again.setAttribute("class", "playagain");
         main_result.appendChild(play_again);
		 //end to play again
		 //end to next level
		 
		 if(score_number>=5){
	    // start if solution is good
		 var good_result = document.createElement("div");
         good_result.setAttribute("id", "good_result");
	     good_result.setAttribute("class", "goodresult");
         main_result.appendChild(good_result);
		 // end if solution is good
		  //start to next level
		   var leval2 = document.createElement("a");
		   leval2.setAttribute("href", "level2.HTML");
	       leval2.setAttribute("class", "level2");
           main_result.appendChild(leval2);
		 //end to next level
		 }
		 else{
		// start if solution is bad
	     var bad_result = document.createElement("div");
         bad_result.setAttribute("id", "bad_result");
	     bad_result.setAttribute("class", "badresult");
         main_result.appendChild(bad_result);
		 // end if solution is bad
		 }
	   }
	}
		
	     //end time
	//end function which reload  a new word
	//start function to delete
	function to_delete(){
		var input_value = document.getElementById("ans").value;
		var input_length = input_value.length;
		new_input = input_value.substr(0,input_length-1);
		document.getElementById("ans").value = "";
		document.getElementById("ans").value += new_input;
		for(i=0;i<word_length;i++){
			var who_delete =document.getElementsByTagName("button")[i].value;
			if(who_delete == input_value[input_length-1] && document.getElementsByTagName("button")[i].style.opacity == 0.5 ){
				document.getElementsByTagName("button")[i].addEventListener('click', getvalue);
				document.getElementsByTagName("button")[i].style.opacity ="1";
				break;
			}
		}
	}
	//end function to delete
	//start function to write in text box
	function getvalue(){
            document.getElementById("ans").value += this.value;
    
			this.style.opacity ="0.5";
			this.removeEventListener('click', getvalue, false);
			
	}
	//end function to write in text box
   //start function to submit
   function tosubmit(){
       var user_input = document.getElementById("ans").value;
	   num_try += 1;
	   document.getElementById("number_words").value =num_try;
       if(user_input==word){
		score_number+=1;
	   main_div.remove();
       }
	   else{
		main_div.remove();
	   }
   }
   //end function to submit
   //start to start the game
    var start = document.createElement('div');
    start.setAttribute("id","to_strt");
	start.setAttribute("class","start");
	document.body.appendChild(start);
	document.getElementById("to_strt").innerHTML= "CLICK TO START";
	start.addEventListener('click', again);
	
	//end to start the game
}
	