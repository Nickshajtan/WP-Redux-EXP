document.addEventListener("DOMContentLoaded", () => {
  try {
    
    const CONTAINER   = document.getElementById('techno-container');
    const SLIDE_CLASS = 'techologies-content__icon-wrapper';
    
    let singleSlide   = 'content-slider__slide-wrapper';
    let singleSlideIt = 'content-slider__item';
    
    if( is_func( jQuery ) ) {
      var $ = jQuery;
    }
    else {
      throw new Error('jQuery is not a function');
    }
    
    let initFunc = () => {
      switch(true){
        case ( window.innerWidth > 768 ) :
          destroySlideWrap( CONTAINER, SLIDE_CLASS, singleSlide, singleSlideIt );
          destroySliderNav( CONTAINER );
          break;
        case ( window.innerWidth >= 320  && window.innerWidth <= 768 ) :
          makeSlideWrap( CONTAINER, SLIDE_CLASS, singleSlide, singleSlideIt );
          makeSliderNav( CONTAINER );
          sliderInitialization(CONTAINER);
          break;
        case ( window.innerWidth < 320 ) :
          destroySlideWrap( CONTAINER, SLIDE_CLASS, singleSlide, singleSlideIt );
          destroySliderNav( CONTAINER );
          break;
        default:
          destroySlideWrap( CONTAINER, SLIDE_CLASS, singleSlide, singleSlideIt );
          destroySliderNav( CONTAINER );
      }
    };
  
    initFunc();
    
    window.onresize = () => {
      slidersUnset();
      setTimeout(function(){
        initFunc();
        sliderInitialization(CONTAINER);
      }, 1000);
    };
  }
  catch(e) {
    console.log('Error with start loaded function: ' + e)
  }
});

/*
 * Slick slider initialization function
 * @param container is object
 * @params toShow, toScroll are numbers
 *
 */
var sliderInitialization = ( container, toShow, toScroll ) => {
  try {
    if( window.innerWidth < 320 || window.innerWidth > 768 ) {
      return false;
    }
    
    if( !is_obj( container ) || is_null( container ) || is_empty( container ) ) {
      throw new Error(container + ' has incorrect value, critical');
      return false;
    }
    
    const slidesToShow   = ( is_num( toShow ) ) ? toShow : 1;
    const slidesToScroll = ( is_num( toScroll ) ) ? toScroll : 1;
    
    if( is_func( $ ) && is_func( $.fn.slick ) ) {
      let dotsContainer = ( !is_empty( container.id ) ) ? $('#' + container.id).parent().find('#dots-container') :
      ( isset( container.classList[0] ) && !is_empty( container.classList[0] ) ) ? $('.' + container.classList[0]).parent().find('#dots-container') : null;
      
      let args = {
        accessibility: true,
        autoplay:      true,
        autoplaySpeed: 3000,
        arrows:        false,
        centerMode:    false,
        centerPadding: '50px',
        cssEase:       'ease',
        dots:          true,
        dotsClass:     'dots-nav',
        easing:        'linear',
        infinite:      true,
        slidesToShow:  slidesToShow,
        slidesToScroll:slidesToScroll,
        mobileFirst:   true,
        lazyLoad:      'progressive', 
      };
      
      if( !is_null( dotsContainer ) ) {
        args['appendDots'] = dotsContainer;
      }
      
      if( window.innerWidth > 574 && window.innerWidth < 768 ) {
        let arwsContainer = ( !is_empty( container.id ) ) ? $('#' + container.id).parent().find('#arrows-container') :
        ( isset( container.classList[0] ) && !is_empty( container.classList[0] ) ) ? $('.' + container.classList[0]).parent().find('#arrows-container') : null;
        if( !is_null( arwsContainer ) ){
          args['arrows'] = true;
          args['appendArrows'] = arwsContainer; 
        }
      }
      else{
        args['arrows'] = false;
        delete( args.appendArrows );
      }

      let initializedSliders = document.querySelectorAll('.' + container.classList[0]);
      for (var i = 0, len = initializedSliders.length; i < len; i++) {
        if (!initializedSliders[i].matches('.slick-initialized')) {
          if( is_obj( initializedSliders[i] ) && isset( initializedSliders[i].id ) ) {
            $('#' + initializedSliders[i].id).slick(args);
          }
          else if( is_obj( initializedSliders[i] ) && isset( initializedSliders[i].classList[0] ) ) {
            $('.' + initializedSliders[i].classList[0]).slick(args);
          }
          else {
            throw new Error('Can not to get element data for initialize slick');
          }
        }
      }
    }
    else{
      if( !is_func( $ ) ){
        throw new Error('jQuery $ is not defined, critical');
      }
      if( !is_func( $.fn.slick ) ){
        throw new Error('Type of slick is not a function, critical');
      }
      else{
        throw new Error('Error with slick dependencies');
      }
    }
  }
  catch(e) {
    console.log('Error with slider initialization function: ' + e);
  }
};

