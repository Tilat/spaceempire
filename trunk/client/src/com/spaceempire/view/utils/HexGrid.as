package com.spaceempire.view.utils {
import flash.events.Event;

import mx.controls.Alert;
import mx.events.FlexEvent;

import mx.graphics.SolidColorStroke;

import spark.primitives.Graphic;

public class HexGrid extends Graphic {
    private var _rows:int = 5;
    private var _columns:int = 5;
    private var _path:String;
    private var _cells:Array;

    public function HexGrid() {
        super();
        this.addEventListener(FlexEvent.ADD, onAdd);
    }

    public function onAdd(e:Event):void {
        try {
            var r:int = 0;
            _cells = new Array();

            for (r = 0; r < _rows; r++) {
                _cells = new Array();
            }
            var paths:Array = splitPathString(_path);

            for (var c:int = 0; c < _columns; c++) {
                for (r = 0; r < _rows; r++) {
                    var hexCell:HexCell = new HexCell();
                    hexCell.column = c;
                    hexCell.column = r;
                    hexCell.data = paths[c][r];
                    hexCell.stroke = new SolidColorStroke(0x4769C4, 1, 0.9);
                    var arr:Array = _cells[r] as Array;
                    arr [c] = hexCell;
                    this.addElementAt(hexCell, 0);
                }
            }
            //            mxmlContent = paths;
        } catch(err:Error) {
            trace(err.getStackTrace());
            if (err != null) {
                Alert.show(err.message);
                Alert.show(err.getStackTrace());
            }
        }

    }

    protected function splitPathString(str:String):Array {
        var pathsArray:Array = str.split("Z");
        var result:Array = new Array();
        for (var c:int = 0; c < _columns; c++) {
            result[c] = new Array();
            for (var r:int = 0; r < _rows; r++) {
                var arr:Array = result[c] as Array;
                arr[r] = pathsArray[ r * _rows + c] as String;
            }
        }
        return result;
    }

    public function get rows():int {
        return _rows;
    }

    public function set rows(value:int):void {
        _rows = value;
    }

    public function get columns():int {
        return _columns;
    }

    public function set columns(value:int):void {
        _columns = value;
    }


    public function get path():String {
        return _path;
    }

    public function set path(value:String):void {
        _path = value;
    }
}
}