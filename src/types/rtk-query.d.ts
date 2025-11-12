// types/rtk-query.d.ts
import "@reduxjs/toolkit/query";

declare module "@reduxjs/toolkit/query" {
  interface ApiUtilSelectors {
    /** Selector that returns true when any query is fetching */
    selectIsFetching: (state: any) => boolean;
    /** Selector that returns true when any mutation is in progress */
    selectIsMutating: (state: any) => boolean;
  }
}
