/* 
 * ActiveLabelJS, version 1.0 [2014-05-14]
 * Copyright 2014, TXW LLC
 * Author: Kenneth MacSparran [kenneth.macsparran@gmail.com]
 * Licensed under the MIT License [https://github.com/kmacsparran/ActiveLabelJS/blob/master/LICENSE]
 */
var LabelOptions = {
	parentElementID: "activeform",
	activeStyle: "active",
	defaultStyle: "invisible",
	toggleStyle: "visible"
};

var Label = function (control, context) {
	// reference the parent html element, used to limit DOM traversal while looking for the label element
	this.context = context;
	/*
	 * create reference to the current form control. 
	 * this will be whatever element is referenced by the "htmlfor" property of the label element.
	 */
	this.control = control;
	
	// find the label element associated with this control
	this.label = this.getLabel();
	
	// setup for css animations
	this.addClass(LabelOptions.activeStyle);
	
	// apply default css styles
	this.addClass(LabelOptions.defaultStyle);
	
	// if the control already has a value assigned, 
	if (this.control.value.length > 0) {
		// display the control's label element.
		this.addClass(LabelOptions.toggleStyle);
	}
	
	// apply eventlisteners
	this.activate();
	
	return this;
};
Label.prototype.getLabel = function() {
	var labelArray = this.context.getElementsByTagName("label"),
		labels = labelArray.length - 1,
		i = 0;

	do {
		// labels can reference elements by id or name, so check against both
		if (labelArray[i].htmlFor === ((this.control["name"] !== null) ? this.control["name"] : this.control.id)) {

			// when a match is found, return the reference to the matching label element
			return labelArray[i];
		}
	}
	while (i++ < labels);
};
Label.prototype.toggleLabel = function() {
	// the current control has characters entered as a value
	if (this.control.value.length > 0) {
	
		// add LabelOptions.toggleStyle to the label element, making it visible
		this.addClass(LabelOptions.toggleStyle);
	}
	
	// the current control does not have characters entered as a value
	else {
	
		// remove LabelOptions.toggleStyle to the label element, making it invisible
		this.removClass(LabelOptions.toggleStyle);
	}
};
Label.prototype.addClass = function (name) {
	var currentClass = (this.label.className || "").split(" "),
		name = name || LabelOptions.activeStyle;
	
	// check whether the current class attribute does not include the specified string (name)
	if (currentClass.indexOf(name) < 0) {
		
		// add the specified string (name)
		this.label.className = this.convertArrayToString(currentClass.concat(name));
	}
};
Label.prototype.removClass = function (name) {
	var currentClass = (this.label.className || "").split(" "),
		name = name || LabelOptions.activeStyle,
		classIndex = currentClass.indexOf(name);
	
	// check whether the current class attribute includes the specified string (name)
	if (classIndex > -1) {
		
		// remove the specified string (name) if it is present
		currentClass.splice(classIndex, 1);
		
		// assign the new class value
		this.label.className = this.convertArrayToString(currentClass);
	}
};
Label.prototype.convertArrayToString = function (arr) {
	// return the array as a string, with spaces separating the array's values
	return arr
		// join the array elements, separated by spaces
		.join(" ")
		
		// remove extra spaces
		.trim();
};
Label.prototype.activate = function () {
	// add an eventlistener for "oninput" and "onchange" events
	this.control.addEventListener("input", this.toggleLabel.bind(this));
	this.control.addEventListener("change", this.toggleLabel.bind(this));
};