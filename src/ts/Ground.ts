import * as PIXI from "pixi.js"
import { Level1 } from "./level1"
import Matter from 'matter-js'
import { Sprite } from "pixi.js"

export class Ground extends PIXI.Sprite {

    rigidBody: Matter.Body
    
    constructor(texture: PIXI.Texture, game: Level1, x: number, y:number, xwidth:number, ywidth:number ) {
        super(texture)
        this.anchor.set(0.5)
                this.rigidBody = Matter.Bodies.rectangle(x,y,xwidth,ywidth, { isStatic: true, label:"Ground" }) //x,y,w,h

        Matter.Composite.add(game.engine.world, this.rigidBody)

        // update just once to set the sprite initial position
        this.update()
    }

    update() {
        this.x = this.rigidBody.position.x
        this.y = this.rigidBody.position.y
    }
}
