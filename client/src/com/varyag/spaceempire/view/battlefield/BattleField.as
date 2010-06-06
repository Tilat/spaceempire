package com.varyag.spaceempire.view.battlefield {
import com.varyag.spaceempire.utils.CoodUtils;

import flash.display.Graphics;
import flash.events.Event;

import mx.core.Container;
import mx.events.FlexEvent;

public class BattleField extends Container {

    private var _side:Number = 34;
    private var _columnsCount:Number = 13;
    private var _rowsCount:Number = 10;

    public function BattleField() {
        super();
        addEventListener(FlexEvent.CREATION_COMPLETE, onCreationCompleted);
    }

    public function onCreationCompleted(e:Event):void {
        this.doDrawhexGrid();
    }

    public function doDrawhexGrid():void {
        for (var i:int = 0; i < _columnsCount; i++) {
            for (var j:int = 0; j < _rowsCount; j++) {
                this.doDrawHexCell(i, j);
            }
        }
    }

    public function doDrawHexCell(xcord:int, ycord:int):void {
        var angle:Number = Math.sqrt(3) / 2;
        var hdelta:int = angle * _side;
        var vdelta:int = _side * 0.5;

        var canvasGraph:Graphics = this.graphics;

        canvasGraph.beginFill(0xffffff, 0.10);
        xcord = CoodUtils.colToX(xcord, ycord, hdelta);
        ycord = CoodUtils.rowToY(ycord, _side, vdelta);
        canvasGraph.moveTo(xcord, ycord);
        canvasGraph.lineStyle(1, 0xbbaacc);

        for (var i:int = 0; i < 6; i++) {
            var sign:int = (i / 3);
            xcord = xcord + (sign ? -1 : 1) * hdelta * (1 - (i % 3));
            ycord = ycord + (sign ? -1 : 1) * ( (i % 3) == 1 ? _side : vdelta );
            canvasGraph.lineTo(xcord, ycord);
        }
        canvasGraph.endFill();
    }


}
}