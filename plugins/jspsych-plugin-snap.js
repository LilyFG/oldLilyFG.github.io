/*
 * Example plugin template
 */

jsPsych.plugins["snap"] = (function() {

  var plugin = {};
  
    jsPsych.pluginAPI.registerPreload('snap', 'stimuli', 'image');

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.size = trial.size || 100;
    trial.text = trial.text || "1";

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
	
	display_element.append($("<svg id='jspsych-snap-canvas' width=" + 500 + " height=" + 300 + "></svg>"));

    var paper = Snap("#jspsych-snap-canvas");
	
	b = paper.circle(350, 150, trial.size).attr({fill: '#00cc99'})
	
	if(trial.size/20 % 2 != 0){
		// show image
		paper.image('img/rab_push.bmp', 0, 0, 150, 300)
		b.animate({r: trial.size+20}, 300, mina.easeinout)
		//paper.text(250, 50, trial.text)

	}else{
		
		paper.image('img/rab_pull.bmp', 0, 0, 150, 300)
		b.animate({r: trial.size}, 10, mina.easeinout)
		
	}
	

	

/* 	var push = paper.image('img/rab_push.bmp', 0, 0, 150, 300)
	var exp1 = b.animate({r: trial.size+10}, 500, mina.easein, pull)
	var pull = paper.image('img/rab_pull.bmp', 0, 0, 150, 300)
	var exp2 = b.animate({r: trial.size+10}, 500, mina.easeout) */


	

    // data saving
    var trial_data = {
      parameter_name: 'parameter value'
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
