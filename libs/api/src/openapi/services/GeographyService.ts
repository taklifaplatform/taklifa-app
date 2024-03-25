/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CityTransformer } from '../models/CityTransformer';
import type { CountryTransformer } from '../models/CountryTransformer';
import type { StateTransformer } from '../models/StateTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GeographyService {
    /**
     * Display a listing of the countries.
     * @returns any Successful response
     * @throws ApiError
     */
    public static listCountries({
        page,
        perPage,
        search,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        perPage?: number,
        search?: string,
    }): CancelablePromise<{
        data?: Array<CountryTransformer>;
        links?: {
            first?: string;
            last?: string;
            prev?: string;
            next?: string;
        };
        meta?: {
            current_page?: number;
            from?: number;
            last_page?: number;
            links?: Array<{
                url?: string;
                label?: string;
                active?: boolean;
            }>;
            path?: string;
            per_page?: number;
            to?: number;
            total?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/geography/countries',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Display the specified country.
     * @returns any Successful response
     * @throws ApiError
     */
    public static showCountry({
        country,
    }: {
        country: string,
    }): CancelablePromise<{
        data?: CountryTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/geography/countries/{country}',
            path: {
                'country': country,
            },
        });
    }
    /**
     * Display the specified country.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCountryByDialCode({
        dialCode,
    }: {
        dialCode: string,
    }): CancelablePromise<{
        data?: CountryTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/geography/countries/dial-code/{dialCode}',
            path: {
                'dialCode': dialCode,
            },
        });
    }
    /**
     * Display a listing of the states.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchStates({
        page,
        perPage,
        search,
        countryId,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        perPage?: number,
        search?: string,
        countryId?: number,
    }): CancelablePromise<{
        data?: Array<StateTransformer>;
        links?: {
            first?: string;
            last?: string;
            prev?: string;
            next?: string;
        };
        meta?: {
            current_page?: number;
            from?: number;
            last_page?: number;
            links?: Array<{
                url?: string;
                label?: string;
                active?: boolean;
            }>;
            path?: string;
            per_page?: number;
            to?: number;
            total?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/geography/states',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'country_id': countryId,
            },
        });
    }
    /**
     * Display a listing of the cities.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCities({
        page,
        perPage,
        search,
        countryId,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        perPage?: number,
        search?: string,
        countryId?: number,
    }): CancelablePromise<{
        data?: Array<CityTransformer>;
        links?: {
            first?: string;
            last?: string;
            prev?: string;
            next?: string;
        };
        meta?: {
            current_page?: number;
            from?: number;
            last_page?: number;
            links?: Array<{
                url?: string;
                label?: string;
                active?: boolean;
            }>;
            path?: string;
            per_page?: number;
            to?: number;
            total?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/geography/cities',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'country_id': countryId,
            },
        });
    }
}
