import { Reveal as Reveal_2 } from '@talk-control/talk-control-revealjs-extensions';

export { Reveal_2 as Reveal };

export declare const SfeirThemeInitializer: {
  /**
   * @param {() => Array.<string>} slidesFactory
   */
  init(slidesFactory: (showType?: string) => SlidePath[], knowStyles?: string[]): Promise<void>;
};

declare interface SlidePath {
  path: string;
}

export {};
