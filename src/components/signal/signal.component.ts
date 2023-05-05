import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map, tap, switchMap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { OptionComponent } from '../option/option.component';
import { sleep } from "../../lib/sleep";
import {Logger} from "../../logger.service";

@Component({
  selector: 'signal-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, OptionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'signal.component.html',
  providers: [Logger],
})
export class SignalComponent {

  public readonly logs$ = this._logger.messages$();

  public readonly name = signal('');
  // `computed`: create a signal of computed value (readonly)
  public message = computed(() => `Hello ${this.name()}!`);
  public todos$ = toObservable(this.name).pipe(
    tap((value: string) => this._logger.log(value)),
    // map(() => []),
    switchMap((value: string) => this._longRequest$(value))
  );

  constructor(
    private readonly _http: HttpClient,
    private readonly _logger: Logger,
  ) {}

  public changeName(event: any): void {
    this.name.set(event.target.value);
  }

  private _longRequest$(value: string): Observable<string[]> {
    return this._http.get('https://jsonplaceholder.typicode.com/todos').pipe(
      tap((value: any) => sleep(1000, this._logger)),
      map((todos: any[]) =>
        todos.map(() => Math.floor(Math.random() * 100).toString()).slice(0, 15)
      ),
      tap((items: any) => this._logger.log('END long request'))
    );
  }
}
