/**
 * label.js version 1.0
 * Copyright 2014, TXW LLC
 * Author: Kenneth MacSparran [kenneth.macsparran@gmail.com]
 * Licensed under the MIT license [http://opensource.org/licenses/MIT]
 */
var LabelOptions = {
	parentElementID: "demoForm",
	activeClassName: "active",
	defaultClass: "invisible",
	toggleClass: "visible",
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
	
	// setup for css animations
	this.addClass(LabelOptions.activeClassName);
	
	// apply default css styles
	this.addClass(LabelOptions.defaultClass);
	
	// if the control already has a value assigned, 
	if (this.control.value.length > 0) {
		// display the control's label element.
		this.addClass(LabelOptions.toggleClass);
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
	if (this.control.value.length > 0) {
		this.addClass(LabelOptions.toggleClass);
	}
	else {
		this.removClass(LabelOptions.toggleClass);
	}
};
Label.prototype.addClass = function (name) {
	var currentClass = (this.label.className || "").split(" "),
		name = name || LabelOptions.activeClassName;
	
	if (currentClass.indexOf(name) < 0) {
		this.label.className = (currentClass.concat(name)).join(" ").trim();
	}
};
Label.prototype.removClass = function (name) {
	var currentClass = (this.label.className || "").split(" "),
		name = name || LabelOptions.activeClassName,
		classIndex = currentClass.indexOf(name);
	
	if (classIndex > -1) {
		currentClass.splice(classIndex, 1);
		this.label.className = currentClass.join(" ").trim();
	}
};
Label.prototype.activate = function () {
	this.control.addEventListener("input", this.showLabel.bind(this));
	this.control.addEventListener("change", this.showLabel.bind(this));
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