import * as ex from 'excalibur';

const botFile = require('../res/excalibot.png');
const botRedFile = require('../res/excalibot-red.png');
const baddieFile = require('../res/baddie.png');
const blockFile = require('../res/block.png');

const Resources = {
    bot: new ex.ImageSource(botFile),
    botRed: new ex.ImageSource(botRedFile),
    baddie: new ex.ImageSource(baddieFile),
    block: new ex.ImageSource(blockFile),
}

const loader = new ex.Loader();

const botSpriteSheet = ex.SpriteSheet.fromImageSource({
    image:Resources.bot, 
    grid: { 
        columns: 8,
        rows: 1, 
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const botRedSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.botRed,
    grid: {
        columns: 8, 
        rows: 1,
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const baddieSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.baddie,
    grid: {
        columns: 6, 
        rows: 1,
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const blockSprite = Resources.block.toSprite();

for (const res in Resources) {
    loader.addResource((Resources as any)[res]);
}

export { Resources, loader, botSpriteSheet, botRedSpriteSheet, baddieSpriteSheet, blockSprite }