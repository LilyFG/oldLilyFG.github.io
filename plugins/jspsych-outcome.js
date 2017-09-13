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
	
	// add another display element for the ratings
	display_element.append($("<svg id='jspsych-rating-canvas' width=" + 1000 + " height=" + 300 + "></svg>"));
	var s = Snap("#jspsych-rating-canvas");
	//set up the timeout procedure
	var setTimeoutHandlers = [];
	//kill keyboard listeners
	  if (typeof keyboardListener !== 'undefined') {
		jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
	  }
	
/* 	var end_trial = function() {
		console.log('ending')

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
	  
    }; */
	
	var paper = Snap("#jspsych-snap-canvas");
	var fb = 0
	
	// show pull image
	paper.image('img/rab_pull.bmp', 0, 0, 150, 300)
	v = paper.text(75, 295, trial.pumpValue).attr({fill: '#FFFFFF',
													'text-anchor': 'middle'})
	// wait 300ms
	b.animate({r: trial.size}, 1500, mina.easeinout, function(){
	
		if(trial.outcome == "bust"){	
			// show lose image
			paper.image('img/rab_lose.bmp', 0, 0, 150, 300)
			// show burst balloon
			paper.image('img/burst.bmp', 205, 295-trial.size*2, trial.size*2+10, trial.size*2+10)
			v = paper.text(75, 295, '0').attr({fill: '#FFFFFF',
													'text-anchor': 'middle'})
									
		}else{
			// show win image
			paper.image('img/rab_win.bmp', 0, 0, 150, 300)
			v = paper.text(75, 295, trial.pumpValue).attr({fill: '#FFFFFF',
													'text-anchor': 'middle'})

		}
		

		
		//display rating scale below
			text = s.text(0,20,"Rate your emotions by dragging the marker. Then press 'space'.")
			sad = s.image('img/img02.bmp', 0, 50, 100, 100)
			happy = s.image('img/img01.bmp', 650, 50, 100, 100)
			line = s.polyline(200, 100, 600, 100).attr({ stroke: '#000', 'strokeWidth': 3})
			marker = s.polygon(400, 103, 410, 120, 390, 120).attr({fill: '#000'}).limitDrag({ x: 0, y: 0, minx: -200, miny: 0, maxx: 220, maxy: 0 })
			
			  // start the response listener
			  if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
				  console.log('listener')
				var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
				  callback_function: after_rating,
				  valid_responses: [69],
				  rt_method: 'date',
				  persist: false,
				  allow_held_key: false
				});
				console.log(keyboardListener)
			  }
			  

			
		
	})
	
	var feedback = function(response){

		if(response.key == 80){
			paper.polyline([200, 278 - trial.bustSize*20, 500, 278 - trial.bustSize*20]).attr({stroke: "#FF0000",
										strokeWidth: 2,
										strokeDasharray: "5,5"})
			paper.text(500, 288 - trial.bustSize*20, trial.bustValue).attr({fill: "#FF0000"})
			fb = 1

			var t2 = setTimeout(function() {
				end_trial();
				//set trial total time to 3000ms
				}, 3000);	
		}else{
			end_trial();
		}	
	}
	
	

    
        // function to end trial when it is time
        var end_trial = function() {


          // kill keyboard listeners
          if (typeof keyboardListener !== 'undefined') {
            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
          }

          // data saving
          var trial_data = {
			  trial: trial_reps,
			  fb: fb,
			  rating: rating,
			  n_pumps: n_pumps,
			  bust: bust
          };
		
	  // clear the display
      	  display_element.html('');
	  //s.clear();

          // end trial
          jsPsych.finishTrial(trial_data);

      };
    
      (function() {
      Snap.plugin( function( Snap, Element, Paper, global ) {

					Element.prototype.limitDrag = function( params ) {
							this.data('minx', params.minx ); this.data('miny', params.miny );
							this.data('maxx', params.maxx ); this.data('maxy', params.maxy );
							this.data('x', params.x );    this.data('y', params.y );
							this.data('ibb', this.getBBox() );
							this.data('ot', this.transform().local );
							this.drag( limitMoveDrag, limitStartDrag, limitFinishDrag );
							return this;    
					};

					// this code is old and clunky now, and transform possibly in wrong order, so only use for simple cases
					function limitMoveDrag( dx, dy ) {
							var tdx, tdy;
							var sInvMatrix = this.transform().globalMatrix.invert();
							sInvMatrix.e = sInvMatrix.f = 0; 
							tdx = sInvMatrix.x( dx,dy ); tdy = sInvMatrix.y( dx,dy );

							this.data('x', +this.data('ox') + tdx);
							this.data('y', +this.data('oy') + tdy);
							if( this.data('x') > this.data('maxx') - this.data('ibb').width  ) 
									{ this.data('x', this.data('maxx') - this.data('ibb').width  ) };
							if( this.data('y') > this.data('maxy') - this.data('ibb').height ) 
									{ this.data('y', this.data('maxy') - this.data('ibb').height ) };
							if( this.data('x') < this.data('minx') ) { this.data('x', this.data('minx') ) };
							if( this.data('y') < this.data('miny') ) { this.data('y', this.data('miny') ) };
							this.transform( this.data('ot') + "t" + [ this.data('x'), this.data('y') ]  );
					};

					function limitStartDrag( x, y, ev ) {
							this.data('ox', this.data('x')); this.data('oy', this.data('y'));
					};
					
					function limitFinishDrag() {
						//return bb = this.getBBox(); 
								}
			  });
			})();
													

			  	var after_rating = function() {
					
					rating = marker._.transform.replace("t","").replace(",0", "")
					console.log(rating)
					s.clear()
					paper.text(0, 340, "Press 'p' to pay 1p to see where that balloon burst or 'z' to continue");
					
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
					
				};
		
		
	// run timeout function

	  
    // //setTimeoutHandlers.push(t1);	

  
  
		
	// run timeout function

    //setTimeoutHandlers.push(t2);	
};

  
  return plugin;
})();
