/**
 * User: Sergey
 * Date: 03.07.11 13:08
 */
package com.spaceempire.remote.services.delegates.auth {
import com.spaceempire.remote.services.AbstractService;
import com.spaceempire.remote.services.RemoteOperation;

import flash.events.Event;

import mx.controls.Alert;

public class LoginOperation extends AbstractService implements RemoteOperation {

    public function LoginOperation(handler:Function = null) {
        super(AUTH_ENDPOINT, this, handler);
    }

    public function getName():String {
        return "login";
    }

    public function invoke(... args):void {
        prepare().send(args[0], args[1]);
    }

    public function getHandler():Function {
        return onResult;
    }

    public function onResult(e:Event):void {
        Alert.show("onResult:" + e.toString());
    }

}
}
