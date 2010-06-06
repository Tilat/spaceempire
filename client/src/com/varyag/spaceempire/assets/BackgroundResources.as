package com.varyag.spaceempire.assets {
import flash.display.Bitmap;
import flash.display.Sprite;

public class BackgroundResources {

    [Embed(source="./background2.png")]
    public var _backGroundImage:Class;

    private static var _instance:BackgroundResources;

    public static function getInstance():BackgroundResources {
        if (null == _instance) {
            _instance = new BackgroundResources();
        }
        return _instance;
    }


    public function getBackground():Sprite {
        var bitmap:Bitmap = new _backGroundImage();
        bitmap.cacheAsBitmap = true;
        var sprite:Sprite = new Sprite();
        sprite.addChild(bitmap);
        return sprite;
    }

}
}