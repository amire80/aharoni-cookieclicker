// jq!

( function aharoni() {
	'use strict';

	var goal;

	window.aharoniCookieClicker = {
		intervals: {},
		productCaps: [
			240, // Cursors
			200, // Grandmas
			150, // Farms
			150, // Factories
			150, // Mines
			150, // Shipments
			150, // Alchemy labs
			150, // Portals
			0, // Time machines, as much as possible
			0, // Antimatter condensers, as much as possible
			0 // Prisms, as much as possible
		],
		intervalLengths: {
			big: 100,
			golden: 1000,
			deer: 1000,
			wrinkler: 5000,
			product: 5000
		},
		clickers: {
			big: function () {
				$( '#bigCookie' ).click();
			},

			golden: function () {
				var goldenBackground,
					$golden = $( '#goldenCookie' );

				if ( $golden.css( 'display' ) === 'block' ) {
					goldenBackground = $golden.css( 'background-image' );
					if ( goldenBackground.match( 'goldC' ) ||
						goldenBackground.match( 'heart' )
					) {
						$golden.click();
					}
				}
			},

			deer: function () {
				var $deer = $( '#seasonPopup' );

				if ( $deer.css( 'display' ) !== 'none' &&
					$deer.css( 'background-image' ).match( 'frostedReindeer.png' )
				) {
					$deer.click();
				}
			},

			wrinkler: function () {
				var wrinklerIndex;

				for (
					wrinklerIndex = 0;
					wrinklerIndex < Game.wrinklers.length;
					wrinklerIndex++
				) {
					if ( Game.wrinklers[wrinklerIndex].sucked ) {
						Game.wrinklers[wrinklerIndex].hurt = 3;
						Game.wrinklers[wrinklerIndex].hp = -1;
					}
				}
			},

			product: function () {
				var i, $product, ownedText, owned,
					productCaps = window.aharoniCookieClicker.productCaps;

				for ( i = productCaps.length - 1; i >= 0; i-- ) {
					$product = $( '#product' + i );

					if ( !$product.hasClass( 'enabled' ) ) {
						continue;
					}

					ownedText = $product.find( '.owned' ).text();
					owned = ( ownedText === '' ) ? 0 : parseInt( ownedText, 10 );

					if ( !productCaps[i] || owned < productCaps[i] ) {
						$product.click();

						return;
					}
				}
			}
		},
		start: function ( goal ) {
			console.log( 'starting ' + goal );
			if ( this.clickers[goal] ) {
				this.intervals[goal] = setInterval(
					this.clickers[goal],
					this.intervalLengths[goal]
				);
			} else {
				console.log( 'clicker function for ' + goal + ' not found' );
			}
		},
		startAll: function () {
			for( goal in window.aharoniCookieClicker.clickers ) {
				if ( window.aharoniCookieClicker.clickers.hasOwnProperty( goal ) ) {
					window.aharoniCookieClicker.start( goal );
				}
			}
		},
		stop: function ( goal ) {
			console.log( 'stopping ' + goal );

			if ( this.intervals[goal] ) {
				clearInterval( this.intervals[goal] );
				delete this.intervals[goal];
			} else {
				console.log( 'interval for ' + goal + ' not found' );
			}
		},
		stopAll: function () {
			for( goal in window.aharoniCookieClicker.clickers ) {
				if ( window.aharoniCookieClicker.clickers.hasOwnProperty( goal ) ) {
					window.aharoniCookieClicker.stop( goal );
				}
			}
		}
	};

	window.aharoniCookieClicker.startAll();
} )();
