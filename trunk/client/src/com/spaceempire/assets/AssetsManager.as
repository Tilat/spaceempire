/**
 * User: Sergey
 * Date: 29.05.11
 * Time: 16:43
 */
package com.spaceempire.assets {
import flash.display.BitmapData;

import mx.core.BitmapAsset;

import spark.primitives.BitmapImage;

public class AssetsManager {

    [Embed(source="./images/backgrounds/space2.jpg")]
    public var backGroundImage:Class;

    private static var _instance:AssetsManager;

    public static function getInstance():AssetsManager {
        if (null == _instance) {
            _instance = new AssetsManager();
        }
        return _instance;
    }

    public function getBackground():BitmapImage {
        var bitmap:BitmapAsset = new backGroundImage();
        var bitmapImage:BitmapImage = new BitmapImage();
        bitmapImage.source = bitmap;
        return bitmapImage;
    }

}
}
