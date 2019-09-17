// Manages any input that will be used to make posts
/*
Editor class is responsible for applying the logic over the elements
    Line is a group of text
    Group of lines is a paragraph
    Group of paragraphs is a page
    Group of pages is a document

Editor should listen for keypresses and route events to correct spot?
*/
class Editor {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

// Base element of the editor (is a collection of text with same properties)
class WordNode {
    /*
        What does a word node need to do?
            Needs to be able to update its attributes
            Needs to be able to add new text
            Needs to be able to delete text

            Cut to a certain size?
    */
    constructor() {
        this.content = "";
        this.properties = {
            fontSize : "12px",
            fontColor: "black",
            fontStyle: "normal",    // Controls if italicized or not
            fontWeight: "normal",   // Controls if bold or not
            fontFamily: "Bitter, serif",
            offSet: "0px",          // Controls the tabs or margins
        }
        // Should the dom stuff be combined or separated from the logic?
        // this.domElement = this.create();
    }

    addText(text, insetPoint) { // Can handle keyboard inputs and copy/paste (not sure how to handle copy paste tho)
        this.content += text;
    }

    deleteText(start, end) {

    }

    setFontSize(size) {
        this.properties.fontSize = size + "px";
    }
    getFontSize() {
        return this.properties.fontSize;
    }

    setFontColor(color) {
        this.properties.fontColor = color;
    }

    setFontStyle(style) {
        this.properties.fontStyle = style;
    }

    setFontWeight(weight) {
        this.properties.fontWeight = weight;
    }

    setFontFamily(family) {
        this.properties.fontFamily = family;
    }

    create() {

    }
}

// Represents one line within a page (when overflows width of container creates new line)
class Line {
    /*
        What does a line need to know?
            How long it can be
            How long each of its elements are
            What the active node is? (Or is there a different way to track who should be updated?)
        What does a line need to do?

    */
    constructor(width) {
        this.contents = [];
        this.properties = {
            offset: "0px",
        }
    }

    getWidth() {
        let width = 0;
        for (let i = 0; i < this.contents.length; i++) {
            width += this.contents[i].getWidth();
        }
        return width;
    }
    getHeight() {
        let height = 0;
        for (let i = 0; i < this.contents.length; i++) {
            if (height < this.contents[i].getHeight()) {
                height = this.contents[i].getHeight();
            }
        }
        return height;
    }
}

// Represents groups of lines (or a single line) 
class Paragraph {
    constructor() {
        // Should create initial line
    }
}

// Represents a printable page (won't actually render the pages tho
    // Used to keep track of the paragraphs
class Page {
    constructor(width, height) {

    }
}

// Highest level representation of notebook page
class Document {
    constructor(width, height) {

    }
}