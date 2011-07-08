/**
 * User: Sergey
 * Date: 02.07.11 22:30
 */
package com.spaceempire.context {
import com.spaceempire.remote.services.RemoteOperation;
import com.spaceempire.remote.services.delegates.auth.LoginOperation;
import com.spaceempire.utils.MainViewStages;
import com.spaceempire.view.utils.ViewStack;

import flash.events.EventDispatcher;

public class AppContext extends EventDispatcher {

    private var _mainViewController:ViewStack;


    public function AppContext() {
        super();
    }

    public function loadConfig():void {
        init();
    }

    private function init():void {
        var login:RemoteOperation = new LoginOperation();
        login.invoke("login", "passwword");
        _mainViewController.selectedIndex = MainViewStages.SPACE_PANEL;
    }

    public function get mainViewController():ViewStack {
        return _mainViewController;
    }

    public function set mainViewController(value:ViewStack):void {
        _mainViewController = value;
    }
}
}
