import * as ex from 'excalibur';
import { baddieSpriteSheet, Resources } from "./resources";
import { Bot } from './bot';

export class Baddie extends ex.Actor {
    constructor(x: number, y: number, public dir: number) {
        super({
            name: 'Baddie',
            pos: new ex.Vector(x, y),
            collisionGroup: ex.CollisionGroupManager.groupByName("enemy"),
            collisionType: ex.CollisionType.Active,
            collider: ex.Shape.Box(32, 50, ex.Vector.Half, ex.vec(0, -1)) 
        });
    }

    onInitialize(engine: ex.Engine) {

        const left = ex.Animation.fromSpriteSheet(baddieSpriteSheet, [2, 3, 4, 5], 100);
        left.scale = new ex.Vector(2, 2);
        const right = ex.Animation.fromSpriteSheet(baddieSpriteSheet, [2, 3, 4, 5], 100);
        right.scale = new ex.Vector(2, 2);
        right.flipHorizontal = true;

        this.graphics.add("left", left)
        this.graphics.add("right", right);
        this.graphics.use("left");

        if ((window as any).__TESTING) {
            left.pause();
        }


        if (!(window as any).__TESTING) {
            this.actions.delay(1000)
                        .repeatForever(ctx => ctx
                            .moveBy(400 * this.dir, 0, 100)
                            .moveBy(-400 * this.dir, 0, 100));
        }

        this.on('postcollision', (evt) => this.onPostCollision(evt));
    }

    onPostCollision(evt: ex.PostCollisionEvent) {
        if (evt.other instanceof Bot && evt.side === ex.Side.Top) {
            this.actions.clearActions();
            this.body.collisionType = ex.CollisionType.PreventCollision;

            this.vel = new ex.Vector(0, -300);
            this.acc = ex.Physics.acc;
            this.angularVelocity = 2;
        }
    }

    onPostUpdate() {
        if (this.vel.x < 0) {
            this.graphics.use("left");
        } else if (this.vel.x > 0) {
            this.graphics.use("right");
        }
    }
    
}