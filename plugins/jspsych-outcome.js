/*
 * Example plugin template
 */

jsPsych.plugins["outcome"] = (function() {

  var plugin = {};
  
    jsPsych.pluginAPI.registerPreload('snap', 'stimuli', 'image', 'single-stim');

  plugin.trial = function(display_element, trial) {

    // // set default values for parameters
    trial.size = trial.size || 100;
	trial.outcome = trial.outcome || "bust"
	trial.choices = trial.choices || [80]
	trial.bustSize = trial.bustSize || 2

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
	
	//set up the timeout procedure
	var setTimeoutHandlers = [];
	
	
	var end_trial = function() {

      // kill any remaining setTimeout handlers
      for (var i = 0; i < setTimeoutHandlers.length; i++) {
        clearTimeout(setTimeoutHandlers[i]);
      }

	  // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
	  
      // clear the display
      display_element.html('');
	  
	        // gather the data to store for the trial
      var trial_data = {

      };

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
	  
    };
	
	var paper = Snap("#jspsych-snap-canvas");
	
	// show pull image
	paper.image('img/rab_pull.bmp', 0, 0, 150, 300)
	// wait 300ms
	b.animate({r: trial.size}, 1500, mina.easeinout, function(){
	
		if(trial.outcome == "bust"){	
			// show lose image
			paper.image('img/rab_lose.bmp', 0, 0, 150, 300)
			// show burst balloon
			paper.image('img/burst.bmp', 205, 295-trial.size*2, trial.size*2+10, trial.size*2+10)
									
		}else{
			// show win image
			paper.image('img/rab_win.bmp', 0, 0, 150, 300)

		}
	})
	
	var feedback = function(response){

		if(response.key == 80){
			paper.polyline([200, 278 - trial.bustSize*20, 500, 278 - trial.bustSize*20]).attr({stroke: "#FF0000",
										strokeWidth: 2,
										strokeDasharray: "5,5"})

			var t2 = setTimeout(function() {
				end_trial();
				//set trial total time to 3000ms
				}, 3000);	
		}else{
			end_trial();
		}	
	}
		
		
	// run timeout function
	var t1 = setTimeout(function() {
        paper.text(25, 340, "Press 'P' to pay 1p to see where that balloon burst or 'z' to continue");
		
		// start the response listener
		if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
		  var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
			callback_function: feedback,
			valid_responses: trial.choices,
			rt_method: 'date',
			persist: false,
			allow_held_key: false
		  });
		  
		}
		//set trial total time to 3000ms
      }, 3000);
	  
    setTimeoutHandlers.push(t1);	

  
  
		
	// run timeout function

    //setTimeoutHandlers.push(t2);	
};

  
  return plugin;
})();
