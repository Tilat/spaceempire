/**
 * User: Sergey
 * Date: 02.07.13 20:41
 */
package com.spaceempire.utils {
public class AppConfig {

    private static var HOST:String = "127.0.0.1";
    private static var PORT:String = "8080";

    public function AppConfig() {
    }

    public static function getServerAddress():String {
        return "http://" + HOST + ":" + PORT + "/messagebroker/";
    }
}
}
