package ru.spaceempire.server.game.managers.map;

import org.springframework.stereotype.Service;
import ru.spaceempire.server.game.managers.SolarSystemMapManager;

/**
 * User: Sergey
 * Date: 10.07.11 13:40
 */
@Service
public class SolarSystemMapManagerImpl implements SolarSystemMapManager {

    public static final int LINE_SIZE = 50;
    //    _lineSize * (Math.sqrt(3.0) / 2.0); // 0.8660
    private static final int bLINE_SIZE = (int) (LINE_SIZE * Math.sqrt(3) / 2);
    //    _lineSize *   _lineSize * 0.5 ; // 0.5000
    private static final int cLINE_SIZE = (int) (LINE_SIZE * 0.5);


    public String getMapPathForSolarSystem(Long solarSystemId) {
        StringBuilder builder = new StringBuilder();
//        builder.append("M 0 ").append(LINE_SIZE).append(' ');
        int x = 0;
        int y = 0;
        for (int row = 0; row < 64; row++) {
            for (int column = 0; column < 64; column++) {
                x = (cLINE_SIZE + LINE_SIZE) * column;
                y = LINE_SIZE + (bLINE_SIZE * 2) * row + (isOdd(column) ? bLINE_SIZE : 0);
                builder.append("M ").append(x).append(' ').append(y).append(' ');
                addHexagon(x, y, builder);
            }
        }
        return builder.toString();
    }

    private boolean isOdd(int value) {
        return value % 2 != 0;
    }

    private void addHexagon(int x, int y, StringBuilder builder) {
        builder.append("L ").append(x + cLINE_SIZE).append(' ').append(y - bLINE_SIZE).append(' ');
        builder.append("L ").append(x + cLINE_SIZE + LINE_SIZE).append(' ').append(y - bLINE_SIZE).append(' ');
        builder.append("L ").append(x + cLINE_SIZE * 2 + LINE_SIZE).append(' ').append(y).append(' ');
        builder.append("L ").append(x + cLINE_SIZE + LINE_SIZE).append(' ').append(y + bLINE_SIZE).append(' ');
        builder.append("L ").append(x + cLINE_SIZE).append(' ').append(y + bLINE_SIZE).append(' ');
        builder.append("Z ");
    }

    public static void main(String[] args) {
        SolarSystemMapManagerImpl mgr = new SolarSystemMapManagerImpl();
        System.out.println(mgr.getMapPathForSolarSystem(1L));
    }
}
