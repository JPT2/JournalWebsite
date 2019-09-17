// Manages any input that will be used to make posts
/*
Editor library found here: https://quilljs.com/guides/how-to-customize-quill/
*/
class Editor {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // Create new quill editor
        this.editor = document.createElement("div");
        this.editor.id = "editor";
        this.editor.width = width ? width + "px" : "100%";
        this.editor.height = height ? height + "px" : "100%";
    }

    setupQuill() {
        let quill = new Quill("#editor", {
            theme: "snow",
        });
        return quill;
    }

    render(attachPoint) {
        if (attachPoint) {
            attachPoint.appendChild(this.editor);
            this.setupQuill();
        }
    }
}