/*
 * Destroy slick slider function
 * @param container is object
 *
 */
var slidersUnset = () => {
  try {
    if( is_func( $ ) && is_func( $.fn.slick ) ) {
      $('.slick-initialized').slick('unslick');
    }
    else {
      if( !is_func( $ ) ){
        throw new Error('jQuery $ is not defined, critical');
      }
      if( !is_func( $.fn.slick ) ){
        throw new Error('Type of slick is not a function, critical');
      }
      else{
        throw new Error('Error with slick dependencies');
      }
    }
  }
  catch(e) {
    console.log('Error with slider unset function: ' + e);
  }
};

/*
 * Build slider navigation
 * @param container is object
 *
 */
var makeSliderNav = ( container ) => {
  try {
    if( !is_obj( container ) || is_null( container ) || is_empty( container ) ) {
      throw new Error(container + ' has incorrect value, critical');
      return false;
    }
    
    let dots      = null;
    let arrows    = null;
    let issetDots = container.parentNode.querySelectorAll('.dots-container');
    if( !isset( issetDots ) || issetDots.length === 0 ) {
      dots = document.createElement('div'); 
    }
    
    if( !is_null( dots ) ) {
      dots.classList.add('dots-container');
      dots.id = 'dots-container';
      container.parentNode.appendChild(dots);
    }
    
    if( window.innerWidth > 574 && window.innerWidth < 768 ) {
      let issetArrows = container.parentNode.querySelectorAll('.arrows-container');

      if( !isset( issetArrows ) || issetArrows.length === 0 ) {
        arrows = document.createElement('div');
      }
      
      if( !is_null( arrows ) ) {
        arrows.classList.add('arrows-container');
        arrows.id = 'arrows-container';
        container.parentNode.appendChild(arrows);
      }
    }
  }
  catch(e) {
    console.log('Error with slider nav making function: ' + e)
  }
};

/*
 * Destroy slider navigation
 * @param container is object
 *
 */
var destroySliderNav = ( container ) => {
  try {
    if( !is_obj( container ) || is_null( container ) || is_empty( container ) ) {
      throw new Error(container + ' has incorrect value, critical');
      return false;
    }
    container.parentNode.querySelectorAll('.dots-container').forEach((el) => {
        el.remove();
    });
    container.parentNode.querySelectorAll('.arrows-container').forEach((el) => {
        el.remove();
    });
  }
  catch(e) {
    console.log('Error with slider nav destroying function: ' + e)
  }
};

/*
 * Making single slides wrapping for mobile slider 
 * @param container is object
 * @param itemClass is string
 * @param singleLiClass is string
 * @param singleUlClass is string
 *
 */
