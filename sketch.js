let screen_dock;
let text_box;
if (screen.availWidth < 800 || screen.availHeight < 675) {
    settings_dock = "bottom";   // Options: left, bottom
    text_box = true;
} else {
    settings_dock = "left";
    text_box = false;
}

let friendly_boids = [];
let enemy_boids = []
let pointsOfInterest = [];
let texts = [];
let options = [];
let is_updating = true;
let canvas_position = 0;
let setting_displacement;

if (settings_dock == 'left') {
    setting_displacement = 0;
    canvas_position = 350;
} else if (settings_dock == 'bottom') {
    setting_displacement = screen.availHeight;
    canvas_position = 0;
}

// Boid variables
let friendly_boid_count = 200;
let enemy_boid_count = 3;
let enemy_boid_attack_constant = 0.5;
let enemy_avoidance_constant = 0.75;
let enemy_avoidance_range = 150;
let avoidance_constant = 0.15;
let alignment_constant = 0.3;
let cohesion_constant = 0.04;
let interest_constant = 0.1;
let poi_avoidance_constant = 0.5;
let turn_constant = 0.3;
let margin = 100;
let avoidance_range = 25;
let visible_range = 65;
let poi_attraction_range = 500;
let poi_protection_range = 50;
let max_speed = 5;
let min_speed = 3;

function setup() {
    // Position the canvas to the right of the settings
    let canvas = createCanvas(screen.availWidth - canvas_position, screen.availHeight);
    canvas.position(canvas_position, 0);

    for (let i = 0; i < friendly_boid_count; i++) {
        // friendly_boids.push(new FriendlyBoid(random(width), random(height)));
        friendly_boids.push(new FriendlyBoidOptimised(random(width), random(height)));
    }

    for (let i = 0; i < enemy_boid_count; i++) {
        // enemy_boids.push(new EnemyBoid(random(width), random(height)));
        enemy_boids.push(new EnemyBoidOptimised(random(width), random(height)));
    }

    title = createP("<h1>Boid settings</h1>");
    title.position(10, -25 + setting_displacement);

    texts.push(createP("Friendly boid count:"));
    options.push(createSlider(0, 250, friendly_boid_count, 1));
    texts.push(createP("Enemy boid count:"));
    options.push(createSlider(0, 100, enemy_boid_count, 1));
    texts.push(createP("Enemy boid attack:"));
    options.push(createSlider(0, 5, enemy_boid_attack_constant, 0.25));
    texts.push(createP("Enemy avoidance:"));
    options.push(createSlider(0, 2, enemy_avoidance_constant, 0.1));
    texts.push(createP("Enemy avoidance range:"));
    options.push(createSlider(0, 200, enemy_avoidance_range, 10));
    texts.push(createP("Friendly avoidance:"));
    options.push(createSlider(0, 1, avoidance_constant, 0.01));
    texts.push(createP("Friendly avoidance range:"));
    options.push(createSlider(0, 100, avoidance_range, 5));
    texts.push(createP("Show avoidance range:"));
    options.push(createCheckbox('', false));
    texts.push(createP("Alignment:"));
    options.push(createSlider(0, 1, alignment_constant, 0.01));
    texts.push(createP("Cohesion:"));
    options.push(createSlider(0, 0.1, cohesion_constant, 0.001));
    texts.push(createP("Visible range:"));
    options.push(createSlider(0, 100, visible_range, 5));
    texts.push(createP("Show visible range:"));
    options.push(createCheckbox('', false));
    texts.push(createP("Max speed:"));
    options.push(createSlider(0, 25, max_speed, 1));
    texts.push(createP("Min speed:"));
    options.push(createSlider(0, 25, min_speed, 1));
    texts.push(createP("Margin:"));
    options.push(createSlider(0, 200, margin, 10));
    texts.push(createP("Show margin:"));
    options.push(createCheckbox('', false));
    texts.push(createP("POI attraction range:"));
    options.push(createSlider(0, 1000, poi_attraction_range, 5));
    texts.push(createP("Show POI attraction range:"));
    options.push(createCheckbox('', false));
    texts.push(createP("POI protection range:"));
    options.push(createSlider(0, 500, poi_protection_range, 5));
    texts.push(createP("Show POI protection range:"));
    options.push(createCheckbox('', false));
    texts.push(createP("Show trail:"));
    options.push(createCheckbox('', false));
    texts.push(createP("Show velocity:"));
    options.push(createCheckbox('', false));
    texts.push(createP("Boid shape:"));
    options.push(createSelect());
    texts.push(createP("Use the <kbd>+</kbd> or <kbd>-</kbd> keys to add and remove POIs."));

    x_pos = 10;
    y_pos = 50 + setting_displacement;
    for (let text of texts) {
        text.position(x_pos, y_pos);
        y_pos += 25;
    }
    createP("Made and hosted by <a href='https://sooraj.dev/'>Sooraj</a>.").position(x_pos, y_pos);

    x_pos = 210;
    y_pos = 62 + setting_displacement;
    for (let option of options) {
        option.position(x_pos, y_pos);
        option.size();
        y_pos += 25;
    }

    options[22].option("Triangle");
    options[22].option("Circle");

    frameRate(60);
}

