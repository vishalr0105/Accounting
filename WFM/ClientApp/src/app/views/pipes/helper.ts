import { Injectable, Pipe } from '@angular/core';


import { DatePipe } from '@angular/common';
import { ConditionOperator, Filter, Operator, SearchFilter } from '../models/paginationRequest';
import { SearchField } from '../models/ReportMaster.model';

declare var toastr: any;
declare var moment: any;

@Injectable()
export class Helper {
  message: any;
  constructor(private datepipe: DatePipe) {
   // this.message = localizationJson.massages;
  }

  showAlertMessage(message: string, alertType: string) {
    if (alertType == 'error') {
      toastr.options = {
        closeButton: true,
        timeOut: 3000,
        preventDuplicates: true,
        extendedTimeOut: 1000,
        positionClass: 'toast-top-center',
      };
      toastr.error(message, 'Error').attr('style', 'width: 400px !important');
    } else if (alertType == 'success') {
      toastr.options = {
        closeButton: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        positionClass: 'toast-top-center',
      };
      toastr.success(message).attr('style', 'width: 400px !important');
    } else if (alertType == 'info') {
      toastr.options = {
        closeButton: false,
        timeOut: 5000,
        extendedTimeOut: 1000,
        positionClass: 'toast-top-center',
      };
      toastr.info(message).attr('style', 'width: 400px !important');
    }
  }

