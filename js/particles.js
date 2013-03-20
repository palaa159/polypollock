$(document).ready(function() {
			// the main three.js components
			var camera, scene, renderer,

			// to keep track of the mouse position
				mouseX = 0, mouseY = 0,

			// an array to store our particles in
				particles = [];

			// let's get going! 
			init();

			function init() {

				// Camera params : 
				// field of view, aspect ratio for render output, near and far clipping plane. 
				camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 4000 );
	
				// move the camera backwards so we can see stuff! 
				// default position is 0,0,0.
				camera.position.z = 1000;

				// the scene contains all the 3D object data
				scene = new THREE.Scene();
				
				// camera needs to go in the scene 
				scene.add(camera);
	
				// and the CanvasRenderer figures out what the 
				// stuff in the scene looks like and draws it!
	 
				renderer = new THREE.CanvasRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
	
				// the renderer's canvas domElement is added to the body
				space.appendChild( renderer.domElement );

				makeParticles(); 
			
				// add the mouse move listener
				document.addEventListener( 'mousemove', onMouseMove, false );
				
				// render 30 times a second (should also look 
				// at requestAnimationFrame) 
				setInterval(update,1000/30); 
			
			}

			// the main update function, called 30 times a second

			function update() {

				updateParticles();

				// and render the scene from the perspective of the camera
				renderer.render( scene, camera );

			}

			// creates a random field of Particle objects
			
			function makeParticles() { 
				
				var particle, material; 

				// we're gonna move from z position -1000 (far away) 
				// to 1000 (where the camera is) and add a random particle at every pos. 
				for ( var zpos= -1000; zpos < 1000; zpos+=2 ) {
		
					// we make a particle material and pass through the 
					// colour and custom particle render function we defined. 
					material = new THREE.ParticleCanvasMaterial( {program: particleRender }); 
					material.color.r = Math.random();
					material.color.g = Math.random();
					material.color.b = Math.random();
					// make the particle
					particle = new THREE.Particle(material);
		
					// give it a random x and y position between -500 and 500
					particle.position.x = Math.random() * 1000 - 500;
					particle.position.y = Math.random() * 1000 - 500;
		
					// set its z position
					particle.position.z = zpos;
		
					// scale it up a bit
					particle.scale.x = particle.scale.y = 10;
		
					// add it to the scene
					scene.add( particle );
		
					// and to the array of particles. 
					particles.push(particle); 
				}
				
			}
			
			// there isn't a built in circle particle renderer 
			// so we have to define our own. 

			function particleRender( context ) {
				// we get passed a reference to the canvas context
				context.fillRect(0,0,1.2,1.2);
			}

			
			// moves all the particles dependent on mouse position
			
			function updateParticles() { 
				
				// iterate through every particle
				for(var i=0; i<particles.length; i++) {
		
					particle = particles[i]; 
		
					// and move it forward dependent on the mouseY position. 
					particle.position.z +=  5;
		
					// if the particle is too close move it to the back
					if(particle.position.z>1000) particle.position.z-=2000; 
		
				}
	
			}
			function map_range(value, low1, high1, low2, high2) {
				return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
			}
		// called when the mouse moves
			function onMouseMove( event ) {
				// store the mouseX and mouseY position 
				mouseX = event.clientX;
				mouseY = event.clientY;
				
				uX = map_range(mouseX, 0, window.innerWidth, -100, 100);
				uY = map_range(mouseY, 0, window.innerHeight, 100, -100);
				
				camera.position.x = uX;
				camera.position.y = uY;
			}
			});