function draw() {
    friendly_boid_count = options[0].value();
    enemy_boid_count = options[1].value();
    enemy_boid_attack_constant = options[2].value();
    enemy_avoidance_constant = options[3].value();
    enemy_avoidance_range = options[4].value();
    avoidance_constant = options[5].value();
    avoidance_range = options[6].value();
    alignment_constant = options[8].value();
    cohesion_constant = options[9].value();
    visible_range = options[10].value();
    max_speed = options[12].value();
    min_speed = options[13].value();
    poi_attraction_range = options[16].value();
    poi_protection_range = options[18].value();

    if (friendly_boids.length < friendly_boid_count) {
        // friendly_boids.push(new FriendlyBoid(random(width), random(height)));
        friendly_boids.push(new FriendlyBoidOptimised(random(width), random(height)));
    } else if (friendly_boids.length > friendly_boid_count) {
        friendly_boids.pop();
    }

    if (enemy_boids.length < enemy_boid_count) {
        // enemy_boids.push(new EnemyBoid(random(width), random(height)));
        enemy_boids.push(new EnemyBoidOptimised(random(width), random(height)));
    } else if (enemy_boids.length > enemy_boid_count) {
        enemy_boids.pop();
    }

    background(0);

    // Draw the margins
    if (options[15].checked()) {
        drawMargins();
    }

    // Draw points of interest
    for (let poi of pointsOfInterest) {
        poi.draw(protect_range = options[19].checked(), attract_range = options[17].checked());
    }

    // Draw friendly boids
    for (let boid of friendly_boids) {
        boid.update(trail = options[20].checked(), update = is_updating);
        boid.draw(trail = options[20].checked(), shape = options[22].value(), direction = options[21].checked(), range = options[11].checked(), avoid = options[7].checked());
    }

    // Draw enemy boids
    for (let boid of enemy_boids) {
        boid.update(trail = options[20].checked(), update = is_updating);
        boid.draw(trail = options[20].checked(), shape = options[22].value(), direction = options[21].checked(), range = options[11].checked(), avoid = options[7].checked());
    }
}

function keyPressed() {
    // Check if it was a right click
    if (key == '=') {
        pointsOfInterest.push(new PointOfInterest(mouseX, mouseY));
    } else if (key == '-') {
        for (let i = pointsOfInterest.length - 1; i >= 0; i--) {
            if (dist(mouseX, mouseY, pointsOfInterest[i].position.x, pointsOfInterest[i].position.y) < 10) {
                pointsOfInterest.splice(i, 1);
            }
        }
    } else if (key == ' ') {
        if (is_updating) {
            is_updating = false;
        } else {
            is_updating = true;
        }
    }
}

function drawMargins() {
    margin = options[14].value();

    stroke(150, 0, 0, 200);
    strokeWeight(2);
    noFill();
    rect(margin, margin, width - 2 * margin, height - 2 * margin);
}