/**
 * User: Sergey
 * Date: 02.07.11 22:32
 */
package com.spaceempire.context.event {
import flash.events.Event;

public class TestEvent extends Event {

    public static const TYPE:String = "Test";

    public function TestEvent() {
        super(TYPE);
    }


    override public function clone():Event {
        return new TestEvent();
    }
}
}

