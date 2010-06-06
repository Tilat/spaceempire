package com.varyag.spaceempire {
import com.varyag.spaceempire.assets.BackgroundResources;

import flash.display.Sprite;
import flash.events.Event;

import mx.core.Application;
import mx.core.UIComponent;
import mx.events.FlexEvent;

public class SpaceEmpireClientApp extends Application {
    public function SpaceEmpireClientApp() {
        this.addEventListener(FlexEvent.CREATION_COMPLETE, onCreationCompleted);
    }

    public function onCreationCompleted(e:Event):void {
//        this.doCreatebackGround();
    }

    public function doCreatebackGround():void {
        var background:Sprite = BackgroundResources.getInstance().getBackground();
        var uicomp:UIComponent = new UIComponent();
        uicomp.addChild(background);
        uicomp.x = 0;
        uicomp.y = 0;
        this.addChild(uicomp);
    }

}
}