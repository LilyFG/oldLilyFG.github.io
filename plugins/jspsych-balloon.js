/*
 * Example plugin template
 */

jsPsych.plugins["balloon"] = (function() {

  var plugin = {};
  
  jsPsych.pluginAPI.registerPreload('balloon', 'stimuli', 'image');

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.canvas_size = trial.canvas_size || [400, 400];
    trial.image_size = trial.image_size || [100, 100];

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
	
	//
	display_element.append($("<svg id='jspsych-balloon-canvas' width=" + trial.canvas_size[0] + " height=" + trial.canvas_size[1] + "></svg>"));
	
	var paper = Snap("#jspsych-vsl-animate-occlusion-canvas");
	
	var balloon = paper.circle(canvas_size[0]/2, canvas_size[1]/2, 100)
	balloon.animate({r:trial.image_size * 100},trial.image_size * 500)

    // data saving
    var trial_data = {
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
