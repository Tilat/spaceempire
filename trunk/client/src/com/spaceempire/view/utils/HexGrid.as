package com.spaceempire.view.utils {
import flash.events.Event;
import flash.events.MouseEvent;
import flash.geom.Point;

import mx.controls.Alert;
import mx.events.FlexEvent;
import mx.graphics.SolidColor;
import mx.graphics.SolidColorStroke;
import mx.utils.StringUtil;

import spark.primitives.Ellipse;
import spark.primitives.Graphic;
import spark.primitives.Line;

public class HexGrid extends Graphic {
    private var _rows:int = 5;
    private var _columns:int = 5;
    private var _path:String;
    private var _cells:Array;
    private var _lineColor:int = 0x4769C4;
    private var _lineWeight:int = 1;
    private var _lineTransparency:Number = 0.8;
    private var _lineSize:Number = 50;
    private var _bLineSize:Number = _lineSize * Math.sqrt(3.0) / 2.0;
    private var _cLineSize:Number = _lineSize * 0.5;

    public function HexGrid() {
        super();
        this.addEventListener(FlexEvent.ADD, onAdd);
        this.addEventListener(MouseEvent.DOUBLE_CLICK, onDoubleClick);
        this.addEventListener(MouseEvent.CLICK, onCellClick);
    }

    public function onDoubleClick(e:Event):void {
    }

    public function onAdd(e:Event):void {
        this.removeEventListener(FlexEvent.ADD, onAdd);
        var r:int = 0;
        _cells = new Array();

        for (r = 0; r < _rows; r++) {
            _cells.push(new Array());
        }
        var paths:Array = splitPathString(_path);

        for (var c:int = 0; c < _columns; c++) {
            for (r = 0; r < _rows; r++) {
                var hexCell:HexCell = new HexCell();
                hexCell.column = c;
                hexCell.column = r;
                hexCell.data = paths[c][r];
                hexCell.position = evaluatePosition(paths[c][r]);
                hexCell.stroke = new SolidColorStroke(_lineColor, _lineWeight, _lineTransparency);
                _cells[r][c] = hexCell;
                this.addElementAt(hexCell, 0);
            }
        }
    }

    protected function evaluatePosition(path:String):Point {
        if (path != null && path.length > 5) {
            var lines:Array = path.split("L");
            var X_Y:String = (lines[0] as String).replace("M", "");
            var coordinates:Array = StringUtil.trim(X_Y).split(" ");
            var xValue:int = parseInt(coordinates[0]);
            var yValue:int = parseInt(coordinates[1]);
            return new Point(xValue, yValue);
        }
        return new Point(0, 0);
    }

    protected function splitPathString(str:String):Array {
        var pathsArray:Array = str.split("Z");
        var result:Array = new Array();
        for (var c:int = 0; c < _columns; c++) {
            result[c] = new Array();
            for (var r:int = 0; r < _rows; r++) {
                result[c][r] = (pathsArray[ c * _rows + r] as String) + " Z ";
            }
        }
        return result;
    }

    public function onCellClick(e:Event):void {
        try {
            var event:MouseEvent = e as MouseEvent;
            var column:Number = event.localX / ( _lineSize + _bLineSize );
            var row:Number = ( event.localY ) / (2 * _bLineSize);
            var x_center:int;
            var y_center:int;
            var max_column:int = Math.ceil(column);
            var min_column:int = Math.floor(column);
            var max_row:int = Math.ceil(row);
            var min_row:int = Math.floor(row);
            x_center = max_column * (_lineSize + _cLineSize);
            if (isEven(column)) {
                y_center = max_row * 2 * _bLineSize;
            } else {
                y_center = 2 * _bLineSize * max_row + _bLineSize;
            }
            var arc:Ellipse = new Ellipse();
            arc.width = _lineSize * 2;
            arc.height = _lineSize * 2;
            arc.stroke = new SolidColorStroke(0x000000, 1, 1);
            arc.fill = new SolidColor(0x000000, 1);
            arc.x = event.localX - _lineSize;
            arc.y = event.localY - _lineSize;
            this.addElementAt(arc, 0);

            //            var arc:Line = new Line();
            //            arc.xFrom = event.localX ;
            //            arc.yFrom = event.localY ;
            //            arc.xTo = event.localX + 50 ;
            //            arc.yTo = event.localX + 50 ;
            //            arc.stroke = new SolidColorStroke(0x000000, 1, 1);
            //            this.addElement(arc);

        } catch(err:Error) {
            Alert.show("msg" + err.message);
        }
    }


    protected function isEven(value:Number):Boolean {
        return (value % 2 > 0 && value % 2 < 1 );
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