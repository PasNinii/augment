import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from '../environments/environment';

const entityMetadata: EntityMetadataMap = {
  Digest: {},
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  entityHttpResourceUrls: {
    Digest: {
      collectionResourceUrl: `${environment.ENVIRONMENT_VARIABLES.audience}/api/digest/entity-list`,
      entityResourceUrl: `${environment.ENVIRONMENT_VARIABLES.audience}/api/digest/entity/`,
    },
  },
};
