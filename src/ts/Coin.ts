import * as PIXI from "pixi.js"
import Matter from 'matter-js'
import { Level1 } from "./level1"

export class Coin extends PIXI.Sprite {

    rigidBody: Matter.Body
    coinSound:HTMLAudioElement
    game:Level1
    
    constructor(texture: PIXI.Texture, game: Level1,) {
        super(texture)
        this.game = game

        this.anchor.set(0.5)

        this.rigidBody = Matter.Bodies.circle(1520, 540, 30, { friction: 0.00001, restitution: 0, density: 0.001, label: "Coin" }) //x,y,radius
        Matter.Composite.add(game.engine.world, this.rigidBody)
        
        this.coinSound = game.pixi.loader.resources["coinsound"].data!
    }

    update() {
        this.position.set(this.rigidBody.position.x, this.rigidBody.position.y)
        this.rotation = this.rigidBody.angle

    }
    resetPosition() {
        Matter.Body.setPosition(this.rigidBody, {x:120, y:30})
        Matter.Body.setVelocity(this.rigidBody, {x:0, y:0})
        Matter.Body.setAngularVelocity(this.rigidBody, 0)
    }

    

    beforeUnload() {
        this.coinSound.play()
    }
}
