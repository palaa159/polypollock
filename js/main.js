$(document).ready(function() {
	var gameStart = 0;
	var tutStart = 0;
	/// delay function

	function delay(time) {
		var d1 = new Date();
		var d2 = new Date();
		while (d2.valueOf() < d1.valueOf() + time) {
			d2 = new Date();
		}
	}
	// About
	$('#gotoAbout').click(function() {
		$('#beACanvas').fadeOut();
		setTimeout(function() {
			$('#aboutPP').fadeIn();
		}, 1000);
	});
	// go back
	$('#aboutPP').click(function() {
		$('#aboutPP').fadeOut();
		setTimeout(function() {
			$('#beACanvas').fadeIn();
		}, 1000);
	});
	// Detect device to init
	setTimeout(function() {
		if ((screen.width < 650) || (screen.height < 480)) {
			console.log("You mobile");
			painter();
		} else {
			$('#space').fadeIn();
			canvas();
			console.log("You Desktop");
			$('#startUp').css({
				'top': '50%'
			});
		}
	}, 100);
	/// Connect to nodeJS
	var socket = io.connect('http://ec2-50-112-205-121.us-west-2.compute.amazonaws.com:5000');
	//// FOR CANVASOR

	function canvas() {
		/// resize startup abit
		$('#startUp').css({
			'height': '450',
			'margin-top': '-=100px'
		});
		/// Instruction
		/// Canvas Instruction
		$('#gameArea').fadeIn();
		$('#beACanvas').fadeIn();
		/// Accept to be canvas
		socket.on('start canvas', function(fS) {
			$('#space').fadeOut();
			$('#startUp').fadeOut();
			$('#gameCanvas').fadeIn();
		});
		/// Canvas
		var gameCanvas = document.getElementById('gameCanvas');
		$('#gameCanvas').attr('width', window.innerWidth);
		$('#gameCanvas').attr('height', window.innerHeight);
		var ctx = gameCanvas.getContext("2d");
		gW = gameCanvas.width, gH = gameCanvas.height;
		///// Animate	
		/// draw background
		ctx.fillStyle = "rgb(100,100,100)";
		ctx.fillRect(0, 0, gW, gH);
		ctx.fillStyle = "rgb(0,0,255)";
		socket.on('userData', function(fS) {
			colorHSL = "hsl(" + fS.cY + "," + fS.cX + "%, 50%)";
			ctx.fillStyle = colorHSL;

			function draw() {
				if (fS.lvl === 0) {
					randS = Math.floor((Math.random() * 20) + 1);
					randSpillSize = Math.floor((Math.random() * 4) + 1);
					randSpillX = Math.floor((Math.random() * 200) - 100);
					randSpillY = Math.floor((Math.random() * 200) - 100);
					ctx.fillRect(fS.X * gW, fS.Y * gH, randS, randS);
					for (var m = 0; m < randSpillSize; m++) {
						ctx.fillRect((fS.X * gW) + randSpillX, (fS.Y * gH) + randSpillY, randSpillSize, randSpillSize);
					}
				} else if (fS.lvl === 1) {
					randomSplash = Math.floor((Math.random() * 6) + 1);
					for (var i = 0; i < randomSplash; i++) {
						randPosX = Math.floor((Math.random() * 1) * 100 - 50);
						randPosY = Math.floor((Math.random() * 1) * 120 - 60);
						randSizeX = Math.floor((Math.random() * 50) + 10);
						randSizeY = Math.floor((Math.random() * 50) + 1);
						randDropSizeX = Math.floor((Math.random() * 4) + 1);
						randDropSizeY = Math.floor((Math.random() * 150) + 1);
						ctx.fillRect(fS.X * gW, fS.Y * gH, 10, 10);
						ctx.fillRect((fS.X * gW) + randPosX, (fS.Y * gH) + randPosY, randSizeX, randSizeY);
						ctx.fillRect((fS.X * gW) + randPosX, (fS.Y * gH) + randPosY, randDropSizeX, randDropSizeY);
					}
				} else if (fS.lvl === 2) {
					randomSplash = Math.floor((Math.random() * 6) + 1);
					for (var j = 0; j < randomSplash; j++) {
						randPosX = Math.floor((Math.random() * 1) * 120 - 60);
						randPosY = Math.floor((Math.random() * 1) * 100 - 50);
						randSizeX = Math.floor((Math.random() * 50) + 1);
						randSizeY = Math.floor((Math.random() * 50) + 10);
						randDropSizeX = Math.floor((Math.random() * 4) + 1);
						randDropSizeY = Math.floor((Math.random() * 150) + 1);
						ctx.fillRect(fS.X * gW, fS.Y * gH, 15, 15);
						ctx.fillRect((fS.X * gW) + randPosX, (fS.Y * gH) + randPosY, randSizeX, randSizeY);
						ctx.fillRect((fS.X * gW) + randPosX, (fS.Y * gH) + randPosY, randDropSizeX, randDropSizeY);
					}
				}
			}

			function move() {}
			if (fS.isDraw === false) {
				setInterval(draw(), 1000 / 60);
			} else if (fS.isDraw === false) {
				move();
			}
		});
		//// End of canvas
	}
	/////// FOR PAINTERS

	function painter() {
		/// Prevent scrolling in small devices
		document.ontouchmove = function(e) {
			e.preventDefault();
		};
		/// Painter Instruction
		$('#painter').fadeIn();
		/// Random ID and greet from server
		var yourId = Math.floor((Math.random() * 10000) + 100);
		socket.emit('new user', yourId);
		socket.on('new user', function(fS) {
			$('#debugger').append("Welcome " + "#" + fS);
		});
		/// Random posX posY
		var iPosX = Math.random();
		var iPosY = Math.random();
		var posX = parseFloat(iPosX.toFixed(3));
		var posY = parseFloat(iPosY.toFixed(3));
		/// Add Device Motion Listener
		window.addEventListener('devicemotion', startHandler, false);
		//// Instructions
		var text = ['<br>Welcome to PolyPollock. For maximum experience, please vertically lock the orientation', '<br>Loading the instruction ' + '<br>Make sure you have your computer screen opened', 'Move your hand freely to paint on the canvas<br><img src=\'img/tut01.png\'>', 'Swipe your finger to change paint color<br><img src=\'img/tut02.png\'>', '<br>Point your device towards the screen and touch here to start'];
		$.each(text, function(i, val) {
			setTimeout(function() {
				$('#instruction').fadeOut("slow", function() {
					$(this).html(val).fadeIn("slow");
				});
			}, i * 7000);
		});
		/// Device Start detect Handler

		function startHandler(e) {
			var acceleration = e.accelerationIncludingGravity;
			var facingUp = -1;
			if (acceleration.z > 0) {
				facingUp = +1;
			}
			var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
			var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
			var LR = (tiltLR) * -1;
			var FB = (tiltFB + 80) * -1;
			var velCX = parseFloat((LR / 3000).toFixed(3));
			var velCY = parseFloat((FB / 2500).toFixed(3));
			$('#startUp').bind('touchstart', function(e) {
				gameStart = 1;
			});
			$('#startUp').bind('touchend', function(e) {
				gameStart = 0;
			});
			$('#debugger').html(gameStart);
			if (tiltFB <= -60 && gameStart === 1) {
				/// send signal to canvas to start
				socket.emit('canvas start', "1");
				$('#startUp').fadeOut(1000);
				$('#paintTime').fadeIn();
				var randHue = Math.floor((Math.random() * 0) + 100);
				$('#bg').css('background-color', 'hsl(' + randHue + ',' + 100 + "%" + ',' + "40%" + ')');
				window.addEventListener('devicemotion', motionHandler, false);
				window.addEventListener('deviceorientation', orientHandler, false);
				window.addEventListener('touchmove', touchMoveHandler, false);
			}
		}
		/// Map Function

		function map_range(value, low1, high1, low2, high2) {
			return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
		}
		/// Orient Handler

		function orientHandler(e) {
			dir = Math.round(e.alpha);
			mapDir = (map_range(dir, 0, 360, -1, 1)) / 500;
			return mapDir;
		}
		/// Device Motion Handle

		function motionHandler(e) {
			var acceleration = e.accelerationIncludingGravity;
			var facingUp = -1;
			if (acceleration.z > 0) {
				facingUp = +1;
			}
			var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
			var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
			LR = (tiltLR) * -1;
			FB = (tiltFB + 80) * -1;
			//// move brush in 3D
/*
var rotation = "rotate(" + LR + "deg)";
			document.getElementById("brushOnScreen").style.webkitTransform = rotation;
*/
			velX = parseFloat((LR / 3000).toFixed(3)) + mapDir;
			velY = parseFloat((FB / 2500).toFixed(3));
			posX += velX;
			posY += velY;
			posX = Math.min(Math.max(parseFloat(posX), 0.01), 0.99); // constrain
			posY = Math.min(Math.max(parseFloat(posY), 0.01), 0.99);
			/// Level
			if (tiltLR > 70 || tiltLR < -70) {
				lvl = 1;
			} else if (tiltFB > 70 || tiltLR < -70) {
				lvl = 2;
			} else {
				lvl = 0;
			}
			/// Debug
			$('.dataDir').text(mapDir);
			$('.dataLR').text((tiltLR) * -1);
			$('.dataFB').text((tiltFB + 50) * -1);
			$('.dataxy').text(posX + ", " + posY);
			$('.dataCxCy').text(cposX + ", " + cposY);
			socket.emit('userData', yourId, posX, posY, cposX, cposY, lvl);
		}
		/// Change Color Touch event
		var cposX = 0,
			cposY = 0;

		function touchMoveHandler(e) {
			maxWinWidth = window.innerWidth;
			maxWinHeight = window.innerHeight;
			cposX = Math.round((e.pageX / maxWinWidth) * 150);
			cposY = Math.round((e.pageY / maxWinHeight) * 720);
			$('#bg').css('background-color', 'hsl(' + cposY + ',' + cposX + "%" + ',' + "40%" + ')');
			return {
				cposX: cposX,
				cposY: cposY
			};
		}
	}
	/// End of Main.js
});