import { Component, OnInit } from '@angular/core';
import { ContentChange, SelectionChange } from 'ngx-quill';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent implements OnInit {

  htmlText = `<p> If You Can Think It, You Can Do It. </p>`
  quillConfig = {
     toolbar: {
       container: [
         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
         ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

         [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
         ['link', 'image', 'video']
       ],
     },
  }

  gArrayFonts = ['Lato Regular', 'Lato Medium', 'Lato Heavy', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvetica', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Roboto'];
  DynamicTextValue: any;
  config: any = {
      airMode: false,
      tabDisable: true,
      popover: {
         table: [
            ["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]],
            ["delete", ["deleteRow", "deleteCol", "deleteTable"]]
         ],
         image: [
            ["image", ["resizeFull", "resizeHalf", "resizeQuarter", "resizeNone"]],
            ["float", ["floatLeft", "floatRight", "floatNone"]],
            ["remove", ["removeMedia"], ["insert", ["picture"]]]
         ],
         link: [["link", ["linkDialogShow", "unlink"]]],
         air: [
            [
               "font",
               [
                  "bold",
                  "italic",
                  "underline"
               ]
            ]
         ]
      },
      height: "200px",
      uploadImagePath: "/api/upload",
      toolbar: [
         ["misc", ["undo", "redo"]],
         [
            "font",
            [
               "bold",
               "italic",
               "underline"
               // "strikethrough",
               // "superscript",
               // "subscript",
               // "clear"
            ]
         ],
         ["fontsize", ["fontname", "fontsize", "color"]],
         ["para", ["style0", "ul", "ol", "paragraph", "height"]],
         // ["insert", ["table", "picture", "link", "video", "hr"]],
         ["customButtons", ["testBtn"]]
      ],
      fontNames: this.gArrayFonts,
      fontNamesIgnoreCheck: ['Lato Regular', 'Lato Medium', 'Lato Heavy'],
      buttons: {

      },
      codeviewFilter: true,
      codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
      codeviewIframeFilter: true
   };

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChanged = (event: SelectionChange) => {
    if(event.oldRange == null) {
      this.onFocus();
    }
    if(event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }

}
