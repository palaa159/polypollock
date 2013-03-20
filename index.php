<?php include 'header.php'; ?>

    <div id="debugger">
        Hello
    </div>

    <div id="gameArea">
        <canvas id="gameCanvas">Your Browser doesn't support canvas</canvas>
    </div>

    <div id="container">
        <div id="space"></div>

        <div id="bg"></div>
    </div>

    <div id="startUp">
        <img class="center" alt="PolyPollock Mobile" src="./img/logo450x148.png">

        <div id="instruction"></div>

        <div id="beACanvas">
            <h2>4 Steps to enjoy PolyPollock</h2>

            <h4><span style="text-align: left; font-weight: 400"><br>
            1.) Pick up your smartphone</span></h4>

            <h4><span style="text-align: left; font-weight: 400">2.) Enter <span class="strong">http://bit.ly/ppm123</span></span></h4>

            <h4><span style="text-align: left; font-weight: 400">3.) Follow the instruction</span></h4>

            <h4><span style="text-align: left; font-weight: 400">4.) Leave this screen open as a canvas</span></h4>
        </div>

        <div id="aboutPP">
            PolyPollock is a drawing application that opens a new way of interaction using the <a href="http://en.wikipedia.org/wiki/Open_Web_Platform" target="_blank">OpenWeb platform</a> and mobile devices. With the belief that mobile devices are becoming more intimate to us yet the possibilities of them are endlessly growing, I have turned your mobile device into a virtual drawing tool. Now get ready to splash pixels, make 'em bleed like Pollock does!
        </div><br>

        <div id="footer">
            <div id="about">
                <span style="color:#fff; font-weight:lighter;">-----------<br>
                <a id="gotoAbout">about this project</a><br>
                palaa159@newschool.edu</span>
            </div>

            <div id="html5logo">
                <a href="http://www.w3.org/html/logo/">Built with :<br>
                <img src="http://www.w3.org/html/logo/badge/html5-badge-h-connectivity-css3-graphics.png" width="100" height="auto" alt="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, and Graphics, 3D &amp; Effects" title="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, and Graphics, 3D &amp; Effects"></a>
            </div>
        </div><!-- end of startUp -->
    </div>

    <div id="paintTime">
        <img alt="brush" id="brushOnScreen" class="brushSize" src="./img/brush133x362.png"> <!--
        <div id = "gyroData">
            <p>For debugging</p>
            <span>left-right : <span class = "dataLR"></span></span><br>
            <span>front-back : <span class = "dataFB"></span></span><br>
            <span>Direction : <span class = "dataDir"></span></span><br>
            <span>X: Y : <span class = "dataxy"></span></span><br>
            <span>cX: cY : <span class = "dataCxCy"></span></span>
        </div>
-->
    </div><!-- end of container -->
    <?php include 'footer.php'; ?>
