/*
 * Example plugin template
 */

jsPsych.plugins["snap-setup"] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.parameter = trial.parameter || 'default value';

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
	
	display_element.append($("<svg id='jspsych-snap-canvas' width=" + 1000 + " height=" + 350 + "></svg>"));
	
	var paper = Snap("#jspsych-snap-canvas");
	
		//draw the axes
	v = paper.path("M200 10V310").attr({stroke: "#000",
										strokeWidth: 2})
	h = paper.path("M200 310H500").attr({stroke: "#000",
										strokeWidth: 2})

										

	h1 = paper.path("M200 258H193").attr({stroke: "#000",
										strokeWidth: 0.5})										
	h2 = paper.path("M200 238H193").attr({stroke: "#000",
										strokeWidth: 0.5})
	h3 = paper.path("M200 218H193").attr({stroke: "#000",
										strokeWidth: 0.5})		
	h4 = paper.path("M200 198H193").attr({stroke: "#000",
										strokeWidth: 0.5})
	h5 = paper.path("M200 178H193").attr({stroke: "#000",
										strokeWidth: 0.5})
	h6 = paper.path("M200 158H193").attr({stroke: "#000",
										strokeWidth: 0.5})
	h7 = paper.path("M200 138H193").attr({stroke: "#000",
										strokeWidth: 0.5})										
	h8 = paper.path("M200 118H193").attr({stroke: "#000",
										strokeWidth: 0.5})
	h9 = paper.path("M200 98H193").attr({stroke: "#000",
										strokeWidth: 0.5})		
	h10 = paper.path("M200 78H193").attr({stroke: "#000",
										strokeWidth: 0.5})
	h11 = paper.path("M200 58H193").attr({stroke: "#000",
										strokeWidth: 0.5})
	h12 = paper.path("M200 38H193").attr({stroke: "#000",
										strokeWidth: 0.5})
										
	
	n1 = paper.text(175, 260, "1")										
	n2 = paper.text(175, 240, "2")
	n3 = paper.text(175, 220, "3")		
	n4 = paper.text(175, 200, "4")
	n5 = paper.text(175, 180, "5")
	n6 = paper.text(175, 160, "6")
	n7 = paper.text(175, 140, "7")										
	n8 = paper.text(175, 120, "8")
	n9 = paper.text(175, 100, "9")		
	n10 = paper.text(170, 80, "10")
	n11 = paper.text(170, 60, "11")
	n12 = paper.text(170, 40, "12")
	
	

    // data saving
    var trial_data = {
      parameter_name: 'parameter value'
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
