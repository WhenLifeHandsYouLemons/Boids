# Boids Flocking Algorithm

## Main Factors

A boid is an object that tries to mimic the mannerisms of a bird (hence the name, boid for bird-oid). Boids are run based on three simple rules: **Coherence**, **Separation**, and **Alignment**. Using just those three rules, we're able to simulate how a flock of birds might fly (or even, how a school of fish might swim).

### Coherence

Coherence is a value determining how grouped together the flock might be. The higher the value, the more bunched up the flock will be. They'll tend to be in one large group instead of multiple smaller groups.

### Separation

Separation determines how much space there is between boids. If the value is low, the boids don't care much about other boids' personal space. If the value is higher, then the personal space of each boid is more respected and boids steer away from getting too close. This doesn't affect the actual personal space for each boid, but it changes the importance of keeping that space.

### Alignment

Alignment is very similar to coherence where boids will want to be clumped together more, but alignment cares more about orientation than grouping. The higher the alignment, the more the boids try to face the same direction.

## Other Factors

We can also implememt other factors that control the boids to make them seem more like birds. Three such factors are: **Enemy boid avoidance**, **Points of interest**, and **Visible range**.

### Enemy Boid Avoidance



### Points of Interest



### Visible Range

