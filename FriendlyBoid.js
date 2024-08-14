class FriendlyBoid {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);

        this.trail = [];
        for (let i = 0; i < 100; i++) {
            this.trail.push(this.position.copy());
        }
    }

    update(trail = false, update = true) {
        if (!update) {
            return;
        }

        // Separation
        let close_dx = 0;
        let close_dy = 0;

        for (let boid of friendly_boids) {
            if (boid != this) {
                if (dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < avoidance_range) {
                    close_dx += this.position.x - boid.position.x;
                    close_dy += this.position.y - boid.position.y;
                }
            }
        }

        this.velocity.add(createVector(close_dx, close_dy).normalize().mult(avoidance_constant));


        // Alignment
        let avg_dx = 0;
        let avg_dy = 0;
        let total_neighbours = 0;

        for (let boid of friendly_boids) {
            if (boid != this) {
                if (dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < visible_range) {
                    avg_dx += boid.velocity.x;
                    avg_dy += boid.velocity.y;

                    total_neighbours++;
                }
            }
        }

        if (total_neighbours > 0) {
            avg_dx /= total_neighbours;
            avg_dy /= total_neighbours;
        }

        this.velocity.add(createVector(avg_dx, avg_dy).normalize().mult(alignment_constant));


        // Cohesion
        total_neighbours = 0;
        let avg_x = 0;
        let avg_y = 0;

        for (let boid of friendly_boids) {
            if (boid != this) {
                if (dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < visible_range) {
                    avg_x += boid.position.x;
                    avg_y += boid.position.y;

                    total_neighbours++;
                }
            }
        }

        if (total_neighbours > 0) {
            avg_x /= total_neighbours;
            avg_y /= total_neighbours;
        }

        this.velocity.add(createVector(avg_x - this.position.x, avg_y - this.position.y).normalize().mult(cohesion_constant));


        // POI Attraction
        let poi_dx = 0;
        let poi_dy = 0;
        for (let poi of pointsOfInterest) {
            if (dist(this.position.x, this.position.y, poi.position.x, poi.position.y) < poi_attraction_range) {
                poi_dx += poi.position.x - this.position.x;
                poi_dy += poi.position.y - this.position.y;
            }
        }

        this.velocity.add(createVector(poi_dx, poi_dy).normalize().mult(interest_constant));

        // POI Repulsion
        close_dx = 0;
        close_dy = 0;

        for (let poi of pointsOfInterest) {
            if (dist(this.position.x, this.position.y, poi.position.x, poi.position.y) < poi_protection_range) {
                close_dx += this.position.x - poi.position.x;
                close_dy += this.position.y - poi.position.y;
            }
        }

        this.velocity.add(createVector(close_dx, close_dy).normalize().mult(poi_avoidance_constant));


        // Enemy Boid Avoidance
        close_dx = 0;
        close_dy = 0;

        for (let boid of enemy_boids) {
            if (dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < enemy_avoidance_range) {
                close_dx += (this.position.x - boid.position.x);
                close_dy += (this.position.y - boid.position.y);
            }
        }

        this.velocity.add(createVector(close_dx, close_dy).normalize().mult(enemy_avoidance_constant));


        // Turn around if it's going out of bounds
        if (this.position.x < margin) {
            this.velocity.x += turn_constant;
        } else if (this.position.x > width - margin) {
            this.velocity.x -= turn_constant;
        }

        if (this.position.y < margin) {
            this.velocity.y += turn_constant;
        } else if (this.position.y > height - margin) {
            this.velocity.y -= turn_constant;
        }


        // Limit speed
        if (this.velocity.mag() > max_speed) {
            this.velocity.normalize().mult(max_speed);
        } else if (this.velocity.mag() < min_speed) {
            this.velocity.normalize().mult(min_speed);
        }

        // Update the trail
        if (trail) {
            this.trail.shift();
            this.trail.push(this.position.copy());
        }

        // Move the boid
        this.position.add(this.velocity);
    }

    draw(trail = false, shape = "Triangle", direction = false, range = false, avoid = false) {
        // Draw the boid as a sphere with a line indicating its direction
        if (shape == "Circle") {
            stroke(0, 255, 0);
            strokeWeight(15);
            point(this.position.x, this.position.y);
        } else {
            // Draw the boid as a triangle
            strokeWeight(0);
            fill(0, 255, 0);
            let angle = this.velocity.heading();
            let a = createVector(0, -30).rotate(angle + PI / 2).add(this.position);
            let b = createVector(10, 0).rotate(angle + PI / 2).add(this.position);
            let c = createVector(-10, 0).rotate(angle + PI / 2).add(this.position);
            triangle(a.x, a.y, b.x, b.y, c.x, c.y);
        }

        if (direction) {
            stroke(255);
            strokeWeight(3);
            line(this.position.x, this.position.y, this.position.x + (this.velocity.x * 5), this.position.y + (this.velocity.y * 5));
        }

        // Add a trail behind the boid
        if (trail) {
            for (let i = 0; i < this.trail.length; i++) {
                let alpha = map(i, 0, this.trail.length, 0, 255);
                fill(255, 255, 255, alpha);
                stroke(255, 255, 255, alpha);
                strokeWeight(5);
                point(this.trail[i].x, this.trail[i].y);
            }
        }

        if (range) {
            noFill();
            stroke(0, 255, 0, 50);
            strokeWeight(2);
            ellipse(this.position.x, this.position.y, visible_range * 2);
        }

        if (avoid) {
            noFill();
            stroke(255, 0, 0, 50);
            strokeWeight(2);
            ellipse(this.position.x, this.position.y, avoidance_range * 2);
        }
    }
}