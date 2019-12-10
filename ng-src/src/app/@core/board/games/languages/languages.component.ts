import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { LanguagesGame, GameApp } from './game/app';
import { Settings } from './game/data/Settings';
import { ObjectUtils } from '../../../utils/object.utils';
import { Sponsor } from '../sponsors/sponsor';
import { isFeatureOn, getfeatures } from '../sponsors/utils';
import { eSponsorID } from '../sponsors/list';
import { NoneSponsor } from '../sponsors/brands/none.sponsor';
import { EdgiSponsor } from '../sponsors/brands/edgi.sponsor';
import { FacebookSponsor } from '../sponsors/brands/facebook.sponsor';
import { getSponsorFeatures } from './sponsor.config';
import { Config } from './game/data/';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  // template: `<div id='languages-game'></div>`,
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements AfterViewInit, OnDestroy, OnInit {

  /**
   * Game ready output - emits the [Phaser game instance]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} when it is
   * ready and this component's view has initialized.
   */
  @Output() public readonly gameReady = new EventEmitter();

  /**
   * These are our base settings together with their default values.
   * You can add other properties here, based on our game needs
   */
  public settings = GameApp.settings;


  /**
   * [Phaser game]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} reference. Instantiated in
   * [ngOnInit]{@link PhaserComponent.ngOnInit}.
   */
  private game: Phaser.Game;
  public sponsor: Sponsor;

  /**
   * Loads the sponsor's config if it exists.
   *
   */
  async loadGameConfig() {
    try {
      const configJson = await ObjectUtils.loadJson('assets/config.json');
      ObjectUtils.loadValuesIntoObject(configJson, Config);
    } catch (e) {
        throw e;
    }
  }

  /**
   * Loads the sponsor's config if it exists.
   *
   */
  async loadSponsorConfig() {
    if (isFeatureOn('hasConfig')) {
      try {
          const sponsorConfigJson = await ObjectUtils.loadJson(`assets/sponsors/${getfeatures().name}.json`);
          ObjectUtils.loadValuesIntoObject(sponsorConfigJson, Config);
      } catch (e) {
          throw e;
      }
    }
  }

  /**
   * Creates a specific sponsor class depending on the id set in GameApp namespace.
   *
   */
  private createSponsor() {

    const sponsorFeatures = getSponsorFeatures(GameApp.sponsor);

    /* if (GameApp.sponsor === eSponsorID.NONE) {
        this.sponsor = new NoneSponsor(sponsorFeatures);
    } else if (GameApp.sponsor === eSponsorID.EDGI) {
        this.sponsor = new EdgiSponsor(sponsorFeatures);
    } */

    switch (GameApp.sponsor) {
      case eSponsorID.NONE:
        this.sponsor = new NoneSponsor(sponsorFeatures);
        break;
      case eSponsorID.EDGI:
        this.sponsor = new EdgiSponsor(sponsorFeatures);
        break;
      case eSponsorID.FACEBOOK:
        this.sponsor = new FacebookSponsor(sponsorFeatures);
        break;
      default:
        break;
    }
  }

  /**
   * Instantiate Phaser component.
   *
   * @param elementRef Reference to host element. Corresponding native element will act as parent to Phaser's HTMLCanvasElement's DOM
   * element.
   */
  public constructor(private elementRef: ElementRef) {}

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized. Attaches
   * [Phaser game's HTMLCanvasElement]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html#canvas} to DOM when game ready.
   */
  public ngAfterViewInit(): void {
    /** @todo Possible race condition? */
    this.game.events.once('ready', () => {
      this.elementRef.nativeElement.appendChild(this.game.canvas);
      this.elementRef.nativeElement.style.overflow = 'hidden';
      this.gameReady.emit(this.game);
    });
  }

  /**
   * Lifecycle hook that is called when a directive, pipe or service is destroyed. Destroys
   * [Phaser game]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} instance.
   */
  public ngOnDestroy(): void {
    if (this.game && typeof this.game.destroy === 'function') {
      this.game.destroy(true);
    }
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized. Instantiates
   * [Phaser game]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} instance.
   *
   * @throws [ReferenceError]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError} if
   * [Phaser]{@link https://photonstorm.github.io/phaser3-docs/Phaser.html} or
   * [Phaser.Game]{@link https://photonstorm.github.io/phaser3-docs/Phaser.Game.html} are not available.
   */
  public ngOnInit(): void {
    // If Phaser module not provided try window object...
    this.createSponsor();
    this.loadSponsorConfig();
    this.game = new LanguagesGame();
    this.sponsor.game = this.game;
    // return this.game;
  }
}
