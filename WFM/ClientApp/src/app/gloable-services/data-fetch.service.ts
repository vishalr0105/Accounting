import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  constructor(private http: HttpClient) {}

  // Helper method to make paginated API requests
  fetchData<T>(
    getCount: () => Observable<{ totalcount: number }>, // Function to get total count
    getData: (chunkSize: number, page: number) => Observable<T[]>, // Function to fetch paginated data
    chunkSize: number = 20
  ): Observable<T[]> {
    return getCount().pipe(
      switchMap((countResponse) => {
        const totalCount = countResponse.totalcount;
        const totalPages = Math.ceil(totalCount / chunkSize);
        console.log('Total Pages:', totalPages);

        // Create an observable for all the pages that we need to fetch
        const pageRequests = Array.from({ length: totalPages }, (_, pageIndex) =>
          getData(chunkSize, pageIndex + 1).pipe(
            catchError((err) => {
              console.error('Error fetching page', pageIndex + 1, err);
              return of([]); // Return an empty array in case of error
            })
          )
        );

        // Use concatMap to handle all page requests sequentially (to avoid overloading the server)
        return of(...pageRequests); // Spread the pageRequests into an observable
      }),
      concatMap((request) => request), // Ensure the requests happen one after the other
      map((pageData: T[]) => pageData), // Directly map the page data to result
      catchError((err) => {
        console.error('Error occurred during fetching data', err);
        return of([]); // Return an empty array in case of any error
      }),
      shareReplay(1) // Cache the result for reuse and avoid multiple calls
    );
  }
}
