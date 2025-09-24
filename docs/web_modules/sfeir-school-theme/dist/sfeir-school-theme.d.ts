export declare const SfeirThemeInitializer: {
    /**
     * @param {() => Array.<string>} slidesFactory
     */
    init(slidesFactory: (showType?: string) => SlidePath[]): Promise<void>;
};

declare interface SlidePath {
    path: string;
}

export { }
