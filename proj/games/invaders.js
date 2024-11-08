<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASCII Space Invaders</title>
    <style>
        body {
            font-family: monospace;
            color: lime;
            background-color: black;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
            margin: 0;
        }
        #score-area {
            font-size: 16px;
            margin-bottom: 10px;
        }
        #game {
            width: 40ch;
            height: 20em;
            white-space: pre;
            font-size: 20px;
            border: 2px solid lime;
            position: relative;
        }
    </style>
</head>
<body>
    <div id="score-area">
        <div id="hits">HITS: 0</div>
        <div id="misses">MISSES: 0</div>
    </div>
    <div id="game"></div>
    <script>
        const game = document.getElementById("game");
        const hitsDisplay = document.getElementById("hits");
        const missesDisplay = document.getElementById("misses");
        const width = 40; // game area width
        const height = 20; // game area height

        const spaceshipString = "<=!=>";
        const spaceshipCenter = 2; // The center position of the spaceship (where `!` is located)
        let spaceshipPos = Math.floor(width / 2) - spaceshipCenter; // Center the spaceship under bullets
        let bullets = [];
        let enemies = [];
        let hits = 0;
        let misses = 0;

        // Counter to control enemy speed
        let enemyMoveCounter = 0;
        const enemySpeed = 5; // Increase this value to slow down enemies

        // Update game display
        function render() {
            let output = "";

            // Render enemies and the spaceship
            for (let y = 0; y < height; y++) {
                let line = "";
                for (let x = 0; x < width; x++) {
                    // Render the spaceship on the bottom row at its position
                    if (y === height - 1 && x === spaceshipPos + spaceshipCenter) {
                        line += "!";
                    } else if (y === height - 1 && x >= spaceshipPos && x < spaceshipPos + spaceshipString.length) {
                        line += spaceshipString[x - spaceshipPos];
                    } else if (bullets.some(b => b.x === x && b.y === y)) {
                        line += "o"; // bullet
                    } else if (enemies.some(e => e.x === x && e.y === y)) {
                        line += "M"; // enemy
                    } else {
                        line += " "; // empty space
                    }
                }
                output += line + "\n";
            }
            game.textContent = output;

            // Update score displays
            hitsDisplay.textContent = `H I T S: ${hits}`;
            missesDisplay.textContent = `MISSES: ${misses}`;
        }

        // Move spaceship left and right and shoot
        let keys = {};

        document.addEventListener("keydown", e => {
            keys[e.key] = true;
            if (e.key === " ") {
                bullets.push({ x: spaceshipPos + spaceshipCenter, y: height - 2 }); // Fire bullet from center `!`
            }
        });

        document.addEventListener("keyup", e => {
            keys[e.key] = false;
        });

        function handleMovement() {
            if (keys["ArrowLeft"] && spaceshipPos >= -spaceshipCenter) {
                spaceshipPos--; // Move left, allowing the spaceship's center to go to the edge
            }
            if (keys["ArrowRight"] && spaceshipPos <= width - spaceshipCenter) {
                spaceshipPos++; // Move right, allowing the spaceship's center to go to the edge
            }
        }

        // Update game elements
        function update() {
            handleMovement();

            // Move bullets
            bullets = bullets.map(b => ({ x: b.x, y: b.y - 1 })).filter(b => b.y >= 0);

            // Spawn enemies randomly
            if (Math.random() < 0.1) {
                enemies.push({ x: Math.floor(Math.random() * width), y: 0 });
            }

            // Move enemies at a slower rate based on counter
            enemyMoveCounter++;
            if (enemyMoveCounter >= enemySpeed) {
                enemies = enemies.map(e => ({ x: e.x, y: e.y + 1 }));
                enemyMoveCounter = 0; // Reset the counter after moving enemies
            }

            // Check for collisions
            bullets.forEach((bullet, bulletIdx) => {
                enemies.forEach((enemy, enemyIdx) => {
                    if (bullet.x === enemy.x && bullet.y === enemy.y) {
                        bullets.splice(bulletIdx, 1); // remove bullet
                        enemies.splice(enemyIdx, 1); // remove enemy
                        hits++;
                    }
                });
            });

            // Count enemies that reached the bottom as "missed"
            const newMisses = enemies.filter(e => e.y >= height).length;
            misses += newMisses;

            // Remove off-screen enemies
            enemies = enemies.filter(e => e.y < height);

            render();
        }

        // Game loop with faster bullet speed
        setInterval(update, 50); // Increase the frequency to make bullets move faster
        render();
    </script>
</body>
</html>

