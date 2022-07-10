const tabs = (header, trigger, content, activeClass, display = 'block') =>{
    const headerTab = document.querySelector(header),
          tabsTrigger = document.querySelectorAll(trigger),
          contentTabs = document.querySelectorAll(content);
          
    function hideContent() {
        contentTabs.forEach(content =>{
            content.style.display = 'none';
        });

        tabsTrigger.forEach(tab =>{
            tab.classList.remove(activeClass);
        });
    }

    function showContent(i = 0) {
        try{contentTabs[i].style.display = display;} catch(e){} 
        try{tabsTrigger[i].classList.add(activeClass);} catch(e){}    
    }

    hideContent();
    showContent();

    try{headerTab.addEventListener('click', (e) =>{
        e.preventDefault();
        if(e.target && (e.target.classList.contains(trigger.replace(/\./, '')) || e.target.parentNode.classList.contains(trigger.replace(/\./, '')))){
            tabsTrigger.forEach((tab, i) =>{
                if(e.target == tab || e.target.parentNode == tab){
                    hideContent();
                    showContent(i);
                }
            }); 
        }
    });} catch(e){}
    
};

export default tabs;