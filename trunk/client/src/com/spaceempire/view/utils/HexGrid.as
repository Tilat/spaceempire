package com.spaceempire.view.utils {
import flash.events.Event;
import flash.events.MouseEvent;
import flash.geom.Point;

import mx.controls.Alert;
import mx.events.FlexEvent;
import mx.graphics.SolidColorStroke;
import mx.utils.StringUtil;

import spark.primitives.Ellipse;
import spark.primitives.Graphic;

[Event(name = "myTestEvent" , type = "flash.events.Event")]

public class HexGrid extends Graphic {
    private var _rows:int = 5;
    private var _columns:int = 5;
    private var _path:String;
    private var _cells:Array;
    private var _lineColor:int = 0x4769C4;
    private var _lineWeight:int = 1;
    private var _lineTransparency:Number = 0.8;
    private var _lineSize:int = 50;
    //    _lineSize * (Math.sqrt(3.0) / 2.0); // 0.8660
    private var _bLineSize:int = 43.0;
    //    _lineSize *   _lineSize * 0.5 ; // 0.5000
    private var _cLineSize:int = 25.0;

    public function HexGrid() {
        super();
        this.addEventListener(FlexEvent.ADD, onAdd);
        //        this.addEventListener(MouseEvent.DOUBLE_CLICK, onDoubleClick);
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

    protected function getXbyColumn(column:int):int {
        return column * (  _cLineSize + _lineSize) + _lineSize;
    }

    protected function getYbyRow(row:int, column:int):int {
        return  row * 2 * _bLineSize + ( isEven(column) ? 0 : _bLineSize ) + _lineSize;
    }

    public function onCellClick(e:Event):void {
        try {
            var event:MouseEvent = e as MouseEvent;
            var column:int = event.localX / ( _lineSize + _cLineSize );
            var row:int = isEven(column) ? (event.localY ) / ( 2 * _bLineSize) : (event.localY - _bLineSize) / ( 2 * _bLineSize);

            if (column < 0 || column > 50 || row < 0 || row > 50) {
                return;
            }

            var possibleX:int = column * (  _cLineSize + _lineSize) + _lineSize;
            var possibleY:int = row * 2 * _bLineSize + ( isEven(column) ? 0 : _bLineSize ) + _lineSize;


            var distance:Number = Math.sqrt(Math.pow(possibleX - event.localX, 2) + Math.pow(possibleY - event.localY, 2));
            if (distance > _lineSize) {

                if (column != 0 && column != 50) {
                    column = column - 1;
                    possibleX = getXbyColumn(column);
                    possibleY = getYbyRow(row, column);
                    distance = Math.sqrt(Math.pow(possibleX - event.localX, 2) + Math.pow(possibleY - event.localY, 2));
                    if (distance > _lineSize) {
                        row = row - 1;
                        possibleX = getXbyColumn(column);
                        possibleY = getYbyRow(row, column);
                        distance = Math.sqrt(Math.pow(possibleX - event.localX, 2) + Math.pow(possibleY - event.localY, 2));
                        if (distance > _lineSize) {
                            return;
                        }
                    }
                }
            }

            var red:Ellipse = new Ellipse();
            red.stroke = new SolidColorStroke(0xFF0000, 1, 1);
            red.height = 2 * _bLineSize - 2;
            red.width = 2 * _bLineSize - 2;
            red.left = 0;
            red.top = 0;
            var hexCell:HexCell = _cells[column][row] as HexCell;
            var selection:CellSelection = new CellSelection(hexCell);
            selection.left = possibleX - _lineSize + (_lineSize - _bLineSize) + 1;
            selection.top = possibleY - _lineSize + (_lineSize - _bLineSize) + 1;
            selection.addElementAt(red, 0);
            selection.addEventListener(MouseEvent.CLICK, onSelectedClick);
            hexCell.selection = selection;
            this.addElementAt(selection, 0);
        } catch(err:Error) {
            Alert.show(err.message);
        }
    }


    public function onSelectedClick(e:Event):void {
        var selection:CellSelection = e.target as CellSelection;
        this.removeElement(selection);
    }

    protected function isEven(value:Number):Boolean {
        return (value % 2 >= 0 && value % 2 < 1 );
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