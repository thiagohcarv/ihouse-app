import { IonicModule } from 'ionic-angular';
import { Directive, HostListener, Input, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[mask]' // Attribute selector
})
export class MaskDirective {
  @Input() mask: string;

  constructor(private control: NgControl) { }

  @HostListener('change') ngOnChanges() {
    let value = this.control.control.value;
    if (value) {
      this.control.control.setValue(this.format(value));
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    if ($event.keyCode !== 13 && $event.keyCode !== 9) {
      let value = this.control.control.value;

      this.control.control.setValue(this.format(value));
    }
  }

  private format(v: string): string {
    let s: string = '';

    var matches = v.match(/[a-zA-Z0-9]+/g);
    if (matches !== null) {
      let value = matches.join('').split('');

      var chars = this.mask.split('');
      for (let c of chars) {
        if (value.length === 0) {
          break;
        }

        switch (c) {
          case '#':
            s += value[0];
            value = value.slice(1);
            break;

          case '9':
            if (value[0].match(/\d/) !== null) {
              s += value[0];
              value = value.slice(1);
            }
            break;

          case 'A':
            if (value[0].match(/[a-zA-Z]/) !== null) {
              s += value[0];
              value = value.slice(1);
            }
            break;

          default:
            s += c;
        }
      }
    }
    return s;
  }
}
@NgModule({
  declarations: [MaskDirective],
  imports: [IonicModule],
  exports: [MaskDirective]
})
export class MaskDirectiveModule { }