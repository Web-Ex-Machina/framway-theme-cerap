/**
 * switch the header between reduced and not-reduced states
 * @param  {Boolean} reduce 
 */
app.HeaderFW.prototype.navSwitcher = function(reduce = false){
    var header = this;
    if (reduce) {
        header.$el.addClass('is-reduce');
        if (header.$topbar) header.$topbar.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
        if (header.$search) header.$search.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
        if (header.$lang)   header.$lang.appendTo(header.navPanelMenus.root.$el.find('.panel__actions'));
    } else {
        header.$el.removeClass('is-reduce');
        if (header.$topbar) header.$nav.append(header.$topbar);
        if (header.$search) header.$nav.append(header.$search);
        if (header.$lang)   header.$nav.append(header.$lang);
    }
};

window.addEventListener("load", function(e) {
    $('.sliderFW.block-card__slider').each(function(){
        let slider = $(this);
        slider.find('.sliderFW__arrow').each(function(){
            $(this).appendTo(slider)
        })
    });


    $('.sliderFW.cerap').each(function(){
        let slider = $(this).sliderFW('get');
        let contentWrapper = slider.$el.find('.sliderFW__item__content__wrapper');
        slider.$nav.children().bind('click', () => {
            contentWrapper.addClass('switch');
            let delaySwitchContent = (Number(getComputedStyle(contentWrapper.get(0)).animationDuration.replace('s',''))+Number(getComputedStyle(contentWrapper.get(0)).animationDelay.replace('s','')))*1000;
            console.log(delaySwitchContent);
            setTimeout(()=>{
                contentWrapper.find('.sliderFW__item__title').html(slider.$el.find('.sliderFW__item.active .sliderFW__item__hiddenContent .sliderFW__item__title').html())
                contentWrapper.find('.sliderFW__item__subtitle').html(slider.$el.find('.sliderFW__item.active .sliderFW__item__hiddenContent .sliderFW__item__subtitle').html())
            },delaySwitchContent/2);
            setTimeout(()=>{
                contentWrapper.removeClass('switch') 
            },delaySwitchContent);
            
        });
        console.log(slider);
    });

    let requestTab = new URL(location.href).searchParams.get('custom_tabs');
    if (requestTab && $('.tabs--cerap').length) {
        console.log(parseInt(requestTab) - 1);
        setTimeout(()=>{
            $('.tabs--cerap .nav__button').filter(function(){
                return $(this).index() == parseInt(requestTab) - 1;
            }).trigger('click');
            $('.tabs--cerap').get(0).scrollIntoView({behavior: "smooth",block:"center",inline:"nearest"}); 
        },10)
    }
});


const observerAnimate = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        // console.log(entry)
        if (entry.target.closest('.animate--stack') == null || (entry.target.closest('.animate--stack') != null && entry.target.classList.contains('animate--stack'))) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show')
                if (!entry.target.classList.contains('replay'))
                    entry.target.classList.add('lock')
            } else {
                if (!entry.target.classList.contains('lock'))
                    entry.target.classList.remove('show')
            }
        }
    })
});

const animateElements = document.querySelectorAll('[class*=animate--]');
animateElements.forEach((el)=> observerAnimate.observe(el));