/**
 * label.js version 1.0
 * Copyright 2014, TXW LLC
 * Author: Kenneth MacSparran [kenneth.macsparran@gmail.com]
 * Licensed under the MIT license [http://opensource.org/licenses/MIT]
 */
var LabelOptions = {
	parentElementID: "demoForm",
	activeClassName: "al",
	transitionInterval: 300
};

var Label = function (control, context) {
	this.context = context;
	/*
	 * create reference to the current form control. 
	 * this will be whatever element is referenced by the "htmlfor" property of the label element.
	 */
	this.control = control;
	
	// find the label element associated with this control
	this.label = this.getLabel();
	
	/* 
	 * if the control already has a value assigned, 
	 * assign the appropriate clssname to display the control's label element.
	 */
	if (this.control.value.length > 0) {
		this.label.className = LabelOptions.activeClassName;
	}

	// apply eventlisteners
	this.activate();
	
	return this;
};
Label.prototype.getLabel = function() {
	/* 
	 * attempt to locate the associated label element by matching 
	 * the "htmlfor" property of label elements against the name (or id) of this control element.
	 */
	var labelArray = this.context.getElementsByTagName("label"),
		labels = labelArray.length - 1,
		i = 0;

	do {
		// since labels can reference elements by id or name, check against both
		if (labelArray[i].htmlFor === ((this.control["name"] !== null) ? this.control["name"] : this.control.id)) {
			return labelArray[i];
		}
	}
	while (i++ < labels);
};
Label.prototype.showLabel = function() {
	// this.setProp(this.label, "className", LabelOptions.activeClassName);
	if (this.control.value.length > 0) {
		// this.label.className = LabelOptions.activeClassName;
		this.addClass();
	}
	else {
		// this.label.className = LabelOptions.activeClassName;
		this.removClass();
	}
};
Label.prototype.addClass = function () {
	var currentClass = this.label.className || [];
	
	if (currentClass.indexOf(LabelOptions.activeClassName) < 0) {
		this.label.className = LabelOptions.activeClassName;
	}
};
Label.prototype.removClass = function () {
	var currentClass = this.label.className || [];
	
	console.log(currentClass);
	console.log(currentClass.indexOf(LabelOptions.activeClassName));
	
	// use a regular expression to remove the classname if it has been set already
	if (currentClass.indexOf(LabelOptions.activeClassName) > -1) {
		this.label.className = "";
	}
	
};
Label.prototype.activate = function () {
	console.log("add listeners");
	
	this.control.addEventListener("input", this.showLabel.bind(this));
	this.control.addEventListener("change", this.showLabel.bind(this));

	// add eventhandlers to each pair:
	// if value is not "", hide placeholder, and fade the label in.
	// if value is "", show the placeholder, and hide the label.
	// on focus, hide the placeholder (should be automatic), and fade in the label.
};

(function (window, document, undefined) {
	var userForm = document.getElementById(LabelOptions.parentElementID),
		labels = [],
		elemArray = userForm.getElementsByTagName("input"),
		elems = elemArray.length - 1,
		elem = undefined,
		i = 0;

	do {
		elem = elemArray[i];
		
		if (["button", "submit", "radio", "checkbox"].indexOf(elem["type"]) < 0) {
			labels.push(new Label(elemArray[i], userForm));
		}
	}
	while (i++ < elems);

})(window, document)