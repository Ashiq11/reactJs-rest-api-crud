import React, { Component } from "react";
import { classNames } from 'primereact/utils';
import DataService from "../services/data.service";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import "primereact/resources/primereact.min.css";   //core css
import "primeicons/primeicons.css";  //icons
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import './DataTableDemo.css';
import { FileUpload } from 'primereact/fileupload';
import { Link } from "react-router-dom";


export default class CourseList extends Component {

  emptyCourse = {
    classid: null,
    classcode: null,
    classname: null,
    certificate: null,
    passmarks: 0,
    marks: 0
  };
  constructor(props) {
    super(props);

    this.state = {
      classes: [{ "certificate": "www.google.com", "passmarks": 80, "classname": "Test Class 1", "marks": 72, "classid": 1, "classcode": "CC01" }, { "certificate": "www.google.com", "passmarks": 70, "classname": "Test Class 2", "marks": 89, "classid": 2, "classcode": "CC02" }, { "certificate": "www.google.com", "passmarks": 80, "classname": "Test Class 3", "marks": 92, "classid": 3, "classcode": "CC03" }, { "certificate": "www.google.com", "passmarks": 75, "classname": "Test Class 4", "marks": 83, "classid": 4, "classcode": "CC04" }, { "certificate": "www.google.com", "passmarks": 80, "classname": "Test Class 5", "marks": 62, "classid": 5, "classcode": "CC05" },{ "certificate": "www.google.com", "passmarks": 80, "classname": "Test Class 6", "marks": 82, "classid": 6, "classcode": "CC06" }],
      course: this.emptyCourse,
      courseDialog: false,
      deleteClassDialog: false,
      deleteClassesDialog: false,
      submitted: false,
      selectedClasses: null,
      globalFilter: null
    };

    this.saveClass = this.saveClass.bind(this);
    this.editClass = this.editClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.confirmDeleteClass = this.confirmDeleteClass.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteClassDialog = this.hideDeleteClassDialog.bind(this);
    this.hideDeleteClassesDialog = this.hideDeleteClassesDialog.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.importCSV = this.importCSV.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedClasses = this.deleteSelectedClasses.bind(this);
  }


  retrieveCourses() {
    DataService.getAllCourses()
      .then(response => {
        this.setState({
          classes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onInputChange(e, classcode) {
    const val = (e.target && e.target.value) || '';
    let course = { ...this.state.course };
    course[`${classcode}`] = val;

    this.setState({ course });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let course = { ...this.state.course };
    course[`${name}`] = val;

    this.setState({ course });
  }

  openNew() {
    this.setState({
      course: this.emptyCourse,
      submitted: false,
      courseDialog: true
    });
  }

  hideDialog() {
    this.setState({
      submitted: false,
      courseDialog: false
    });
  }

  hideDeleteClassDialog() {
    this.setState({ deleteClassDialog: false });
  }
  hideDeleteClassesDialog() {
    this.setState({ deleteClassesDialog: false });
  }

  saveClass() {
    let state = { submitted: true };

    if (this.state.course.classname.trim()) {
      let classes = [...this.state.classes];
      let course = { ...this.state.course };
      if (this.state.course.classid) {
        const index = this.findIndexById(this.state.course.classid);

        classes[index] = course;
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Course Updated', life: 3000 });
      }
      else {
        course.classid = this.createId(classes.length);
        var id =course.classid;
        if (course.classid.toString().length < 2) {
          course.classid = "0" + course.classid;
          course.classcode = "CC" + course.classid;
          course.classid = id;
        } else {
          course.classcode = "CC" + course.classid;
        }
       
        classes.push(course);
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Course Created', life: 3000 });
      }

      state = {
        ...state,
        classes,
        courseDialog: false,
        course: this.emptyCourse
      };
    }

    this.setState(state);
  }

  editClass(course) {
    this.setState({
      course: { ...course },
      courseDialog: true
    });
  }
  confirmDeleteClass(course) {
    this.setState({
      course,
      deleteClassDialog: true
    });
  }

  deleteClass() {
    let classes = this.state.classes.filter(val => val.id !== this.state.course.classid);
    this.setState({
      classes,
      deleteClassDialog: false,
      course: this.emptyCourse
    });
    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Class Deleted', life: 3000 });
  }

  findIndexById(classid) {
    let index = -1;
    for (let i = 0; i < this.state.classes.length; i++) {
      if (this.state.classes[i].classid === classid) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(id) {
    let classId = id + 1 ;
    // let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // for (let i = 0; i < 5; i++) {
    //   classId += chars.charAt(Math.floor(Math.random() * chars.length));
    // }
    return classId;
  }

  importCSV(e) {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = csv.split('\n');

      // Prepare DataTable
      //const cols = data[0].replace(/['"]+/g, '').split(',');
      data.shift();

      const importedData = data.map(d => {
        d = d.split(',');
      });

      const classes = [...this.state.classes, ...importedData];

      this.setState({ classes });
    };

    reader.readAsText(file, 'UTF-8');
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  confirmDeleteSelected() {
    this.setState({ deleteClassesDialog: true });
  }


  deleteSelectedClasses() {
    let classes = this.state.classes.filter(val => !this.state.selectedClasses.includes(val));
    this.setState({
      classes,
      deleteClassesDialog: false,
      selectedClasses: null
    });
    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Classes Deleted', life: 3000 });
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedClasses || !this.state.selectedClasses.length} />
      </React.Fragment>
    )
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <FileUpload mode="basic" name="demo[]" auto url="#" accept=".csv" chooseLabel="Import" className="p-mr-2 p-d-inline-block" onUpload={this.importCSV} />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
      </React.Fragment>
    )
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editClass(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteClass(rowData)} />
      </React.Fragment>
    );
  }



  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-mx-0 p-my-1">Manage Classes</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
        </span>
      </div>
    );
    const classDialogFooter = (
      <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveClass} />
      </React.Fragment>
    );
    const deleteClassDialogFooter = (
      <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteClassDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteClass} />
      </React.Fragment>
    );

