package com.spaceempire.view.utils {
import flash.geom.Point;

import spark.primitives.Path;

public class HexCell extends Path {
    private var _column:int;
    private var _row:int;
    private var _linepath:String;
    private var _position:Point;

    public function HexCell() {
        super();
    }

    public function get column():int {
        return _column;
    }

    public function set column(value:int):void {
        _column = value;
    }

    public function get row():int {
        return _row;
    }

    public function set row(value:int):void {
        _row = value;
    }

    public function get linepath():String {
        return _linepath;
    }

    public function set linepath(value:String):void {
        _linepath = value;
    }

    public function get position():Point {
        return _position;
    }

    public function set position(value:Point):void {
        _position = value;
    }
}
}