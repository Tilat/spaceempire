/**
 * User: Sergey
 * Date: 29.05.11
 * Time: 16:34
 */
package com.spaceempire.view.main {
import com.spaceempire.assets.AssetsManager;

import flash.display.Graphics;
import flash.events.Event;

import mx.events.FlexEvent;

import spark.components.Group;
import spark.primitives.BitmapImage;
import spark.primitives.Path;

public class MainPanelBase extends Group {

    [Bindable]
    public var idPath:Path;

    public function MainPanelBase() {
        super();
        this.addEventListener(FlexEvent.CREATION_COMPLETE, onCreate);
    }

    public function onCreate(e:Event):void {
        var background:BitmapImage = AssetsManager.getInstance().getBackground();
        this.addElementAt(background, 0);
    }

    public function onMove(e:Event):void {
        idPath.x = idPath.x + 20;
        idPath.y = idPath.y + 20;
    }

    public function onScale(e:Event):void {
        idPath.scaleX = idPath.scaleX * 0.90;
        idPath.scaleY = idPath.scaleY * 0.90;
    }

}
}
