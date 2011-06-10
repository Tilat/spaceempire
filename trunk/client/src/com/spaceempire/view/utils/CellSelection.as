package com.spaceempire.view.utils {
import spark.primitives.Graphic;

public class CellSelection extends Graphic {

    private var _cell:HexCell;

    public function CellSelection(cell:HexCell) {
        super();
        this._cell = cell;
    }

    public function get cell():HexCell {
        return _cell;
    }

    public function set cell(value:HexCell):void {
        _cell = value;
    }
}
}