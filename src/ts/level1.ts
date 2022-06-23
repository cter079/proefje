import "../css/styles.css"
import Matter from 'matter-js'
import * as PIXI from "pixi.js"

import coinImage from "../images/coin.png"
import platformImage from "../images/platform.png"
import groundImage from "../images/ground.png"
import playerImage from "../images/moon.png"
import jumpSoundFile from "url:../sound/jump.mp3"  
import coinSoundFile from "url:../sound/coin.mp3" 
import backgGroundImage from "../images/background.png"
import crateImage from "../images/crates.png";

import { Coin } from "./Coin"
import { Ground } from "./Ground"
import { Player } from "./Player"

import { Background } from "./background"

export class Level1 {

    pixi: PIXI.Application
    engine: Matter.Engine
    elements: ( Coin | Player)[] = []
    bg: PIXI.TilingSprite
    player: Player;
   



    constructor() {
        const container = document.getElementById("container")!
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        container.appendChild(this.pixi.view)
 
        

        this.engine = Matter.Engine.create()
        Matter.Events.on(this.engine, 'collisionStart', (event) => this.onCollision(event))

        this.pixi.loader
            .add("coin", coinImage)
            .add("platform", platformImage)
            .add("ground", groundImage)
            .add("player", playerImage)
            .add("jumpsound", jumpSoundFile)
            .add("coinsound", coinSoundFile)
            .add("background", backgGroundImage)

  
        this.pixi.loader.load(() => this.doneLoading())
    }
  

        
    
    
    doneLoading() {
        this.bg = new Background(this.pixi.loader.resources["background"].texture!, 5000, 900)
        this.pixi.stage.addChild(this.bg)
        let ground = new Ground(this.pixi.loader.resources["platform"].texture!, this, 500, 580, 224, 20,)
        this.pixi.stage.addChild(ground)
        let ground2 = new Ground(this.pixi.loader.resources["platform"].texture!, this, 300, 580, 224, 1000,)
        this.pixi.stage.addChild(ground2)
        let ground3 = new Ground(this.pixi.loader.resources["platform"].texture!, this, 100, 580, 224, 1000,)
        this.pixi.stage.addChild(ground3)
        let ground4 = new Ground(this.pixi.loader.resources["platform"].texture!, this, 724, 580, 224, 20,)
        this.pixi.stage.addChild(ground4)
        let ground5 = new Ground(this.pixi.loader.resources["platform"].texture!, this, 1000, 440, 224, 20,)
        this.pixi.stage.addChild(ground5)
        let ground6 = new Ground(this.pixi.loader.resources["platform"].texture!, this, 1448, 440, 224, 20,)
        this.pixi.stage.addChild(ground6)


        let player = new Player(this.pixi.loader.resources["player"].texture!, this)
        this.elements.push(player)
        this.pixi.stage.addChild(player)
        this.pixi.stage.x = this.pixi.screen.width / 2;
     
        

        setInterval(() => {
            
            let coin = new Coin(this.pixi.loader.resources["coin"].texture!, this)
         this.elements.push(coin)
            this.pixi.stage.addChild(coin)
            
        }, 2000)
       
        
        this.pixi.ticker.add(() => this.update())
    }

    update() {

        Matter.Engine.update(this.engine, 1000 / 60)

        for (let el of this.elements) {
            el.update()
        }
    }



    onCollision(event: Matter.IEventCollision<Matter.Engine>) {
        let collision = event.pairs[0]
        let [bodyA, bodyB] = [collision.bodyA, collision.bodyB]
        if (bodyA.label === "Coin" && bodyB.label === "Player") {
            let element = this.findSpriteWithRigidbody(bodyA)
            if (element) this.removeElement(element)
        }
        if (bodyA.label === "Player" && bodyB.label === "Coin") {
            let element = this.findSpriteWithRigidbody(bodyB)
            if (element) this.removeElement(element)
        }
        
    } 

    findSpriteWithRigidbody(rb: Matter.Body) {
        return this.elements.find((element) => element.rigidBody === rb)
    }

    removeElement(element:  Coin | Player) {
        element.beforeUnload()
        Matter.Composite.remove(this.engine.world, element.rigidBody)                           // stop physics simulation
        this.pixi.stage.removeChild(element)                                                    // stop drawing on the canvas
        this.elements = this.elements.filter((el:  Coin | Player) => el != element)      // stop updating
    }

    
}

