<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="player.css">
    <link rel="stylesheet" href="leveluno.css">
    <script src="script.js" defer></script>
</head>
<body>
    <header>
        <h1>Welcome to the Game!</h1>
        <nav>
            <ul>
                <li><a href="#login">Log in</a></li>
                <li><a href="#logout">Log out</a></li>
                <li><a href="#leaderboard">Leaderboard</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="game-window">
            <div id="player"></div>
            <div class="block" id="line-top"></div>
            <div class="block" id="line-left"></div>
            <div class="block" id="line-bottom"></div>
            <div class="block" id="line-right"></div>
            <div id="draggableBlock" class="draggable-block"></div>
            <div id="door" class="door"></div>
            <div id="portal" class="portal"></div>
            <div id="portal2" class="portal-hid"></div>
            <div id="pressurePlate" class="pressure-plate"></div>
            <div id="portalDoor" class="door-portal"></div>
        </div>
    </main>

    <footer>
        <p>Pleae</p>
    </footer>

    <!-- Popup -->
    <div id="popup" class="popup">
        <div class="popup-content">
            <span id="closePopup" class="close">&times;</span>
            <h2>Solve the Math Question</h2>
            <div id="question"></div>
            <input type="text" id="answer" placeholder="Enter your answer">
            <button id="submitAnswer">Submit</button>
        </div>
    </div>
</body>
</html>