import { inject, Injectable } from '@angular/core';
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { SubmitFormDto } from '../../../digest/feature/digest-form-wrapper.component';
import { DimensionType } from '../enum/dimension-type.enum';
import { Digest, DimensionDto } from '../type/digest.type';
import { AugmentFormControlsType } from '../type/form.type';
import { Subject, Observable, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DigestService extends EntityCollectionServiceBase<Digest> {
  public readonly loadDailyDigest$ = new Subject<void>();
  public dailyDigest$ = new Observable<Digest[]>();

  private readonly http = inject(HttpClient);

  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Digest', elementsFactory);

    this.loadDailyDigest$.pipe(takeUntilDestroyed()).subscribe(() => this.loadDailyDigest());
  }

  public customUpsert(digestDto: SubmitFormDto, id: number | undefined) {
    const newDimensions: DimensionDto[] = Object.entries(digestDto.dimensions).map(([key, value]) => {
      return {
        name: key,
        content: value as string,
        type: DigestService.formNameToDimension(key as AugmentFormControlsType),
      };
    });

    const newDigest: Partial<Digest> = {
      ...digestDto.digest,
      dimensions: newDimensions,
    };

    if (id) super.update({ id, ...newDigest }, { isOptimistic: false });
    else super.add(newDigest, { isOptimistic: false });
  }

  private static formNameToDimension(formName: string): DimensionType {
    switch (formName) {
      case 'people':
        return DimensionType.NUMBER;
      case 'quote':
      default:
        return DimensionType.STRING;
    }
  }

  public loadDailyDigest() {
    this.dailyDigest$ = this.http
      .get<number[]>(`${environment.ENVIRONMENT_VARIABLES.audience}/api/digest/daily-digest`)
      .pipe(switchMap((ids) => this.entities$.pipe(map((entities) => entities.filter((entity) => ids.includes(entity.id))))));
  }
}
