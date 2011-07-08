/**
 * User: Sergey
 * Date: 02.07.13 20:48
 */
package com.spaceempire.remote.services {
public interface RemoteOperation {
    function getName():String;

    function getHandler():Function;

    function invoke(... args:Array):void;
}
}
