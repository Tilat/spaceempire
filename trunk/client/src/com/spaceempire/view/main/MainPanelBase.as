/**
 * User: Sergey
 * Date: 29.05.11
 * Time: 16:34
 */
package com.spaceempire.view.main {
import com.spaceempire.assets.AssetsManager;
import com.spaceempire.view.utils.HexGrid;

import flash.events.Event;
import flash.geom.Point;

import mx.events.FlexEvent;

import spark.components.Group;
import spark.effects.Scale;
import spark.primitives.BitmapImage;

public class MainPanelBase extends Group {

    [Bindable]
    public var hexGrid:HexGrid;
    [Bindable]
    public var effectScale:Scale;
    [Bindable]
    public var scaleStep:Number = 0.1;

    private var _scaleValue:Number = 1;

    public var currentPosition:Point = new Point(-50, -50);

    public function MainPanelBase() {
        super();
        this.addEventListener(FlexEvent.CREATION_COMPLETE, onCreate);
    }

    public function onCreate(e:Event):void {
        var background:BitmapImage = AssetsManager.getInstance().getBackground();
        this.addElementAt(background, 0);
    }


    public function onZoomIn(e:Event):void {
        if (Math.abs(_scaleValue) < 1) {
            scaleStep = (scaleStep < 0 ) ? scaleStep * -1 : scaleStep;
            effectScale.end();
            effectScale.play();
            _scaleValue = _scaleValue + scaleStep;
            hexGrid.x = ( 50 * 50 ) * _scaleValue / -2;
            hexGrid.y = ( 50 * Math.sqrt(3) / 2.0 * 50 ) * _scaleValue / -2;
        }

    }

    public function onZoomOut(e:Event):void {
        if (Math.abs(_scaleValue) > 0.5) {
            scaleStep = (scaleStep > 0 ) ? scaleStep * -1 : scaleStep;
            effectScale.end();
            effectScale.play();
            _scaleValue = _scaleValue + scaleStep;
            hexGrid.x = ( 50 * 50 ) * _scaleValue / -2;
            hexGrid.y = ( 50 * Math.sqrt(3) / 2.0 * 50 ) * _scaleValue / -2;
        }
    }


    public function onMoveUp(e:Event):void {
        hexGrid.y = hexGrid.y + Math.abs(_scaleValue) * 150;
    }

    public function onMoveDown(e:Event):void {
        hexGrid.y = hexGrid.y - Math.abs(_scaleValue) * 150;
    }

    public function onMoveLeft(e:Event):void {
        hexGrid.x = hexGrid.x + 200 * Math.abs(_scaleValue);
    }

    public function onMoveRight(e:Event):void {
        hexGrid.x = hexGrid.x - 200 * Math.abs(_scaleValue);
    }


}
}
