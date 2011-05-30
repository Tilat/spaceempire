/**
 * User: Sergey
 * Date: 29.05.11
 * Time: 16:34
 */
package com.spaceempire.view.main {
import com.spaceempire.assets.AssetsManager;

import flash.display.Graphics;
import flash.events.Event;

import mx.controls.Alert;

import mx.events.FlexEvent;

import spark.components.Group;
import spark.primitives.BitmapImage;

public class MainPanelBase extends Group {

    public function MainPanelBase() {
        super();
        this.addEventListener(FlexEvent.CREATION_COMPLETE, onCreate);
    }

    public function onCreate(e:Event):void {
        Alert.show("before");
        try {
            var background:BitmapImage = AssetsManager.getInstance().getBackground();
            this.addElementAt(background,0);
            var graphics:Graphics = this.graphics;

        } catch(e:Error) {
            Alert.show(e.message + "\n" +e.getStackTrace());
        }
    }

}
}
