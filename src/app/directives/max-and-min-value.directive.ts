import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MaxAndMinValueDirective),
  multi: true,
};

@Directive({
  selector: '[appMinValue],[appMaxValue]',
  providers: [VALUE_ACCESSOR],
})
export class MaxAndMinValueDirective implements ControlValueAccessor {

  @Input('appMinValue') minValue: number;
  @Input('appMaxValue') maxValue: number;

  constructor(private el: ElementRef) {
    this.minValue = 0;
    this.maxValue = Number.MAX_SAFE_INTEGER;
  }

  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    const parsedValue = +value;
    if (parsedValue < this.minValue) {
      this.el.nativeElement.value = this.minValue.toString();
      this.onChange(this.minValue);
    } else if (parsedValue > this.maxValue) {
      this.el.nativeElement.value = this.maxValue.toString();
      this.onChange(this.maxValue);
    } else {
      this.onChange(parsedValue);
    }
  }

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
