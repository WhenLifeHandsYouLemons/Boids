# Boids Flocking Algorithm

## About

This is a website for experimenting with the boids flocking algorithm. You can visit the website and play around with the algorithm's parameters at [boids.sooraj.dev](https://boids.sooraj.dev/). A "**boid**" is an object that tries to mimic the mannerisms of a bird (hence the name, _boid_ for _bird-oid_) using some simple rules and can become much more complex by adding extra rules.

## Main Factors

Boids are run based on three simple rules: **[Coherence](#coherence)**, **[Separation](#separation)**, and **[Alignment](#alignment)**. Using just those three rules, we're able to simulate how a flock of birds might fly (or even, how a school of fish might swim).

### Coherence

Coherence is a value determining how grouped together the flock might be. The higher the value, the more bunched up the flock will be. They'll tend to be in one large group instead of multiple smaller groups.

### Separation

Separation determines how much space there is between boids. If the value is low, the boids don't care much about other boids' personal space. If the value is higher, then the personal space of each boid is more respected and boids steer away from getting too close. This doesn't affect the actual personal space for each boid, but it changes the importance of keeping that space.

### Alignment

Alignment is very similar to [coherence](#coherence) where boids will want to be clumped together more, but alignment cares more about orientation than grouping. The higher the alignment, the more the boids try to face the same direction.

## Other Factors

We can also implememt other factors that control the boids to make the boids act more like birds. Three such factors are: **[Enemy Boid Avoidance](#enemy-boid-avoidance)**, **[Points of Interest](#points-of-interest)**, and **[Visible Range](#visible-range)**.

### Enemy Boid Avoidance

We can create enemy boids that the flock will try to avoid. These "enemy" boids can also have their own custom rule to follow the "friendly" boids around. This can create a more dynamic simulation. The enemy boids can be tuned to be more or less aggressive and aren't attracted to any [points of interest](#points-of-interest). However, they are repelled by the points of interest.

### Points of Interest

Points of interest are locations that the "friendly" boids will try to move towards. This can be used to simulate food sources. The "friendly" boids will try to move towards the points of interest, but they won't be able to get too close to them. "Enemy" boids are not attracted to the points of interest, only the repulsion.

### Visible Range

The visible range is the radius around each boid that it can see other boids. If a boid is outside of the visible range, then it won't be considered in the calculations for movnig the boid. This is used to simulate how birds are only able to see other birds that are close to them. This value affects the range for both the "friendly" and "enemy" boids. The three [main factors](#main-factors) would be affected by the visible range to find neighbours.

## Extras

This could be expanded on even more by adding more rules or changing the existing rules. For example, we could add a rule for boids to follow a path. We could also add an extra dimension and make the simulation work in 3D! The possibilities are endless!

---

This project is licensed under the MIT License. You can find a copy of the license in the [LICENSE](LICENSE) file.

Created and hosted by [Sooraj](https://sooraj.dev/).
