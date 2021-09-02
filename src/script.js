
/*
const tabz = (tabzTitles, tabzContents) => {  
  
  options = {
    class: 'is-selected'
  }
  
  for(tabzTitle of tabzTitles) {    
    
    // Links
    tabzTitle.addEventListener('click', e => {

      //Récupère le lien cliqué
      let target = e.target
      
      //Supprime la class is-selected sur les liens
      for(tabzTitle of tabzTitles){
        tabzTitle.classList.remove(options.class)
        tabzTitle.setAttribute('aria-selected', false)
        tabzTitle.setAttribute('aria-expanded', false)
      }
      
      //Ajoute la class is-selected sur le lien cliqué
      target.classList.add(options.class)
      target.setAttribute('aria-selected', true)
      target.setAttribute('aria-expanded', true)
      
      // Content
      for(tabzContent of tabzContents){        

        //Supprime la class 'is-selected sur les panneaux
        tabzContent.classList.remove(options.class);
        tabzContent.style.display = 'none';
        tabzContent.setAttribute('aria-hidden', true);

        //Si le data-tab du lien cliqué et celui du panel sont =
        if(target.dataset.tab === tabzContent.dataset.tab) {
          
          //Ajoute la class 'is-selected sur le panneau
          tabzContent.classList.add(options.class);
          tabzContent.style.display = 'block';
          tabzContent.setAttribute('aria-hidden', false);
        }                
      }
    })
  }
}

const tabzSelectors = () => {
  let tabzTitles = document.querySelectorAll('.tabs__title')
  let tabzContents = document.querySelectorAll('.tabs__content')
  
  tabz(tabzTitles, tabzContents);
}

tabzSelectors();
*/

// ------------------------------------------------
// Class
// ------------------------------------------------

class Tabz {
  
  /**
   * @param(HTMLElement) tabzContainer
   * @param(Object) options
  **/
  constructor(tabzContainer, options = {}) {
    this.tabzContainer = tabzContainer;
    this.options = Object.assign({}, {
      tabzTitles: '[data-role="title"]',
      tabzContents: '[data-role="content"]',
      tabzTitleSelectedClass: 'is-selected',
      tabzContentSelectedClass: 'is-selected',
    }, options);
    
    this.tabzTitlesHandler();
  }
  
  /**/
  tabzTitlesHandler () {
    
    let self = this;
    let parent = self.tabzContainer;
    let parentId = parent.getAttribute('id');
    let tabzTitles = document.querySelectorAll('#' + parentId + ' ' + self.options.tabzTitles);
    let tabzContents = document.querySelectorAll('#' + parentId + ' ' + self.options.tabzContents);
    
    // Tabz titles
    tabzTitles.forEach((tabzTitle) => {
      
      // Click
      tabzTitle.addEventListener('click', e => {

        //Récupère le lien cliqué
        let target = e.target;
        let targetDataSet = target.dataset.tab;

        // Modification de tous les tabzz titles
        tabzTitles.forEach((tabzTitle) => {
          tabzTitle.classList.remove(self.options.tabzTitleSelectedClass);
          tabzTitle.setAttribute('aria-selected', false);
          tabzTitle.setAttribute('aria-expanded', false);
        });

        // Modification du tabz title cliqué
        target.classList.add(self.options.tabzTitleSelectedClass);
        target.setAttribute('aria-selected', true);
        target.setAttribute('aria-expanded', true);

        self.tabzContentsHandler(tabzContents, targetDataSet);
      });
      
    });
  }
  
  /**/
  tabzContentsHandler (tabzContents, tabzTitleDataSet) {
    
    let self = this;
    
    // Tabz Contents
    tabzContents.forEach((tabzContent) => {

      // Modification de tous les tabz contents
      tabzContent.classList.remove(self.options.tabzContentSelectedClass);
      tabzContent.hidden = true;
      tabzContent.setAttribute('aria-hidden', true);

      // Modification du tabz content lié au tabz title
      if(tabzTitleDataSet === tabzContent.dataset.tab) {
        tabzContent.classList.add(self.options.tabzContentSelectedClass);
        tabzContent.hidden = false;
        tabzContent.setAttribute('aria-hidden', false);
      }

    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  
  new Tabz(document.getElementById('tabz'),
    {
      tabzTitleSelectedClass: 'is-selected',
      tabzContentSelectedClass: 'is-selected'
     }
  );
  
  new Tabz(document.getElementById('tabz2'));
  
  new Tabz(document.getElementById('tabz3'));
  
  new Tabz(document.getElementById('tabz4'));

});