var makeSlideWrap = ( container, itemClass, singleLiClass, singleUlClass ) => {
  try {
    if( window.innerWidth > 768 ) {
      destroySlideWrap();
      return false;
    }
    if( !is_obj( container ) || is_null( container ) || is_empty( container ) ) {
      throw new Error(container + ' has incorrect value, critical');
      return false;
    }
    
    let slideClass  = ( is_string(itemClass) ) ? itemClass : toString(itemClass);
    let singleSlide = ( isset(singleLiClass) && !is_null(singleLiClass) && !is_empty(singleLiClass) ) 
                                                                    ? ( is_string( singleLiClass ) ) ? singleLiClass : toString(singleLiClass)
                                                                    : '';
    let singleItem  = ( isset(singleUlClass) && !is_null(singleUlClass) && !is_empty(singleUlClass) ) 
                                                                    ? ( is_string( singleUlClass ) ) ? singleUlClass : toString(singleUlClass) 
                                                                    : '';
    let slides      = document.querySelectorAll('.' + slideClass);
    let wrapper     = null;
    let innerList   = null;
    
    if( is_string( singleSlide ) && !is_empty( singleSlide ) ) {
      var issetSlides = container.querySelectorAll('.' + singleSlide);
    }
    else {
      var issetSlides = container.querySelectorAll('.content-slider__slide-wrapper');
    }
    if( isset( issetSlides ) && issetSlides.length > 0 ) {
      return false;
    }
    
    if( !is_null( slides ) && is_obj( slides ) && !is_empty( slides ) ) {
      slides.forEach((el, i) => {
        if (i % 4 === 0) {
          wrapper   = document.createElement('li');
          wrapper.classList.add('content-slider__slide-wrapper');
          if( isset( singleSlide ) && !is_null( singleSlide ) && !is_empty( singleSlide ) ) {
            wrapper.classList.add(singleSlide); 
          }
          innerList = document.createElement('ul');
          innerList.classList.add('content-slider__item');
          if( isset( singleUlClass ) && !is_null( singleUlClass ) && !is_empty( singleUlClass ) ) {
            innerList.classList.add(singleUlClass);
          }
          container.appendChild(wrapper);
          wrapper.appendChild(innerList);
        }
        el.classList.add('content-slider__icon');
        innerList.appendChild(el);
      });
    }
    else {
      throw new Error('Can not to get a slides ' + slides + ' value, critical');
      return false;
    }
    
    container.classList.add('content-slider');
    container.classList.add('techologies-content__slider');
    container.classList.remove('techologies-content__grid');
    
  }
  catch(e) {
    console.log('Error with slides wraping function: ' + e)
  }
};

/*
 * Destroy single slides wrapping for mobile slider 
 * @param container is object
 * @param itemClass is string
 * @param singleLiClass is string
 * @param singleUlClass is string
 *
 */
var destroySlideWrap = ( container, itemClass, singleLiClass, singleUlClass ) => {
  try {
    if( window.innerWidth > 320 && window.innerWidth < 768 ) {
      makeSlideWrap();
      return false;
    }
    if( !is_obj( container ) || is_null( container ) || is_empty( container ) ) {
      throw new Error(container + ' has incorrect value, critical');
      return false;
    }
    
    let slideClass  = ( is_string(itemClass) ) ? itemClass : toString(itemClass);
    let slidesItem  = container.querySelectorAll('.' + slideClass);
    let singleSlide = ( isset(singleLiClass) && !is_null(singleLiClass) && !is_empty(singleLiClass) ) 
                                                                    ? ( is_string( singleLiClass ) ) ? singleLiClass : toString(singleLiClass)
                                                                    : '';
    let singleItem  = ( isset(singleUlClass) && !is_null(singleUlClass) && !is_empty(singleUlClass) ) 
                                                                    ? ( is_string( singleUlClass ) ) ? singleUlClass : toString(singleUlClass) 
                                                                    : '';
    
    if( is_string( singleSlide ) && !is_empty( singleSlide ) ) {
      var slides = container.getElementsByClassName(singleSlide);
    }
    else{
      throw new Error(singleSlide  + ' has incorrect value for single slide class, critical ');
      return false;
    }
    
    if( isset( slides ) && slides.length === 0 ) {
      return false;
    }
    
    if( !is_null( slides ) && is_obj( slides ) && !is_empty( slides ) ) {
      for (let slide of slides) {
        if( !is_null( slide ) && is_obj( slide ) && !is_empty( slide ) ) {
            let elements = slide.querySelectorAll('li');
            if( !is_null( elements ) && is_obj( elements ) && !is_empty( elements ) ) {
              for (let el of elements ) {
                if( !is_null( el ) && is_obj( el ) && !is_empty( el ) ) {
                  slide.parentNode.appendChild(el);
                }
                else {
                  throw new Error('Can not to get a slide element ' + elements + ' value, critical');
                }   
              }
              slide.parentNode.removeChild(slide);
            }
            else {
              throw new Error('Can not to get a slide elements ' + elements + ' value, critical');
            }   
        }
        else {
          throw new Error('Can not to get a slide ' + slide  + ' value, critical');
        }
      }
    }
    else {
      throw new Error('Can not to get a slides ' + slides + ' value, critical');
      return false;
    }
    container.classList.add('techologies-content__grid');
    container.classList.remove('content-slider');
    container.classList.remove('techologies-content__slider');
    
    if( !is_null( slidesItem ) && is_obj( slidesItem ) && !is_empty( slidesItem ) ) {
      for( let item of slidesItem ) {
        item.classList.remove('content-slider__icon');
      }
    }
  }
  catch(e) {
    console.log('Error with slides unwraping function: ' + e)
  }
};
