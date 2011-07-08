package com.spaceempire {
import com.spaceempire.context.AppContext;
import com.spaceempire.view.main.MainPanelBase;
import com.spaceempire.view.utils.ViewStack;

import flash.events.Event;

import mx.events.FlexEvent;

import spark.components.Application;

public class ClientApp extends Application {

    [Bindable]
    public var mainPanel:MainPanelBase;
    [Bindable]
    public var viewStack:ViewStack;

    private var _appContext:AppContext;

    public function ClientApp() {
        super();
        this.addEventListener(FlexEvent.PREINITIALIZE, onPreInit);
        this.addEventListener(FlexEvent.INITIALIZE, onInit);
        this.addEventListener(FlexEvent.CREATION_COMPLETE, onCreate);
    }

    public function onInit(e:Event):void {
        this.removeEventListener(FlexEvent.INITIALIZE, onInit);
    }

    public function onPreInit(e:Event):void {
        this.removeEventListener(FlexEvent.PREINITIALIZE, onPreInit);
    }

    public function onCreate(e:Event):void {
        this.removeEventListener(FlexEvent.CREATION_COMPLETE, onCreate);
        createAppContext();
    }

    private function createAppContext():void {
        _appContext = new AppContext();
        _appContext.mainViewController = viewStack;
        _appContext.loadConfig();
    }
}
}