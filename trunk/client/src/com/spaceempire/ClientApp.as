package com.spaceempire {
import com.spaceempire.view.main.MainPanel;

import flash.events.Event;

import mx.controls.Alert;
import mx.events.FlexEvent;

import spark.components.Application;

public class ClientApp extends Application {

//    [Bindable]
//    public var mainPanel:MainPanel;

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
    }
}
}