  formatBytes(bytes: number, decimals: number) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  popupCenter(url, title, w, h) {
    // Fixes dual-screen position Most browsers Firefox
    var dualScreenLeft = window.screenLeft;
    var dualScreenTop = window.screenTop;

    var width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    var height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    var left = width / 2 - w / 2 + dualScreenLeft;
    var top = height / 2 - h / 2 + dualScreenTop;
    var newWindow = window.open(
      url,
      title,
      'scrollbars=yes, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left
    );

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }
  }

  getErrorMessagesText(errorMessages: string[]) {
    var li = '';

    for (let message of errorMessages) {
      li += '<li>' + message + '</li>';
    }

    return '<ul>' + li + '</li>';
  }

  camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  getColumnHeader(row) {
    let theaderStart = '<thead><tr>';
    let theaderEnd = '</tr></thead>';
    let headColumn = '';

    for (var key in row) {
      if (row.hasOwnProperty(key)) {
        headColumn += '<th>' + key + '</th>';
      }
    }

    return theaderStart + headColumn + theaderEnd;
  }

  compare(
    a: number | string | boolean,
    b: number | string | boolean,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getLastMonths(count) {
    var monthFull = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    var monthShort = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var months = [];
    var d = new Date();
    for (var i = 0; i < count; i++) {
      months.push({
        name: monthFull[d.getMonth()],
        value: monthShort[d.getMonth()],
      });
      d.setMonth(d.getMonth() - 1);
    }
    return months;
  }

  getLastDay(year: number, month: string) {
    var monthIndex = this.getMonthIndex(month);

    return new Date(year, monthIndex + 1, 0).getDate();
  }

  getMonthIndex(month: string) {
    var monthShort = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var monthIndex = monthShort.findIndex((x) => x == month);

    return monthIndex;
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  daysBetween(startDate, endDate) {
    let millisecondsPerDay = 1000 * 60 * 60 * 24;
    let startDateUTC = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    let endDateUTC = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    return Math.floor((endDateUTC - startDateUTC) / millisecondsPerDay);
  }

  static getChunks(items: any, chunkSize: number) {
    var index = 0;
    var arrayLength = items.length;
    var group = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      let chunk = items.slice(index, index + chunkSize);
      group.push(chunk);
    }

    return group;
  }

  search(
    selectedField: SearchField,
    searchText: any,
    conditionOperator: ConditionOperator
  ): SearchFilter {
    let searchFilter = null;

    //if (searchText != null) {

    searchFilter = new SearchFilter();
    searchFilter.conditionOperator = conditionOperator;
    searchFilter.filters = new Array<Filter>();

    if (
      selectedField.controlType.toLowerCase() == 'date' &&
      (this.getDataType(selectedField.dataType) == 'date' ||
        this.getDataType(selectedField.dataType) == 'datetime')
    ) {
      searchFilter.filters.push({
        displayName: selectedField.label,
        propertyName: selectedField.field,
        operator: Operator.greaterThanOrEqual,
        value: searchText,
        caseSensitive: false,
        dataType: selectedField.dataType,
      });
      searchFilter.filters.push({
        displayName: selectedField.label,
        propertyName: selectedField.field,
        operator: Operator.lessThan,
        value: this.addDays(new Date(searchText), 1).toISOString(),
        caseSensitive: false,
        dataType: selectedField.dataType,
      });
    }
    //if (selectedField.controlType.toLowerCase() == 'daterange' && (this.getDataType(selectedField.dataType) == 'date' || this.getDataType(selectedField.dataType) == 'datetime')) {
    //   searchFilter.filters.push({
    //      displayName: selectedField.label,
    //      propertyName: selectedField.field,
    //      operator: Operator.greaterThanOrEqual,
    //      value: searchText.split(',')[0],
    //      caseSensitive: false,
    //      dataType: selectedField.dataType
    //   });
    //   searchFilter.filters.push({
    //      displayName: selectedField.label,
    //      propertyName: selectedField.field,
    //      operator: Operator.lessThan,
    //      value: searchText.split(',')[1],
    //      caseSensitive: false,
    //      dataType: selectedField.dataType
    //   });
    //}
    else if (
      this.getDataType(selectedField.dataType) == 'integer' ||
      this.getDataType(selectedField.dataType) == 'double'
    ) {
      searchFilter.filters.push({
        displayName: selectedField.label,
        propertyName: selectedField.field,
        operator: Operator.equals,
        value: searchText,
        caseSensitive: true,
        dataType: selectedField.dataType,
      });
    } else {
      searchFilter.filters.push({
        displayName: selectedField.label,
        propertyName: selectedField.field,
        operator: Operator.contains,
        value: searchText,
        caseSensitive: false,
        dataType: selectedField.dataType,
      });
    }
    // }

    return searchFilter;
  }

  complexSearch(
    selectedField: any,
    searchText: any,
    conditionOperator: ConditionOperator
  ): SearchFilter {
    let searchFilter = null;

    //if (searchText != null) {

    searchFilter = new SearchFilter();
    searchFilter.conditionOperator = conditionOperator;
    searchFilter.filters = new Array<Filter>();

    if (this.getDataType(selectedField.DataType) == 'date') {
      searchFilter.filters.push({
        displayName: selectedField.DisplayName,
        propertyName: selectedField.SearchFieldName,
        operator: Operator.greaterThanOrEqual,
        value: searchText,
        caseSensitive: false,
        dataType: selectedField.DataType,
      });
      searchFilter.filters.push({
        displayName: selectedField.DisplayName,
        propertyName: selectedField.SearchFieldName,
        operator: Operator.lessThan,
        value: this.addDays(new Date(searchText), 1).toISOString(),
        caseSensitive: false,
        dataType: selectedField.DataType,
      });
    } else if (
      this.getDataType(selectedField.DataType) == 'integer' ||
      this.getDataType(selectedField.DataType) == 'double'
    ) {
      searchFilter.filters.push({
        displayName: selectedField.DisplayName,
        propertyName: selectedField.SearchFieldName,
        operator: Operator.equals,
        value: searchText,
        caseSensitive: true,
        dataType: selectedField.DataType,
      });
    } else {
      searchFilter.filters.push({
        displayName: selectedField.DisplayName,
        propertyName: selectedField.SearchFieldName,
        operator: Operator.contains,
        value: searchText,
        caseSensitive: false,
        dataType: selectedField.DataType,
      });
    }
    // }

    return searchFilter;
  }

  advancedSearch(
    searchFields: SearchField[],
    conditionOperator: ConditionOperator
  ): SearchFilter {
    let searchFilter = new SearchFilter();
    searchFilter.conditionOperator = conditionOperator;
    searchFilter.filters = new Array<Filter>();

    for (var i = 0; i < searchFields.length; i++) {
      if (searchFields[i].value !== '') {
        if (
          searchFields[i].controlType.toLowerCase() == 'date' &&
          this.getDataType(searchFields[i].dataType) == 'date'
        ) {
          searchFilter.filters.push({
            displayName: searchFields[i].label,
            propertyName: searchFields[i].field,
            operator: Operator.greaterThanOrEqual,
            // value: new Date(searchFields[i].value).toISOString(),
            value: this.datepipe.transform(searchFields[i].value, 'yyyy-MM-dd'),

            caseSensitive: false,
            dataType: searchFields[i].dataType,
          });
          searchFilter.filters.push({
            displayName: searchFields[i].label,
            propertyName: searchFields[i].field,
            operator: Operator.lessThan,
            value: this.addDays(
              new Date(searchFields[i].value),
              1
            ).toISOString(),
            caseSensitive: false,
            dataType: searchFields[i].dataType,
          });
        } else if (
          this.getDataType(searchFields[i].dataType) == 'integer' ||
          this.getDataType(searchFields[i].dataType) == 'double'
        ) {
          searchFilter.filters.push({
            displayName: searchFields[i].label,
            propertyName: searchFields[i].field,
            operator: Operator.equals,
            value: searchFields[i].value,
            caseSensitive: true,
            dataType: searchFields[i].dataType,
          });
        } else {
          searchFilter.filters.push({
            displayName: searchFields[i].label,
            propertyName: searchFields[i].field,
            operator: Operator.contains,
            value: searchFields[i].value,
            caseSensitive: false,
            dataType: searchFields[i].dataType,
          });
        }
      }
    }

    return searchFilter;
  }

  complexAdvancedSearch(
    searchFields: any[],
    conditionOperator: ConditionOperator
  ): SearchFilter {
    let searchFilter = new SearchFilter();
    searchFilter.conditionOperator = conditionOperator;
    searchFilter.filters = new Array<Filter>();

    for (var i = 0; i < searchFields.length; i++) {
      if (
        (searchFields[i].Value !== undefined &&
          searchFields[i].Value !== null &&
          searchFields[i].Value !== '') ||
        (searchFields[i].MultiValues != undefined &&
          searchFields[i].MultiValues != null)
      ) {
        if (
          this.getDataType(searchFields[i].DataType) == 'date' &&
          searchFields[i].SelectedDateFormat == 'date'
        ) {
          searchFilter.filters.push({
            displayName: searchFields[i].DisplayName,
            propertyName: searchFields[i].SearchFieldName,
            operator: Operator.greaterThanOrEqual,
            // value: new Date(searchFields[i].value).toISOString(),
            value: this.datepipe.transform(searchFields[i].Value, 'yyyy-MM-dd'),
            caseSensitive: false,
            dataType: searchFields[i].DataType,
            selectedDateFormat: 'date',
          });
          searchFilter.filters.push({
            displayName: searchFields[i].DisplayName,
            propertyName: searchFields[i].SearchFieldName,
            operator: Operator.lessThan,
            value: this.addDays(
              new Date(searchFields[i].Value),
              1
            ).toISOString(),
            caseSensitive: false,
            dataType: searchFields[i].DataType,
            selectedDateFormat: 'date',
          });
        } else if (
          this.getDataType(searchFields[i].DataType) == 'date' &&
          searchFields[i].SelectedDateFormat == 'month'
        ) {
          searchFilter.filters.push({
            displayName: searchFields[i].DisplayName,
            propertyName: searchFields[i].SearchFieldName,
            operator: Operator.equals,
            // value: new Date(searchFields[i].value).toISOString(),
            value: this.datepipe.transform(searchFields[i].Value, 'MM'),

            caseSensitive: false,
            dataType: searchFields[i].DataType,
            selectedDateFormat: 'month',
          });
        } else if (
          this.getDataType(searchFields[i].DataType) == 'date' &&
          searchFields[i].SelectedDateFormat == 'year'
        ) {
          searchFilter.filters.push({
            displayName: searchFields[i].DisplayName,
            propertyName: searchFields[i].SearchFieldName,
            operator: Operator.equals,
            // value: new Date(searchFields[i].value).toISOString(),
            value: this.datepipe.transform(searchFields[i].Value, 'yyyy'),

            caseSensitive: false,
            dataType: searchFields[i].DataType,
            selectedDateFormat: 'year',
          });
        } else if (
          this.getDataType(searchFields[i].DataType) == 'integer' ||
          this.getDataType(searchFields[i].DataType) == 'double'
        ) {
          searchFilter.filters.push({
            displayName: searchFields[i].DisplayName,
            propertyName: searchFields[i].SearchFieldName,
            operator: Operator.equals,
            value: searchFields[i].Value,
            caseSensitive: true,
            dataType: searchFields[i].DataType,
          });
        } else {
          if (
            searchFields[i].Value != undefined &&
            searchFields[i].Value != null &&
            searchFields[i].Value != ''
          ) {
            searchFilter.filters.push({
              displayName: searchFields[i].DisplayName,
              propertyName: searchFields[i].SearchFieldName,
              operator: Operator.contains,
              value: searchFields[i].Value,
              caseSensitive: false,
              dataType: searchFields[i].DataType,
            });
          }

          if (
            searchFields[i].MultiValues != undefined &&
            searchFields[i].MultiValues != null &&
            searchFields[i].MultiValues != ''
          ) {
            let strValues = '';
            //if (searchFields[i].DataType == 'string' || searchFields[i].DataType == 'date') {
            //   searchFields[i].MultiValues.forEach(x => {
            //      strValues += "''" + x  + "''";
            //      let j = 0;
            //      if (j < searchFields[i].MultiValues.length - 1) {
            //         strValues +=  ',';
            //         j++;
            //      }
            //   });
            //}
            //if (searchFields[i].DataType == 'number') {
            searchFields[i].MultiValues.forEach((x) => {
              strValues += x + ',';
              //let j = 0;
              //if (j < searchFields[i].MultiValues.length - 1) {
              //   strValues += ',';
              //   j++;
              //}
            });
            //}
            searchFilter.filters.push({
              displayName: searchFields[i].DisplayName,
              propertyName: searchFields[i].SearchFieldName,
              operator: Operator.in,
              value: strValues,
              caseSensitive: false,
              dataType: searchFields[i].DataType,
            });
          }
        }
      }
    }

    return searchFilter;
  }

  generateTree(arr, parentId) {
    var out = [];

    for (var i in arr) {
      arr[i].label = arr[i].name;

      if (arr[i].parentId == parentId) {
        var children = this.generateTree(arr, arr[i].id);

        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i]);
      }
    }

    return out;
  }

  static generateObjectId() {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, function () {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
    );
  }

  static getParameterCaseInsensitive(object, key) {
    return object[
      Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())
    ];
  }

  generateTreeTable(arr, parentId, expanded?: boolean) {
    var out = [];

    for (var i in arr) {
      arr[i].label = arr[i].name;

      arr[i].data = {
        name: arr[i].name,
      };

      arr[i].expanded = expanded;

      if (arr[i].parentId == parentId) {
        var children = this.generateTree(arr, arr[i].id);

        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i]);
      }
    }

    return out;
  }

  findNode(id, currentNode) {
    var stack = [],
      node,
      ii;
    stack.push(currentNode);

    while (stack.length > 0) {
      node = stack.pop();
      if (node.id == id) {
        return node;
      } else if (node.children && node.children.length) {
        for (ii = 0; ii < node.children.length; ii += 1) {
          stack.push(node.children[ii]);
        }
      }
    }

    return null;
  }

  isDate(value: any) {
    return (
      null != value && !isNaN(value) && 'undefined' !== typeof value.getDate
    );
  }

  static formatDate(value: any, includeTime = false) {
    let dd = value.getDate();
    let mm = value.getMonth() + 1;
    const yyyy = value.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    const date = dd + '/' + mm + '/' + yyyy;

    if (includeTime === true) return date + ' ' + value.toLocaleTimeString();
    else return date;
  }

  static groupBy(data, columnName) {
    //var groupedData;

    //data.reduce(function (result, current) {
    //    var currentVal = current[columnName];

    //    result[currentVal] = result[currentVal] || [];
    //    result[currentVal].push(current);
    //    groupedData = result;
    //}, {});

    //return groupedData;

    let group = data.reduce((r, a) => {
      r[a[columnName]] = [...(r[a[columnName]] || []), a];
      return r;
    }, {});

    let tempGroups = [];

    for (var i in group) {
      tempGroups.push(group[i]);
    }

    return tempGroups;
  }

  getDataType(dbColumnType) {
    let type;

    switch (dbColumnType) {
      case 'char':
      case 'varchar':
      case 'varchar(max)':
      case 'text':
      case 'nchar':
      case 'nvarchar':
      case 'nvarchar(max)':
      case 'ntext':
      case 'System.String':
        type = 'string';
        break;
      case 'datetime':
      case 'datetime2':
      case 'smalldatetime':
      case 'date':
        type = 'date';
        break;
      case 'time':
        type = 'time';
        break;
      //case 'date':
      //    type = 'date';
      //    break;
      case 'bigint':
      case 'int':
      case 'smallint':
      case 'tinyint':
      case 'bit':
      case 'number':
        type = 'integer';
        break;
      case 'decimal':
      case 'numeric':
      case 'money':
      case 'smallmoney':
      case 'float':
      case 'real':
        type = 'double';
        break;
      default:
        type = 'string';
    }

    return type;
  }

  getOperators(type) {
    var operators;

    switch (type) {
      case 'char':
      case 'varchar':
      case 'varchar(max)':
      case 'text':
      case 'nchar':
      case 'nvarchar':
      case 'nvarchar(max)':
      case 'ntext':
        operators = [
          'equal',
          'not_equal',
          'in',
          'not_in',
          'begins_with',
          'not_begins_with',
          'contains',
          'not_contains',
          'ends_with',
          'not_ends_with',
          'is_empty',
          'is_not_empty',
          'is_null',
          'is_not_null',
        ];
        break;
      case 'datetime':
      case 'smalldatetime':
      case 'time':
      case 'date':
        operators = [
          'equal',
          'not_equal',
          'in',
          'not_in',
          'less',
          'less_or_equal',
          'greater',
          'greater_or_equal',
          'between',
          'not_between',
          'is_null',
          'is_not_null',
        ];
        break;
      case 'bit':
        operators = ['equal'];
        break;
      case 'bigint':
      case 'int':
      case 'smallint':
      case 'tinyint':
      case 'decimal':
      case 'numeric':
      case 'money':
      case 'smallmoney':
      case 'float':
      case 'real':
        operators = [
          'equal',
          'not_equal',
          'in',
          'not_in',
          'less',
          'less_or_equal',
          'greater',
          'greater_or_equal',
          'is_null',
          'is_not_null',
        ];
        break;
      default:
        operators = [
          'equal',
          'not_equal',
          'in',
          'not_in',
          'less',
          'less_or_equal',
          'greater',
          'greater_or_equal',
          'begins_with',
          'not_begins_with',
          'contains',
          'not_contains',
          'ends_with',
          'not_ends_with',
          'is_empty',
          'is_not_empty',
          'is_null',
          'is_not_null',
        ];
    }

    return operators;
  }

  convertToDBDateFormat(dateVal: any) {
    return moment(dateVal, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }
}
