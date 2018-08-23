/*
    @author    : Marcel Groeneweg
    @copyright : ITvisors
    @license   : Apache 2
*/

require([
    "dojo/_base/declare", "mxui/widget/_WidgetBase",
    "DragAndDropSupportWidget/lib/jquery.ui.touch-punch"
], function (declare, _WidgetBase, $) {
    "use strict";

    return declare("DragAndDropSupportWidget.widget.DraggableWidget", [ _WidgetBase ], {

        // Modeler parameters
        draggableClass: "",
        dragContainment: "",
        makeClone: true,

        // Internal variables
        _contextObject: null,

        postCreate: function () {
            this._setupEvents();
        },

       update: function (object, callback) {
            this._contextObject = object;
            this._setDataAttributes();
            if (callback) {
                callback();
            }
        },

        _setupEvents: function () {
            // http://api.jqueryui.com/draggable/
            var options = {
                containment: this.dragContainment || false,
                revert: "invalid",
                helper: this.makeClone ? "clone" : "original"
            };
            $(this.domNode.parentElement)
                .addClass(this.draggableClass)
                .draggable(options);
        },

        _setDataAttributes: function () {
            var type = this._contextObject && this._contextObject.getEntity() || "";
            var guid = this._contextObject && this._contextObject.getGuid() || "";

            $(this.domNode.parentElement).attr({
                "data-object-type" : type,
                "data-object-guid" : guid
            }).draggable(this._contextObject ? "enable" : "disable");
        }

    });
});
