package com.varyag.spaceempire.utils {
public class CoodUtils {
    public function CoodUtils() {
    }


    public static function colToX(column:int, row:int, hdelta:int):int {
        return  column * 2 * hdelta + hdelta * (row % 2) + hdelta;
    }

    public static function rowToY(row:int, side:int, vdelta:int):int {
        return row * (side + vdelta);
    }

}
}