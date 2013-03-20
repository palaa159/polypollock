<!DOCTYPE html>

<html lang="en">
	<head>
	<title>PolyPollock</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=0.7, maximum-scale=1, user-scalable=no">
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<script src="js/modernizr.min.js"></script>
		<script>
			yepnope({
				test: Modernizr.touch,
				nope: ['js/Three.js', 'js/particles.js']
			});
		</script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="http://ec2-50-112-205-121.us-west-2.compute.amazonaws.com:5000/socket.io/socket.io.js"></script>
		<script src="js/main.js"></script>
		<script src="js/requestAnimationFrame.js"></script>

	</head>

	<body>
		<!-- FB SDK -->
		<div id="fb-root"></div>