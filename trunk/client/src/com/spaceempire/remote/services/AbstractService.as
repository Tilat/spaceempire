/**
 * User: Sergey
 * Date: 02.07.13
 * Time: 20:36
 */
package com.spaceempire.remote.services {
import com.spaceempire.utils.AppConfig;

import flash.events.Event;

import mx.controls.Alert;

import mx.messaging.ChannelSet;
import mx.messaging.channels.AMFChannel;
import mx.rpc.AbstractOperation;
import mx.rpc.events.FaultEvent;
import mx.rpc.events.ResultEvent;
import mx.rpc.remoting.RemoteObject;

public class AbstractService {

    public static const AUTH_ENDPOINT:String = "authEndpointImpl";

    private var _remoteObject:RemoteObject;
    private var _operation:RemoteOperation;

    public function AbstractService(endpointName:String, operation:RemoteOperation, handler:Function = null) {
        var channel:AMFChannel = new AMFChannel("endpointChannel", AppConfig.getServerAddress());
        var channels:ChannelSet = new ChannelSet();
        channels.addChannel(channel);
        _remoteObject = new RemoteObject(endpointName);
        _remoteObject.channelSet = channels;
        if (handler != null) {
            _remoteObject.addEventListener(ResultEvent.RESULT, handler);
        } else {
            _remoteObject.addEventListener(ResultEvent.RESULT, operation.getHandler);
        }
        _remoteObject.addEventListener(FaultEvent.FAULT, onError);
        this._operation = operation;
    }

    public function prepare():AbstractOperation {
        return this._remoteObject.getOperation(_operation.getName());
    }

    public function onError(e:Event):void {
        Alert.show("onError:" + e.toString());
    }
}
}
