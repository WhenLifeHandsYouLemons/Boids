class PointOfInterest {
    constructor(x, y) {
        this.position = createVector(x, y);
    }

    draw(protect_range = false, attract_range = false) {
        stroke(255, 255, 0);
        strokeWeight(10);
        point(this.position.x, this.position.y);

        if (protect_range) {
            noFill();
            stroke(255, 255, 0, 100);
            strokeWeight(2);
            ellipse(this.position.x, this.position.y, poi_protection_range * 2);
        }

        if (attract_range) {
            noFill();
            stroke(255, 255, 0, 100);
            strokeWeight(2);
            ellipse(this.position.x, this.position.y, poi_attraction_range * 2);
        }
    }
}