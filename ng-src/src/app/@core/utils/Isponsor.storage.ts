export interface ISponsorStorage {
     /**
         * sponsor specific save method - to some sponsor storage
         */
        save(key: string, data: any): Promise<void>;
        /**
         * sponsor specific load method - to some sponsor storage
         */
        load(key: string): Promise<any>;
        /**
         * if true, loading/saving is first attempted from sponsor specific methods and then to/from standar storage
         * if false, only specific methods are used
         */
        fallbackToStandardStorage(): boolean;
}
