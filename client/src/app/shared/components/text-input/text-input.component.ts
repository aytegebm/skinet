import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
   }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  // tslint:disable-next-line: typedef
  onChange(event) {}

  // tslint:disable-next-line: typedef
  onTouched() {}

  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
    if (obj !== null || obj !== undefined) {
        // this.writeValue = obj;
        this.onChange(obj);
        this.onTouched();
    }
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
    this.setDisabledState(isDisabled);
  }

}
