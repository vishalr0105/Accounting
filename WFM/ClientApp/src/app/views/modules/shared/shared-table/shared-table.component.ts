import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  BeforeBatchDeleteArgs,
  CommandModel,
  EditSettingsModel,
  GridComponent,
  SelectionSettingsModel,
  ToolbarItems,
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
})
export class SharedTableComponent implements OnInit, AfterViewInit {
  @ViewChild('grid') public grid: GridComponent;
  @Input() fieldsAndHeaders: { field: string; header: string }[] = [];
  @Input() tableData = [];
  @Input() isView = false;
  @Input() isInventory=false;
  @Input() isPickPackList=false;
  @Input() exportName: string;
  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() deleteBatch = new EventEmitter<any[]>();
  @Output() customAction = new EventEmitter<string>();
  @Input() isPickPack = false
  public selectionOptions?: SelectionSettingsModel;
  public toolbarOptions?: ToolbarItems[];
  public commands: CommandModel[];

  public editSettings?: EditSettingsModel;

  constructor() {}

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
    this.grid.searchSettings ={
      ignoreCase:true,
    }
  }

  ngOnInit(): void {
    this.toolbarOptions = ['Delete', 'ExcelExport', 'Search'];
    if(this.isView)
    {
      this.commands = [
        {
          buttonOption: {
            iconCss: 'e-icons e-eye',
            cssClass: 'e-flat',
          },
          title: 'view',
        },
        {
          buttonOption: {
            iconCss: 'e-icons e-edit',
            cssClass: 'e-flat',
          },
          title: 'edit',
        },
        {
          buttonOption: {
            iconCss: 'e-icons e-trash',
            cssClass: 'e-flat',
          },
          title: 'delete',
        },
      ];
    }
    else if(this.isInventory){
      this.commands = [
        {
          buttonOption: {
            iconCss: 'e-icons e-eye',
            cssClass: 'e-flat',
          },
          title: 'view',
        },
        {
          buttonOption: {
            iconCss: 'e-icons e-edit',
            cssClass: 'e-flat',
          },
          title: 'edit',
        },
        {
          buttonOption: {
            iconCss: 'e-icons e-trash',
            cssClass: 'e-flat',
          },
          title: 'delete',
        },
        {
          buttonOption: {
            //content: '<button>Add PickList</button>',
            iconCss: 'e-icons e-plus',
            cssClass: 'e-flat',
          },
          title: 'add',
        },
      ];
    }
    else if(this.isPickPackList){
      this.commands = [
        {
          buttonOption: {
            iconCss: 'e-icons e-eye',
            cssClass: 'e-flat',
          },
          title: 'view',
        },
        {
          buttonOption: {
            //content: '<button>Add PickList</button>',
            iconCss: 'e-icons e-plus',
            cssClass: 'e-flat',
          },
          title: 'add',
        },
      ];
    }
    else
    {
      this.commands = [
        {
          buttonOption: {
            iconCss: 'e-icons e-edit',
            cssClass: 'e-flat',
          },
          title: 'edit',
        },
        {
          buttonOption: {
            iconCss: 'e-icons e-trash',
            cssClass: 'e-flat',
          },
          title: 'delete',
        },
      ];
    }
    this.selectionOptions = { checkboxOnly: true  };
    this.editSettings = { allowDeleting: true, mode: 'Batch'   };
  }

  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === `${this.grid.element.id}_excelexport`) {
      (this.grid as GridComponent).excelExport({
        dataSource: this.tableData,
        fileName: `${this.exportName}.xlsx`,
      });
    }
  }
  beforeBatchDelete(args: BeforeBatchDeleteArgs) {
    args.cancel = true;

    Swal.fire({
      title: `Do you want to delete the ${this.exportName} z?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var data: any[] = this.grid.getSelectedRecords();
        data.forEach((x) => {
          this.tableData.splice(
            this.tableData.findIndex((y) => x.id == y.id),
            1
          );
        });
        this.grid.refresh();
        this.deleteBatch.emit(data);
      } else {
        args.cancel = true;
      }
    });
  }

  SettingClick(args) {

    console.log('Clicked args:', args); // Log to inspect the args object

    if (args.commandColumn && args.commandColumn.title) {
      if (args.commandColumn.title === 'edit') {
        this.edit.emit(args.rowData.id);
      } else if (args.commandColumn.title === 'view') {
        this.view.emit(args.rowData.id);
      } else if (args.commandColumn.title === 'delete') {
        args.cancel = true;
        Swal.fire({
          title: `Do you want to delete the ${this.exportName}?`,
          showCancelButton: true,
          confirmButtonText: 'Delete',
        }).then((result) => {
          if (result.isConfirmed) {
            this.tableData.splice(this.tableData.findIndex((y) => y.id == args.rowData.id), 1);
            this.grid.refresh();
            this.delete.emit(args.rowData.id);
          }
        });
      } else if (args.commandColumn.title === 'add') {
        // Example: Navigate to a custom action page
        this.customAction.emit(args.rowData.id);
      }
    }
  }


}