    const deleteClassesDialogFooter = (
      <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteClassesDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedClasses} />
      </React.Fragment>
    );

    return (
      <div className="datatable-crud-demo">
        <h2 className="d-flex justify-content-center">Course Management</h2>
        <Link to={"/"} className="pi pi-backward" style={{ 'fontSize': '18px' }}> Back to UserList </Link>
        {/* <Button label="Back to UserList" icon="pi pi-backward" className="p-button-secondary p-mr-2" onClick={} /> */}
        <Toast ref={(el) => this.toast = el} />

        {/* <div className="card"> */}
        {/* <DataTable value={this.state.classes} header="Scroll" responsiveLayout="stack"> */}
        {/* <DataTable value={this.state.classes} responsiveLayout="scroll">
            <Column field="classid" header="Class Id" />
            <Column field="classcode" header="Class Code" />
            <Column field="classname" header="Class Name" />
            <Column field="certificate" header="Certificate" />
            <Column field="passmarks" header="Pass Marks" />
            <Column field="marks" header="Marks" />
          </DataTable>
        </div> */}


        <div className="card">
          <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

          <DataTable ref={(el) => this.dt = el} value={this.state.classes} selection={this.state.selectedClasses} onSelectionChange={(e) => this.setState({ selectedClasses: e.value })}
            dataKey="classid" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} classes"
            globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll">
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
            <Column field="classid" header="Class Id" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="classcode" header="Class Code" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="classname" header="Class Name" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="certificate" header="Certificate" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="passmarks" header="Pass Marks" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="marks" header="Marks" sortable style={{ minWidth: '10rem' }}></Column>
            <Column body={this.actionBodyTemplate} header="Action" exportable={false} style={{ minWidth: '8rem' }}></Column>
          </DataTable>
        </div>

        <Dialog visible={this.state.courseDialog} style={{ width: '450px' }} header="Course Details" modal className="p-fluid" footer={classDialogFooter} onHide={this.hideDialog}>
        <div className="p-field">
            <label htmlFor="classid">Class ID</label>
            <InputText id="classid" value={this.state.course.classid} onChange={(e) => this.onInputChange(e, 'classid')} placeholder="auto generated" readOnly= {true} />
          </div>
          <div className="p-field">
            <label htmlFor="classcode">Class code</label>
            <InputText id="classcode" value={this.state.course.classcode} onChange={(e) => this.onInputChange(e, 'classcode')}  placeholder="auto generated" readOnly= {true}/>
          </div>
          <div className="p-field">
            <label htmlFor="classname">Class Name</label>
            <InputText id="classname" value={this.state.course.classname} onChange={(e) => this.onInputChange(e, 'classname')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.course.classname })} />
            {this.state.submitted && !this.state.course.classname && <small className="p-error">Class Name is required.</small>}
          </div>
          <div className="p-field">
            <label htmlFor="certificate">Certificate</label>
            <InputText id="certificate" value={this.state.course.certificate} onChange={(e) => this.onInputChange(e, 'certificate')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.course.certificate })} />
            {this.state.submitted && !this.state.course.certificate && <small className="p-error">Certificate is required.</small>}
          </div>

          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="passmarks">Pass Marks</label>
              <InputNumber id="passmarks" value={this.state.course.passmarks} onValueChange={(e) => this.onInputNumberChange(e, 'passmarks')} integeronly />
            </div>
          </div>

          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="marks">Marks</label>
              <InputNumber id="marks" value={this.state.course.marks} onValueChange={(e) => this.onInputNumberChange(e, 'marks')} integeronly />
            </div>
          </div>
        </Dialog>

        <Dialog visible={this.state.deleteClassDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteClassDialogFooter} onHide={this.hideDeleteClassDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.course && <span>Are you sure you want to delete <b>{this.state.course.classname}</b>?</span>}
          </div>
        </Dialog>

        <Dialog visible={this.state.deleteClassesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteClassesDialogFooter} onHide={this.hideDeleteClassDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.course && <span>Are you sure you want to delete the selected courses?</span>}
          </div>
        </Dialog>

      </div>
    );
  }

}
