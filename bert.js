class BertAlert {
  constructor() {
    this.styles = [
      'fixed-top',
      'fixed-bottom',
      'growl-top-left',
      'growl-top-right',
      'growl-bottom-left',
      'growl-bottom-right'
    ];

    this.types = [
      'default',
      'success',
      'info',
      'warning',
      'danger'
    ];

    this.icons = {
      default: 'bell icon',
      success: 'check icon',
      info: 'info icon',
      warning: 'warning icon',
      danger: 'remove icon'
    };

    this.defaults = {
      hideDelay: 3500,
      style: 'fixed-top',
      type: 'default'
    };
  }

  alert() {
    if ( this.isVisible() ) {
      this.hide();
      setTimeout( () => { this.handleAlert( arguments ); }, 300 );
    } else {
      this.handleAlert( arguments );
    }
  }

  isVisible() {
    return $( '.bert-sui-alert' ).hasClass( 'show' );
  }

  handleAlert( alert ) {
    this.registerClickHandler();
    this.setBertOnSession( alert );
    setTimeout( () => { this.show(); }, 20 );
    this.bertTimer();
  }

  registerClickHandler() {
    $( '.bert-sui-alert' ).off( 'click' );
    $( '.bert-sui-alert' ).on( 'click', () => { this.hide(); } );
  }

  bertTimer() {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => { this.hide(); }, this.defaults.hideDelay );
    return this.timer;
  }

  show() {
    $( '.bert-sui-alert' ).addClass( 'show' ).delay( 25 ).queue( () => {
      $( '.bert-sui-alert' ).addClass( 'animate' ).dequeue();
    });
  }

  hide() {
    $( '.bert-sui-alert' ).removeClass( 'animate' );
    setTimeout( () => {
      $( '.bert-sui-alert' ).removeClass( 'show' );
      Session.set( 'bertSUIAlert', null );
    }, 300 );
  }

  setBertOnSession( alert ) {
    if ( typeof alert[0] === 'object' ) {
      let type = alert[0].type || this.defaults.type;

      Session.set( 'bertSUIAlert', {
        title: alert[0].title || "",
        message: alert[0].message || "",
        type: type,
        style: alert[0].style || this.defaults.style,
        icon: alert[0].icon || this.icons[ type ]
      });
    } else {
      let type = alert[1] || this.defaults.type;

      Session.set( 'bertSUIAlert', {
        message: alert[0] || "",
        type: type,
        style: alert[2] || this.defaults.style,
        icon: alert[3] || this.icons[ type ]
      });
    }
  }
}

BertSUI = new BertSUIAlert();
