Drag and drop support
=======================

Draggable and Droppable Widget

## Description
The Draggable and Droppable widgets enable drag and drop support on Mendix pages, also on touch devices.

Have a look at the screen shots or try the test project in the GitHub repository.

## Typical Usage Scenario

- Drag item from a listview onto another page element to add them to a list or as detail to a master object.
- Reorder items in a list.

## Features And Limitations

- Droppable widget calls a microflow when an item is dropped on it.
- Microflow receives an object that contains references to the dragged item and the drop target item.
- One droppable widget can accept different draggable objects. This is useful when new items may be dragged onto a template grid and grid items may be reordered on the same page. The demo project has an example of this.
- Uses jQuery UI under the hood, touch support by [http://touchpunch.furf.com/](http://touchpunch.furf.com/).
- Non-persistent entities are supported and actually preferred for the drop target.

## Installation

Normal installation using the App Store

## Dependencies
 
- Mendix 6.10.10 Environment

## Configuration

### Non-persistent entities
It is advised to use non-persistent entities as onDropEntity for this widget.


## Properties
### Draggable widget

#### Draggable class
This class is added to the direct parent of the draggable widget. The default enables some default styling like the drop shadow under the item being dragged and the cursor icon. It is possible to use your own. You may also specify multiple classes by separating then using a space. 

This class can also be used on the droppable widget to allow only items having the specified class.

#### Drag containment CSS selector
When you specify a CSS selector here, the items may only be dragged within that element.

An example:

To limit dragging to the listview that contains the items, give the listview a meaningful name and then specify: .mx-name-*nameOfTheListview*

#### Make clone
Make a clone or drag the item itself. In general:

- When dragging an item from a list of available items to another object, make a clone.
- When dragging to reorder items, do not make a clone.

### Droppable widget

#### Target class
This class is added to the drop target. Specify multiple classes by separating then using a space.

#### Target hover class
This class is added to the drop target when an acceptable item is dragged over the drop target. The default will draw a green border.

#### Target CSS selector
Optional, the selector to find the element to turn into a drop target. Leave empty to use the parent of the widget. This is a CSS selector, not a class.

An example:

To select the toolbar of a  template grid as drop target, give the template grid a meaningful name and then specify:

.mx-name-*nameOfTheTemplateGrid* .mx-grid-toolbar

This allows items to be dropped on an empty template grid.

#### Accept CSS selector
Optional, a selector indicating which draggable elements are accepted. Leave empty to accept any draggable. This is a CSS selector, not a class. For example:

- Set this property to .MyDraggableObject
- Add class MyDraggableObject to the Draggable class property of the draggable widget. (Leave the default, there must be two classes separated by a space.)

#### Droppable entities
Define the entities that may be dropped here. If you define an entity multiple times, each entry will be processed. At least one item must be created here. Multiple items can be created here, this is useful when new items may be dragged onto a template grid and grid items may be reordered too.

Specify for each item:

- Dragged entity: The context entity of the draggable widget. This is used to select the matching item when multiple items are created.
- On drop entity: The entity used for the drop, the widget creates an object of this entity at each drop. It is recommended to use a non-persistent entity.
- Dragged entity reference: The reference from the drop entity to the dragged entity. The widget will set this reference when an item is dropped.
- Drop target reference: The reference from the drop entity to the drop target entity. The widget will set this reference to the context object when an item is dropped.
- Microflow: The microflow to execute when an item is dropped. It has one parameter: the on drop entity object.
 
 
 